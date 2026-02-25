import { Component, signal, ViewChild, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';

interface TopicHighlight {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  category: string;
  categoryIcon: string;
  gradient: string;
  tags: string[];
  slidesPath: string;
  slideCount: number;
  route: string;
}

interface DemoVideo {
  id: string;
  title: string;
  description: string;
  src: string;
  icon: string;
  tag: string;
  tagClass: string;
}

@Component({
  selector: 'app-landing',
  imports: [RouterLink, NgClass],
  templateUrl: './landing.html',
  styleUrl: './landing.scss',
})
export class Landing implements OnInit, OnDestroy {
  @ViewChild('videoPlayer') videoPlayer!: ElementRef<HTMLVideoElement>;
  @ViewChild('carouselStrip') carouselStrip!: ElementRef<HTMLDivElement>;

  private carouselInterval: any;

  topicHighlights: TopicHighlight[] = [
    {
      id: 'nov23',
      title: 'AI Models Comparison',
      subtitle: 'November 2025 Edition',
      description: 'A comprehensive comparison of leading AI models including GPT-4, Claude, Gemini, and more. Covers performance benchmarks, pricing, and recommendations.',
      icon: '📊',
      category: 'AI Models & Selection',
      categoryIcon: '🧠',
      gradient: 'from-violet-600 to-indigo-600',
      tags: ['GPT-4', 'Claude', 'Gemini', 'Benchmarks'],
      slidesPath: 'slides/nov23',
      slideCount: 25,
      route: '/presentations',
    },
    {
      id: 'workflow-creator',
      title: 'Workflow Creator',
      subtitle: 'AI-Powered Workflow Automation',
      description: 'How AI workflow creators streamline development processes, automate repetitive tasks, and enable teams to build faster with intelligent code generation.',
      icon: '🔧',
      category: 'Productivity & Workflows',
      categoryIcon: '⚡',
      gradient: 'from-amber-500 to-orange-600',
      tags: ['Workflow', 'Automation', 'AI Agents'],
      slidesPath: 'slides/workflow-creator',
      slideCount: 10,
      route: '/presentations',
    },
    {
      id: 'test-case-association',
      title: 'Automating Test Case Association',
      subtitle: 'Azure DevOps Test Automation',
      description: 'Automating test case association in Azure DevOps, streamlining the process of linking test cases to work items and improving test traceability.',
      icon: '🧪',
      category: 'DevOps & CI/CD',
      categoryIcon: '🔄',
      gradient: 'from-cyan-500 to-blue-600',
      tags: ['Azure DevOps', 'Test Cases', 'Automation'],
      slidesPath: 'slides/test-case-association',
      slideCount: 11,
      route: '/presentations',
    },
    {
      id: 'mark-echon',
      title: 'AI SDLC Pair Programming',
      subtitle: 'Mark Echon - Live Session',
      description: 'Live pair programming session demonstrating AI-assisted software development lifecycle practices and real-time coding collaboration.',
      icon: '👨‍💻',
      category: 'Pair Programming',
      categoryIcon: '🤝',
      gradient: 'from-primary to-primary-dark',
      tags: ['SDLC', 'AI', 'Live Coding'],
      slidesPath: '',
      slideCount: 0,
      route: '/pair-programming',
    },
    {
      id: 'gw-endpoint-generator',
      title: 'Automated GW Endpoint Generator',
      subtitle: 'Gateway API Automation',
      description: 'Streamline the creation of API gateway endpoints, reducing boilerplate code and ensuring consistency across services with automated generation.',
      icon: '🌐',
      category: 'Code Generation',
      categoryIcon: '💻',
      gradient: 'from-emerald-500 to-teal-600',
      tags: ['API Gateway', 'Code Generation', 'Endpoints'],
      slidesPath: 'slides/gw-endpoint-generator',
      slideCount: 8,
      route: '/presentations',
    },
    {
      id: 'armando-lopez',
      title: 'AI Pair Programming',
      subtitle: 'Armando Lopez Jr. - Live Session',
      description: 'Hands-on pair programming session showcasing AI-driven development workflows, code generation, and collaborative problem solving.',
      icon: '🤝',
      category: 'Pair Programming',
      categoryIcon: '🤝',
      gradient: 'from-violet-500 to-violet-700',
      tags: ['AI', 'Collaboration', 'Live Coding'],
      slidesPath: '',
      slideCount: 0,
      route: '/pair-programming',
    },
    {
      id: 'pr-roadmap',
      title: 'Pull Request Roadmap',
      subtitle: 'PR Workflow & Best Practices',
      description: 'A visual roadmap of the pull request lifecycle from creation to merge. Covers PR best practices, review workflows, and CI/CD integration.',
      icon: '🗺️',
      category: 'DevOps & CI/CD',
      categoryIcon: '🔄',
      gradient: 'from-blue-500 to-indigo-600',
      tags: ['Pull Requests', 'Code Review', 'CI/CD'],
      slidesPath: 'slides/pr-roadmap',
      slideCount: 1,
      route: '/presentations',
    },
  ];

  activeTopicIndex = signal(0);
  activeTopic = signal<TopicHighlight>(this.topicHighlights[0]);

  demoVideos: DemoVideo[] = [
    {
      id: 'api-endpoint',
      title: 'API Endpoint Generator',
      description: 'Watch how Windsurf AI generates production-ready API endpoints in minutes, automating boilerplate code and best practices.',
      src: 'demo-video.mp4',
      icon: '🚀',
      tag: 'Windsurf',
      tagClass: 'bg-primary/15 text-primary'
    },
    {
      id: 'api-user-stories',
      title: 'Creating API User Stories',
      description: 'See how Windsurf streamlines the creation of comprehensive API user stories with acceptance criteria and technical specs.',
      src: 'creating-api-user-stories.mp4',
      icon: '📋',
      tag: 'Windsurf',
      tagClass: 'bg-secondary/15 text-secondary'
    },
    {
      id: 'user-story-copilot',
      title: 'User Stories with CoPilot',
      description: 'Leverage GitHub CoPilot to rapidly draft and refine user stories with AI-assisted content generation.',
      src: 'creating-user-story-copilot.mp4',
      icon: '🤖',
      tag: 'CoPilot',
      tagClass: 'bg-green-500/15 text-green-500'
    },
    {
      id: 'mermaid-ai',
      title: 'Mermaid Integration with AI',
      description: 'Automatically generate visual diagrams and flowcharts from code and requirements using AI-powered Mermaid integration.',
      src: 'mermaid-integration-ai.mp4',
      icon: '📊',
      tag: 'Diagrams',
      tagClass: 'bg-violet-500/15 text-violet-500'
    }
  ];

  activeVideo = signal<DemoVideo>(this.demoVideos[0]);

  scrollToDemo() {
    document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' });
  }

  selectVideo(video: DemoVideo) {
    this.activeVideo.set(video);
    if (this.videoPlayer?.nativeElement) {
      this.videoPlayer.nativeElement.load();
    }
  }

  ngOnInit() {
    this.startCarousel();
  }

  scrollActiveIntoView() {
    setTimeout(() => {
      if (this.activeTopicIndex() < 2) {
        this.carouselStrip?.nativeElement?.scrollTo({ left: 0, behavior: 'smooth' });
        return;
      }
      const container = this.carouselStrip?.nativeElement;
      if (!container) return;
      const cards = container.children;
      const activeCard = cards[this.activeTopicIndex()] as HTMLElement;
      if (!activeCard) return;
      const containerWidth = container.clientWidth;
      const cardLeft = activeCard.offsetLeft;
      const cardWidth = activeCard.offsetWidth;
      const scrollTarget = cardLeft - (containerWidth / 2) + (cardWidth / 2);
      container.scrollTo({ left: scrollTarget, behavior: 'smooth' });
    }, 350);
  }

  ngOnDestroy() {
    this.stopCarousel();
  }

  startCarousel() {
    this.carouselInterval = setInterval(() => {
      this.nextTopic();
    }, 5000);
  }

  stopCarousel() {
    if (this.carouselInterval) {
      clearInterval(this.carouselInterval);
    }
  }

  nextTopic() {
    const next = (this.activeTopicIndex() + 1) % this.topicHighlights.length;
    this.activeTopicIndex.set(next);
    this.activeTopic.set(this.topicHighlights[next]);
    this.scrollActiveIntoView();
  }

  prevTopic() {
    const prev = (this.activeTopicIndex() - 1 + this.topicHighlights.length) % this.topicHighlights.length;
    this.activeTopicIndex.set(prev);
    this.activeTopic.set(this.topicHighlights[prev]);
    this.scrollActiveIntoView();
  }

  goToTopic(index: number) {
    this.stopCarousel();
    this.activeTopicIndex.set(index);
    this.activeTopic.set(this.topicHighlights[index]);
    this.scrollActiveIntoView();
    this.startCarousel();
  }

}
