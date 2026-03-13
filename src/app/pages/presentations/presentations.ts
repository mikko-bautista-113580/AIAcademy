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
  category: string;
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
      category: 'AI Models & Selection',
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
      category: 'AI Models & Selection',
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
      category: 'Productivity & Workflows',
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
      category: 'Productivity & Workflows',
    },
    {
      id: 'model-to-use',
      title: 'Model To Use',
      subtitle: 'Choosing the Right AI Model',
      description: 'A practical guide to selecting the right AI model for different tasks. Covers model strengths, weaknesses, cost considerations, and decision frameworks for choosing between GPT-4, Claude, Gemini, and others.',
      filename: 'ModelToUse.pptx',
      slidesPath: 'slides/model-to-use',
      slideCount: 14,
      date: '2025',
      icon: '🤖',
      gradient: 'from-emerald-500 to-emerald-700',
      tags: ['Model Selection', 'GPT-4', 'Claude', 'Decision Framework'],
      workflowCreator: 'Cascade (Windsurf IDE)',
      category: 'AI Models & Selection',
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
      category: 'DevOps & CI/CD',
    },
    {
      id: 'test-case-association',
      title: 'Automating Test Case Association',
      subtitle: 'Azure DevOps Test Automation',
      description: 'A guide to automating test case association in Azure DevOps, streamlining the process of linking test cases to work items and improving test traceability across the development lifecycle.',
      filename: 'Automating Test Case Association in Azure DevOps.pptx',
      slidesPath: 'slides/test-case-association',
      slideCount: 11,
      date: '2025',
      icon: '🧪',
      gradient: 'from-cyan-500 to-cyan-700',
      tags: ['Azure DevOps', 'Test Cases', 'Automation', 'Traceability'],
      workflowCreator: 'Cascade (Windsurf IDE)',
      category: 'DevOps & CI/CD',
    },
    {
      id: 'gw-endpoint-generator',
      title: 'Automated GW Endpoint Generator',
      subtitle: 'Gateway API Automation',
      description: 'An overview of the automated gateway endpoint generator that streamlines the creation of API gateway endpoints, reducing boilerplate code and ensuring consistency across services.',
      filename: 'Automated GW Endpoint Generator.pptx',
      slidesPath: 'slides/gw-endpoint-generator',
      slideCount: 8,
      date: '2025',
      icon: '🌐',
      gradient: 'from-rose-500 to-rose-700',
      tags: ['API Gateway', 'Code Generation', 'Automation', 'Endpoints'],
      workflowCreator: 'Cascade (Windsurf IDE)',
      category: 'Code Generation',
    },
    {
      id: 'microservice-endpoint-generator',
      title: 'Automated Microservice Endpoint Generator',
      subtitle: 'Microservice API Automation',
      description: 'A deep dive into the automated microservice endpoint generator that accelerates API development by generating consistent, well-structured endpoints for microservice architectures.',
      filename: 'Automated Microservice Endpoint Generator.pptx',
      slidesPath: 'slides/microservice-endpoint-generator',
      slideCount: 8,
      date: '2025',
      icon: '⚙️',
      gradient: 'from-indigo-500 to-indigo-700',
      tags: ['Microservices', 'Code Generation', 'Automation', 'API'],
      workflowCreator: 'Cascade (Windsurf IDE)',
      category: 'Code Generation',
    },
    {
      id: 'github-pr-reviewer',
      title: 'GitHub PR Reviewer',
      subtitle: 'AI-Powered Code Review',
      description: 'A walkthrough of the GitHub PR Reviewer tool that leverages AI to automate pull request reviews, catch issues early, and provide actionable feedback to developers — accelerating code quality and team velocity.',
      filename: 'Github_PR_Reviewer_V3.pptx',
      slidesPath: 'slides/github-pr-reviewer',
      slideCount: 13,
      date: '2025',
      icon: '🔍',
      gradient: 'from-teal-500 to-teal-700',
      tags: ['GitHub', 'Pull Requests', 'Code Review', 'AI Automation'],
      workflowCreator: 'Cascade (Windsurf IDE)',
      category: 'DevOps & CI/CD',
    },
    {
      id: 'requirements-to-test-case',
      title: 'Requirements to Test Case Generator',
      subtitle: 'AI-Driven Test Case Creation',
      description: 'An overview of the Requirements to Test Case Generator that uses AI to automatically convert user stories and requirements into comprehensive test cases, improving test coverage and reducing manual QA effort.',
      filename: 'Requirements_to_Test_Case_Generator_v4.pptx',
      slidesPath: 'slides/requirements-to-test-case',
      slideCount: 13,
      date: '2025',
      icon: '📝',
      gradient: 'from-pink-500 to-pink-700',
      tags: ['Test Cases', 'Requirements', 'QA', 'AI Generation'],
      workflowCreator: 'Cascade (Windsurf IDE)',
      category: 'DevOps & CI/CD',
    },
    {
      id: 'test-suite-creator',
      title: 'Test Suite Creator',
      subtitle: 'Automated Test Suite Generation',
      description: 'A deep dive into the Test Suite Creator tool that leverages AI to generate complete test suites from requirements and existing code, ensuring thorough test coverage and streamlined QA processes.',
      filename: 'TestSuiteCreator.pptx',
      slidesPath: 'slides/test-suite-creator',
      slideCount: 11,
      date: '2025',
      icon: '🧪',
      gradient: 'from-orange-500 to-orange-700',
      tags: ['Test Suites', 'QA', 'Automation', 'AI Testing'],
      workflowCreator: 'Cascade (Windsurf IDE)',
      category: 'DevOps & CI/CD',
    }
  ];

  categories = [...new Set(this.presentations.map(p => p.category))];
  activeCategory = signal<string | null>(null);

  categoryMeta: Record<string, { icon: string; color: string; activeGradient: string }> = {
    'AI Models & Selection': { icon: '🧠', color: 'bg-violet-100 text-violet-700 border-violet-200', activeGradient: 'from-violet-500 to-violet-700' },
    'Productivity & Workflows': { icon: '⚡', color: 'bg-amber-100 text-amber-700 border-amber-200', activeGradient: 'from-amber-500 to-amber-700' },
    'DevOps & CI/CD': { icon: '🔄', color: 'bg-blue-100 text-blue-700 border-blue-200', activeGradient: 'from-blue-500 to-blue-700' },
    'Code Generation': { icon: '💻', color: 'bg-emerald-100 text-emerald-700 border-emerald-200', activeGradient: 'from-emerald-500 to-emerald-700' },
  };

  getCategoryCount(category: string): number {
    return this.presentations.filter(p => p.category === category).length;
  }

  filteredPresentations = computed(() => {
    const cat = this.activeCategory();
    if (!cat) return this.presentations;
    return this.presentations.filter(p => p.category === cat);
  });

  expandedDescription = signal<Presentation | null>(null);

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

  setCategory(category: string | null) {
    this.activeCategory.set(category);
  }

  downloadPresentation(pres: Presentation) {
    const link = document.createElement('a');
    link.href = pres.filename;
    link.download = pres.filename;
    link.click();
  }
}
