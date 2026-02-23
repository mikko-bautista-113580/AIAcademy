import { Component, signal, computed, HostListener } from '@angular/core';
import { NgClass } from '@angular/common';

interface Presentation {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  filename: string;
  slidesPath: string;
  slideCount: number;
  date: string;
  icon: string;
  gradient: string;
  tags: string[];
  workflowCreator: string;
  estimatedTimeCreation: string;
  modelUsed: string;
}

@Component({
  selector: 'app-presentations',
  imports: [NgClass],
  templateUrl: './presentations.html',
  styleUrl: './presentations.scss',
})
export class Presentations {
  presentations: Presentation[] = [
    {
      id: 'nov23',
      title: 'AI Models Comparison',
      subtitle: 'November 2025 Edition',
      description: 'A comprehensive comparison of leading AI models including GPT-4, Claude, Gemini, and more. Covers performance benchmarks, pricing, use cases, and recommendations for different scenarios.',
      filename: 'AIModelsComparison_November23.pptx',
      slidesPath: 'slides/nov23',
      slideCount: 25,
      date: 'November 23, 2025',
      icon: '📊',
      gradient: 'from-primary to-primary-dark',
      tags: ['GPT-4', 'Claude', 'Gemini', 'Benchmarks'],
      workflowCreator: 'Cascade (Windsurf IDE)',
      estimatedTimeCreation: '~45 minutes',
      modelUsed: 'Claude 3.5 Sonnet'
    },
    {
      id: 'sep16',
      title: 'AI Models Comparison',
      subtitle: 'September 2025 Edition',
      description: 'An earlier snapshot of the AI landscape comparing available models, capabilities, and evolution of AI technologies. Provides historical context for understanding the rapid advancement of AI.',
      filename: 'AIModelsComparison_September16.pptx',
      slidesPath: 'slides/sep16',
      slideCount: 26,
      date: 'September 16, 2025',
      icon: '📈',
      gradient: 'from-secondary to-secondary-dark',
      tags: ['Historical', 'AI Evolution', 'Comparison'],
      workflowCreator: 'Cascade (Windsurf IDE)',
      estimatedTimeCreation: '~1 hour',
      modelUsed: 'Claude 3.5 Sonnet'
    },
    {
      id: 'workflow-creator',
      title: 'Workflow Creator',
      subtitle: 'AI-Powered Workflow Automation',
      description: 'A deep dive into how AI workflow creators streamline development processes, automate repetitive tasks, and enable teams to build faster with intelligent code generation.',
      filename: 'WorkflowCreator.pptx',
      slidesPath: 'slides/workflow-creator',
      slideCount: 10,
      date: '2025',
      icon: '🔧',
      gradient: 'from-violet-500 to-violet-700',
      tags: ['Workflow', 'Automation', 'AI Agents', 'Productivity'],
      workflowCreator: 'Cascade (Windsurf IDE)',
      estimatedTimeCreation: '~30 minutes',
      modelUsed: 'Claude 3.5 Sonnet'
    },
    {
      id: 'estimated-time',
      title: 'Estimated Time Creation',
      subtitle: 'AI Development Time Analysis',
      description: 'An analysis of estimated creation times when using AI-assisted development workflows. Covers time savings, productivity metrics, and real-world benchmarks across different project types.',
      filename: 'EstimatedTimeCreation.pptx',
      slidesPath: 'slides/estimated-time',
      slideCount: 15,
      date: '2025',
      icon: '⏱️',
      gradient: 'from-amber-500 to-amber-700',
      tags: ['Time Estimation', 'Productivity', 'Metrics', 'Benchmarks'],
      workflowCreator: 'Cascade (Windsurf IDE)',
      estimatedTimeCreation: '~40 minutes',
      modelUsed: 'Claude 3.5 Sonnet'
    },
    {
      id: 'model-to-use',
      title: 'Model To Use',
      subtitle: 'Choosing the Right AI Model',
      description: 'A practical guide to selecting the right AI model for different tasks. Covers model strengths, weaknesses, cost considerations, and decision frameworks for choosing between GPT-4, Claude, Gemini, and others.',
      filename: 'ModelToUse.pptx',
      slidesPath: 'slides/model-to-use',
      slideCount: 15,
      date: '2025',
      icon: '🤖',
      gradient: 'from-emerald-500 to-emerald-700',
      tags: ['Model Selection', 'GPT-4', 'Claude', 'Decision Framework'],
      workflowCreator: 'Cascade (Windsurf IDE)',
      estimatedTimeCreation: '~40 minutes',
      modelUsed: 'Claude 3.5 Sonnet'
    },
    {
      id: 'pr-roadmap',
      title: 'Pull Request Roadmap',
      subtitle: 'PR Workflow & Best Practices',
      description: 'A visual roadmap of the pull request lifecycle from creation to merge. Covers PR best practices, review workflows, CI/CD integration, and team collaboration strategies.',
      filename: 'Pull Request Roadmap.pptx',
      slidesPath: 'slides/pr-roadmap',
      slideCount: 1,
      date: '2025',
      icon: '🗺️',
      gradient: 'from-blue-500 to-blue-700',
      tags: ['Pull Requests', 'Code Review', 'CI/CD', 'Git'],
      workflowCreator: 'Cascade (Windsurf IDE)',
      estimatedTimeCreation: '~15 minutes',
      modelUsed: 'Claude 3.5 Sonnet'
    }
  ];

  activePresentation = signal<Presentation | null>(null);
  slideImages = signal<string[]>([]);
  currentSlideIndex = signal(0);
  isFullscreen = signal(false);

  currentSlideImage = computed(() => {
    const imgs = this.slideImages();
    const idx = this.currentSlideIndex();
    return imgs.length > 0 ? imgs[idx] : null;
  });

  totalSlides = computed(() => this.slideImages().length);

  @HostListener('document:keydown', ['$event'])
  handleKeyboard(event: KeyboardEvent) {
    if (!this.activePresentation()) return;
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      this.nextSlide();
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      this.prevSlide();
    } else if (event.key === 'Escape') {
      if (this.isFullscreen()) {
        this.isFullscreen.set(false);
      } else {
        this.closeViewer();
      }
    }
  }

  openViewer(pres: Presentation) {
    this.activePresentation.set(pres);
    this.currentSlideIndex.set(0);
    const images: string[] = [];
    for (let i = 1; i <= pres.slideCount; i++) {
      images.push(`${pres.slidesPath}/slide-${i}.png`);
    }
    this.slideImages.set(images);
  }

  closeViewer() {
    this.activePresentation.set(null);
    this.slideImages.set([]);
    this.currentSlideIndex.set(0);
    this.isFullscreen.set(false);
  }

  nextSlide() {
    if (this.currentSlideIndex() < this.totalSlides() - 1) {
      this.currentSlideIndex.update(i => i + 1);
    }
  }

  prevSlide() {
    if (this.currentSlideIndex() > 0) {
      this.currentSlideIndex.update(i => i - 1);
    }
  }

  goToSlide(index: number) {
    this.currentSlideIndex.set(index);
  }

  toggleFullscreen() {
    this.isFullscreen.update(v => !v);
  }

  downloadPresentation(pres: Presentation) {
    const link = document.createElement('a');
    link.href = pres.filename;
    link.download = pres.filename;
    link.click();
  }
}
