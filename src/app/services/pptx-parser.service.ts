import { Injectable } from '@angular/core';
import JSZip from 'jszip';

export interface SlideContent {
  index: number;
  backgroundImage?: string;
  backgroundGradient?: string;
  backgroundColor?: string;
  elements: SlideElement[];
}

export interface SlideElement {
  type: 'text' | 'image' | 'shape';
  content?: string;
  src?: string;
  x: number;
  y: number;
  width: number;
  height: number;
  fontSize?: number;
  fontFamily?: string;
  fontColor?: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  align?: string;
  verticalAlign?: string;
  backgroundColor?: string;
  borderColor?: string;
  borderWidth?: number;
  paragraphs?: ParagraphContent[];
}

export interface ParagraphContent {
  align?: string;
  runs: RunContent[];
}

export interface RunContent {
  text: string;
  fontSize?: number;
  fontFamily?: string;
  fontColor?: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  hyperlink?: string;
}

@Injectable({
  providedIn: 'root'
})
export class PptxParserService {
  private readonly EMU_PER_PX = 9525;
  private readonly SLIDE_WIDTH = 960;
  private readonly SLIDE_HEIGHT = 540;

  async parseFile(url: string): Promise<SlideContent[]> {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    return this.parse(arrayBuffer);
  }

  async parse(data: ArrayBuffer): Promise<SlideContent[]> {
    const zip = await JSZip.loadAsync(data);
    const slides: SlideContent[] = [];
    const images = new Map<string, string>();

    // Extract all images as base64
    for (const [path, file] of Object.entries(zip.files)) {
      if (path.startsWith('ppt/media/') && !file.dir) {
        const base64 = await file.async('base64');
        const ext = path.split('.').pop()?.toLowerCase() || 'png';
        const mimeType = ext === 'jpg' || ext === 'jpeg' ? 'image/jpeg'
          : ext === 'png' ? 'image/png'
          : ext === 'gif' ? 'image/gif'
          : ext === 'svg' ? 'image/svg+xml'
          : ext === 'emf' ? 'image/emf'
          : ext === 'wmf' ? 'image/wmf'
          : `image/${ext}`;
        images.set(path.replace('ppt/', ''), `data:${mimeType};base64,${base64}`);
      }
    }

    // Find all slide XML files
    const slideFiles = Object.keys(zip.files)
      .filter(f => /^ppt\/slides\/slide\d+\.xml$/.test(f))
      .sort((a, b) => {
        const numA = parseInt(a.match(/slide(\d+)/)?.[1] || '0');
        const numB = parseInt(b.match(/slide(\d+)/)?.[1] || '0');
        return numA - numB;
      });

    // Parse relationship files for image references
    const slideRels = new Map<string, Map<string, string>>();
    for (const slidePath of slideFiles) {
      const slideFilename = slidePath.split('/').pop();
      const relPath = `ppt/slides/_rels/${slideFilename}.rels`;
      const relFile = zip.files[relPath];
      if (relFile) {
        const relXml = await relFile.async('text');
        const relMap = this.parseRelationships(relXml);
        slideRels.set(slidePath, relMap);
      }
    }

    for (let i = 0; i < slideFiles.length; i++) {
      const slideXml = await zip.files[slideFiles[i]].async('text');
      const rels = slideRels.get(slideFiles[i]) || new Map();
      const slide = this.parseSlide(slideXml, i, rels, images);
      slides.push(slide);
    }

    return slides;
  }

  private parseRelationships(xml: string): Map<string, string> {
    const map = new Map<string, string>();
    const regex = /<Relationship[^>]*Id="([^"]*)"[^>]*Target="([^"]*)"[^>]*/g;
    let match;
    while ((match = regex.exec(xml)) !== null) {
      let target = match[2];
      if (target.startsWith('../')) {
        target = target.replace('../', '');
      }
      map.set(match[1], target);
    }
    return map;
  }

  private parseSlide(xml: string, index: number, rels: Map<string, string>, images: Map<string, string>): SlideContent {
    const slide: SlideContent = {
      index,
      elements: []
    };

    // Parse background
    const bgMatch = xml.match(/<p:bg>([\s\S]*?)<\/p:bg>/);
    if (bgMatch) {
      const solidFill = bgMatch[1].match(/<a:srgbClr val="([^"]*)"/) || bgMatch[1].match(/<a:prstClr val="([^"]*)"/);
      if (solidFill) {
        slide.backgroundColor = `#${solidFill[1]}`;
      }
    }

    // Parse shape tree
    const spTreeMatch = xml.match(/<p:spTree>([\s\S]*)<\/p:spTree>/);
    if (!spTreeMatch) return slide;

    const spTree = spTreeMatch[1];

    // Parse shapes (sp elements) — skip decorative/design elements
    const shapes = this.extractElements(spTree, 'p:sp');
    for (const shape of shapes) {
      if (this.isDecorative(shape)) continue;
      const element = this.parseShape(shape, rels, images);
      if (element) slide.elements.push(element);
    }

    // Parse pictures (pic elements)
    const pics = this.extractElements(spTree, 'p:pic');
    for (const pic of pics) {
      if (this.isDecorative(pic)) continue;
      const element = this.parsePicture(pic, rels, images);
      if (element) slide.elements.push(element);
    }

    // Parse group shapes — skip decorative groups entirely
    const groups = this.extractElements(spTree, 'p:grpSp');
    for (const group of groups) {
      if (this.isDecorative(group)) continue;
      const innerShapes = this.extractElements(group, 'p:sp');
      for (const shape of innerShapes) {
        if (this.isDecorative(shape)) continue;
        const element = this.parseShape(shape, rels, images);
        if (element) slide.elements.push(element);
      }
      const innerPics = this.extractElements(group, 'p:pic');
      for (const pic of innerPics) {
        if (this.isDecorative(pic)) continue;
        const element = this.parsePicture(pic, rels, images);
        if (element) slide.elements.push(element);
      }
    }

    return slide;
  }

  private isDecorative(xml: string): boolean {
    return xml.includes('decorative') || xml.includes('designElem');
  }

  private findNextTag(xml: string, tagName: string, fromIdx: number): number {
    const prefix = `<${tagName}`;
    let idx = fromIdx;
    while (true) {
      idx = xml.indexOf(prefix, idx);
      if (idx === -1) return -1;
      const charAfter = xml[idx + prefix.length];
      if (charAfter === '>' || charAfter === ' ' || charAfter === '/' || charAfter === '\t' || charAfter === '\n' || charAfter === '\r') {
        return idx;
      }
      idx += 1;
    }
  }

  private extractElements(xml: string, tagName: string): string[] {
    const elements: string[] = [];
    const closeTag = `</${tagName}>`;
    let startIdx = 0;

    while (true) {
      const openIdx = this.findNextTag(xml, tagName, startIdx);
      if (openIdx === -1) break;

      let depth = 1;
      let searchIdx = openIdx + tagName.length + 2;
      let foundEnd = false;

      while (searchIdx < xml.length) {
        const nextOpen = this.findNextTag(xml, tagName, searchIdx);
        const nextClose = xml.indexOf(closeTag, searchIdx);

        if (nextClose === -1) break;

        if (nextOpen !== -1 && nextOpen < nextClose) {
          depth++;
          searchIdx = nextOpen + tagName.length + 2;
        } else {
          depth--;
          if (depth === 0) {
            elements.push(xml.substring(openIdx, nextClose + closeTag.length));
            startIdx = nextClose + closeTag.length;
            foundEnd = true;
            break;
          }
          searchIdx = nextClose + closeTag.length;
        }
      }

      if (!foundEnd) {
        startIdx = openIdx + 1;
      }
    }

    return elements;
  }

  private parsePosition(xml: string): { x: number; y: number; width: number; height: number } {
    // Try to get position from p:spPr > a:xfrm first for accuracy
    const spPrMatch = xml.match(/<p:spPr>([\s\S]*?)<\/p:spPr>/) || xml.match(/<p:spPr[^>]*>([\s\S]*?)<\/p:spPr>/);
    const searchXml = spPrMatch ? spPrMatch[1] : xml;

    const offMatch = searchXml.match(/<a:off x="(-?\d+)" y="(-?\d+)"/);
    const extMatch = searchXml.match(/<a:ext cx="(\d+)" cy="(\d+)"/);

    const x = offMatch ? parseInt(offMatch[1]) / this.EMU_PER_PX : 0;
    const y = offMatch ? parseInt(offMatch[2]) / this.EMU_PER_PX : 0;
    const width = extMatch ? parseInt(extMatch[1]) / this.EMU_PER_PX : 100;
    const height = extMatch ? parseInt(extMatch[2]) / this.EMU_PER_PX : 100;

    return {
      x: (x / this.SLIDE_WIDTH) * 100,
      y: (y / this.SLIDE_HEIGHT) * 100,
      width: (width / this.SLIDE_WIDTH) * 100,
      height: (height / this.SLIDE_HEIGHT) * 100
    };
  }

  private parseShape(xml: string, rels: Map<string, string>, images: Map<string, string>): SlideElement | null {
    const pos = this.parsePosition(xml);
    const paragraphs = this.parseParagraphs(xml);

    if (paragraphs.length === 0 || paragraphs.every(p => p.runs.every(r => !r.text.trim()))) {
      // Check if it's a filled shape
      const hasFill = xml.includes('<a:solidFill>') || xml.includes('<a:gradFill>');
      if (!hasFill) return null;

      const fillColor = this.extractColor(xml);
      return {
        type: 'shape',
        ...pos,
        backgroundColor: fillColor || undefined
      };
    }

    return {
      type: 'text',
      ...pos,
      paragraphs
    };
  }

  private parsePicture(xml: string, rels: Map<string, string>, images: Map<string, string>): SlideElement | null {
    const pos = this.parsePosition(xml);
    const embedMatch = xml.match(/r:embed="([^"]*)"/);

    if (embedMatch) {
      const relId = embedMatch[1];
      const target = rels.get(relId);
      if (target) {
        const imgSrc = images.get(target) || images.get(`media/${target.split('/').pop()}`);
        if (imgSrc) {
          return {
            type: 'image',
            src: imgSrc,
            ...pos
          };
        }
      }
    }

    return null;
  }

  private parseParagraphs(xml: string): ParagraphContent[] {
    const paragraphs: ParagraphContent[] = [];
    const pElements = this.extractElements(xml, 'a:p');

    for (const pXml of pElements) {
      const paragraph: ParagraphContent = { runs: [] };

      // Parse alignment
      const alignMatch = pXml.match(/<a:pPr[^>]*algn="([^"]*)"/);
      if (alignMatch) {
        const alignMap: Record<string, string> = { l: 'left', ctr: 'center', r: 'right', just: 'justify' };
        paragraph.align = alignMap[alignMatch[1]] || 'left';
      }

      // Parse runs
      const runs = this.extractElements(pXml, 'a:r');
      for (const rXml of runs) {
        const textMatch = rXml.match(/<a:t>([\s\S]*?)<\/a:t>/);
        if (!textMatch) continue;

        const run: RunContent = {
          text: textMatch[1]
        };

        // Font size (in hundredths of a point)
        const szMatch = rXml.match(/<a:rPr[^>]*sz="(\d+)"/);
        if (szMatch) {
          run.fontSize = parseInt(szMatch[1]) / 100;
        }

        // Bold
        if (rXml.match(/<a:rPr[^>]*b="1"/)) {
          run.bold = true;
        }

        // Italic
        if (rXml.match(/<a:rPr[^>]*i="1"/)) {
          run.italic = true;
        }

        // Underline
        if (rXml.match(/<a:rPr[^>]*u="sng"/)) {
          run.underline = true;
        }

        // Color
        const colorMatch = rXml.match(/<a:solidFill>\s*<a:srgbClr val="([^"]*)"/);
        if (colorMatch) {
          run.fontColor = `#${colorMatch[1]}`;
        }

        // Font family
        const fontMatch = rXml.match(/<a:latin typeface="([^"]*)"/);
        if (fontMatch) {
          run.fontFamily = fontMatch[1];
        }

        paragraph.runs.push(run);
      }

      if (paragraph.runs.length > 0) {
        paragraphs.push(paragraph);
      }
    }

    return paragraphs;
  }

  private extractColor(xml: string): string | null {
    const match = xml.match(/<a:solidFill>\s*<a:srgbClr val="([^"]*)"/);
    return match ? `#${match[1]}` : null;
  }
}
