import { Component, signal, computed, inject, ViewChild, ElementRef, OnInit, OnDestroy, SecurityContext } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';
import { RoleService, Role } from '../../services/role.service';

interface RoleContent {
  badge: string;
  headline: string;
  headlineHighlight: string;
  description: string;
  primaryCta: string;
  primaryCtaLink: string;
  demoSectionTitle: string;
  demoSectionHighlight: string;
  demoSectionDescription: string;
  exploreSectionTitle: string;
  exploreSectionDescription: string;
  ctaTitle: string;
  ctaTitleHighlight: string;
  ctaDescription: string;
  ctaPrimaryCta: string;
  topicOrder: string[];
  videoOrder: string[];
  heroBadges: { icon: string; label: string }[];
}

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
  roles: Role[];
}

interface DemoVideo {
  id: string;
  title: string;
  description: string;
  src: string;
  embedUrl?: string;
  thumbnail?: string;
  icon: string;
  tag: string;
  tagClass: string;
  roles: Role[];
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
  private roleService = inject(RoleService);
  private sanitizer = inject(DomSanitizer);

  sanitizeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  private roleContentMap: Record<Role, RoleContent> = {
    'QA': {
      badge: 'AI-Powered Quality Engineering',
      headline: 'Elevate Your',
      headlineHighlight: 'Testing with AI',
      description: 'Automate test case creation, streamline QA workflows, and catch defects faster. Learn how AI transforms quality assurance from manual effort into intelligent, continuous testing.',
      primaryCta: 'Explore Test Automation',
      primaryCtaLink: '/presentations',
      demoSectionTitle: 'AI-Powered',
      demoSectionHighlight: 'QA Demos',
      demoSectionDescription: 'See how AI tools automate test case generation, link test cases to work items, and streamline your entire QA pipeline.',
      exploreSectionTitle: 'Boost Your QA Workflow',
      exploreSectionDescription: 'From automated test case association to AI-driven defect detection — explore tools and sessions built for quality engineers.',
      ctaTitle: 'Ready to Automate Your',
      ctaTitleHighlight: 'QA Workflow?',
      ctaDescription: 'Discover how AI can help you write better test cases, automate regression testing, and ship with confidence.',
      ctaPrimaryCta: 'Start Testing Smarter',
      topicOrder: ['test-case-association', 'pr-roadmap', 'nov23', 'workflow-creator', 'gw-endpoint-generator', 'mark-echon', 'armando-lopez'],
      videoOrder: ['api-endpoint', 'api-user-stories', 'mermaid-ai', 'user-story-copilot'],
      heroBadges: [{ icon: '✅', label: 'Test Cases' }, { icon: '📊', label: 'Coverage' }, { icon: '🤖', label: 'Automation' }],
    },
    'BA': {
      badge: 'AI-Driven Business Analysis',
      headline: 'Transform',
      headlineHighlight: 'Requirements with AI',
      description: 'Draft user stories in seconds, generate acceptance criteria, and visualize workflows with AI. Learn how modern business analysts leverage AI to deliver clearer, faster requirements.',
      primaryCta: 'See User Story Demos',
      primaryCtaLink: '/presentations',
      demoSectionTitle: 'AI-Powered',
      demoSectionHighlight: 'BA Demos',
      demoSectionDescription: 'Watch how AI tools generate comprehensive user stories, acceptance criteria, and visual diagrams from simple prompts.',
      exploreSectionTitle: 'Sharpen Your BA Toolkit',
      exploreSectionDescription: 'Explore demos and sessions on AI-assisted requirements gathering, user story creation, and workflow visualization.',
      ctaTitle: 'Ready to Supercharge Your',
      ctaTitleHighlight: 'Business Analysis?',
      ctaDescription: 'Learn how AI helps you write better user stories, map processes visually, and collaborate more effectively with dev teams.',
      ctaPrimaryCta: 'Start Analyzing Smarter',
      topicOrder: ['workflow-creator', 'nov23', 'pr-roadmap', 'test-case-association', 'gw-endpoint-generator', 'mark-echon', 'armando-lopez'],
      videoOrder: ['api-user-stories', 'user-story-copilot', 'mermaid-ai', 'api-endpoint'],
      heroBadges: [{ icon: '📋', label: 'User Stories' }, { icon: '🔄', label: 'Workflows' }, { icon: '📐', label: 'Diagrams' }],
    },
    'Developer': {
      badge: 'AI-Accelerated Development',
      headline: 'Code Faster with',
      headlineHighlight: 'AI Pair Programming',
      description: 'Generate production-ready code, automate boilerplate, and learn AI-assisted development through real-world pair programming sessions and live demos.',
      primaryCta: 'Pair Programming',
      primaryCtaLink: '/pair-programming',
      demoSectionTitle: 'AI-Powered',
      demoSectionHighlight: 'Developer Demos',
      demoSectionDescription: 'Explore how AI tools like Windsurf and CoPilot accelerate real development workflows — from endpoint generation to diagramming.',
      exploreSectionTitle: 'Level Up Your Dev Skills',
      exploreSectionDescription: 'Dive into demos, pair programming sessions, and presentations — all designed to help you write better code faster with AI.',
      ctaTitle: 'Ready to Transform Your',
      ctaTitleHighlight: 'Development Workflow?',
      ctaDescription: 'Explore demos, pair programming sessions, and presentations — and start building real AI-assisted development skills today.',
      ctaPrimaryCta: 'Start Coding with AI',
      topicOrder: ['gw-endpoint-generator', 'mark-echon', 'armando-lopez', 'nov23', 'workflow-creator', 'pr-roadmap', 'test-case-association'],
      videoOrder: ['api-endpoint', 'mermaid-ai', 'api-user-stories', 'user-story-copilot'],
      heroBadges: [{ icon: '▶️', label: 'Demos' }, { icon: '👥', label: 'Pair Programming' }, { icon: '📊', label: 'Presentations' }],
    },
    'Technical Lead': {
      badge: 'AI for Technical Leadership',
      headline: 'Lead Your Team with',
      headlineHighlight: 'AI-Powered Strategy',
      description: 'Evaluate AI models, architect smarter workflows, and guide your team with data-driven decisions. Learn how technical leaders leverage AI to ship better software, faster.',
      primaryCta: 'Explore AI Models',
      primaryCtaLink: '/presentations',
      demoSectionTitle: 'AI-Powered',
      demoSectionHighlight: 'Tech Lead Demos',
      demoSectionDescription: 'See how AI tools can help you make architectural decisions, automate code reviews, and establish team-wide best practices.',
      exploreSectionTitle: 'Architect Your AI Strategy',
      exploreSectionDescription: 'From AI model comparisons to PR workflows and code generation — explore content designed for technical decision-makers.',
      ctaTitle: 'Ready to Lead with',
      ctaTitleHighlight: 'AI Intelligence?',
      ctaDescription: 'Equip yourself with the knowledge to choose the right AI tools, mentor your team, and drive technical excellence.',
      ctaPrimaryCta: 'Start Leading with AI',
      topicOrder: ['nov23', 'pr-roadmap', 'gw-endpoint-generator', 'workflow-creator', 'mark-echon', 'armando-lopez', 'test-case-association'],
      videoOrder: ['api-endpoint', 'mermaid-ai', 'api-user-stories', 'user-story-copilot'],
      heroBadges: [{ icon: '🧠', label: 'AI Models' }, { icon: '🏗️', label: 'Architecture' }, { icon: '📝', label: 'Best Practices' }],
    },
    'Management': {
      badge: 'AI Strategy for Leaders',
      headline: 'Drive Team Success with',
      headlineHighlight: 'AI Innovation',
      description: 'Understand how AI transforms development workflows, boosts team productivity, and delivers measurable results. See the real impact of AI tools on your team\'s output.',
      primaryCta: 'View Presentations',
      primaryCtaLink: '/presentations',
      demoSectionTitle: 'AI-Powered',
      demoSectionHighlight: 'Productivity Demos',
      demoSectionDescription: 'See real examples of how AI tools reduce development time, improve code quality, and accelerate delivery across your teams.',
      exploreSectionTitle: 'Understand AI\'s Impact',
      exploreSectionDescription: 'Browse demos, sessions, and presentations to see how AI is transforming software delivery — and what it means for your teams.',
      ctaTitle: 'Ready to Transform Your',
      ctaTitleHighlight: 'Team\'s Productivity?',
      ctaDescription: 'Discover how AI tools can help your teams deliver faster, improve quality, and stay ahead of the competition.',
      ctaPrimaryCta: 'Explore AI for Teams',
      topicOrder: ['nov23', 'workflow-creator', 'pr-roadmap', 'test-case-association', 'gw-endpoint-generator', 'mark-echon', 'armando-lopez'],
      videoOrder: ['api-endpoint', 'api-user-stories', 'user-story-copilot', 'mermaid-ai'],
      heroBadges: [{ icon: '📈', label: 'Team Impact' }, { icon: '💡', label: 'Innovation' }, { icon: '🎯', label: 'Strategy' }],
    },
  };

  roleContent = computed(() => {
    const role = this.roleService.selectedRole();
    return role ? this.roleContentMap[role] : this.roleContentMap['Developer'];
  });

  currentRole = computed(() => this.roleService.selectedRole() ?? 'Developer');

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
      roles: ['QA', 'BA', 'Developer', 'Technical Lead', 'Management'],
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
      roles: ['Developer', 'Technical Lead'],
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
      roles: ['QA', 'BA', 'Technical Lead'],
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
      roles: ['QA', 'BA', 'Developer', 'Technical Lead', 'Management'],
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
      roles: ['Developer', 'Technical Lead'],
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
      roles: ['QA', 'BA', 'Developer', 'Technical Lead', 'Management'],
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
      roles: ['Developer', 'Technical Lead'],
    },
  ];

  activeTopicIndex = signal(0);
  activeTopic = signal<TopicHighlight>(this.topicHighlights[0]);

  demoVideos: DemoVideo[] = [
    {
      id: 'api-endpoint',
      title: 'API Endpoint Generator',
      thumbnail: 'demos/api-endpoint.svg',
      description: 'Shows how a Windsurf workflow (instruction set) automates the full generation of a gateway GET API endpoint. Using MCP to connect to Azure DevOps, the AI pulls the user story and test cases, then step-by-step generates the public contract, query, input/output DTOs, controller, integration test cases, and unit tests — all following team standards. Developer only needs to review the output before merging.',
      src: '',
      embedUrl: 'https://nelnet.sharepoint.com/:v:/r/teams/NPIExternalAPI/Shared%20Documents/General/External%20API/Mikko/Recording/API%20Endpoint%20Generator%20Using%20Windsurf.mp4?csf=1&web=1&e=3aYmDK',
      icon: '🚀',
      tag: 'Windsurf',
      tagClass: 'bg-primary/15 text-primary',
      roles: ['Developer', 'Technical Lead'],
    },
    {
      id: 'api-user-stories',
      title: 'Creating API User Stories',
      thumbnail: 'demos/api-user-stories.svg',
      description: 'Before Windsurf, manually creating a set of API user stories took 10–15 minutes with frequent inconsistencies. Now it takes 3–5 minutes. Demo walks through the Windsurf workflow: provide a table of fields, the AI selects the right template (gateway GET, upsert, POST/PUT, etc.), generates the parent user story, then presents each child user story draft — description, acceptance criteria, and technical requirements — for confirmation before auto-creating them in the Azure DevOps backlog via MCP.',
      src: '',
      embedUrl: 'https://nelnet.sharepoint.com/:v:/r/teams/NPIExternalAPI/Shared%20Documents/General/External%20API/Mikko/Recording/CreatingAPI%20User%20Stories%20Efficiently%20with%20Windsurf.mp4?csf=1&web=1&e=dEp2JK',
      icon: '📋',
      tag: 'Windsurf',
      tagClass: 'bg-secondary/15 text-secondary',
      roles: ['BA', 'QA', 'Developer', 'Technical Lead'],
    },
    {
      id: 'user-story-copilot',
      title: 'User Stories with CoPilot',
      thumbnail: 'demos/user-story-copilot.svg',
      description: 'Full walkthrough of automating user story creation using GitHub Copilot with an MCP server connected to Azure DevOps. Covers MCP server setup (az login, installing extensions, configuring mcp.json with the organization), creating markdown instruction files for each story type (gateway GET/POST/PUT, MS GET/PUT), and the end-to-end flow: Copilot reads instructions, creates a parent feature linked to the epic, presents child story drafts one-by-one, and pushes them to the backlog after confirmation.',
      src: '',
      embedUrl: 'https://nelnet.sharepoint.com/:v:/r/teams/NPIExternalAPI/Shared%20Documents/General/External%20API/Mikko/Recording/CreatingUserStoryUsingCoPilot.mp4?csf=1&web=1&e=vCEDH4',
      icon: '🤖',
      tag: 'CoPilot',
      tagClass: 'bg-green-500/15 text-green-500',
      roles: ['BA', 'QA', 'Management'],
    },
    {
      id: 'mermaid-ai',
      title: 'Mermaid Integration with AI',
      thumbnail: 'demos/mermaid-ai.svg',
      description: 'Demonstrates integrating Mermaid.js with Windsurf (Cascade) to quickly visualize complex business logic. Paste existing endpoint business rules into Cascade and ask it to generate a Mermaid workflow diagram. Cascade analyzes the content and produces an HTML file with the diagram — making it much easier to understand intricate business rules and data flow without manually drawing diagrams.',
      src: '',
      embedUrl: 'https://nelnet.sharepoint.com/:v:/r/teams/NPIExternalAPI/Shared%20Documents/General/External%20API/Mikko/Recording/Mermaid%20integration%20with%20AI.mp4?csf=1&web=1&e=TnBhCs',
      icon: '📊',
      tag: 'Diagrams',
      tagClass: 'bg-violet-500/15 text-violet-500',
      roles: ['Developer', 'BA', 'Technical Lead'],
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

  filteredTopics: TopicHighlight[] = [];
  filteredDemos: DemoVideo[] = [];
  pairProgrammingCount = 0;
  presentationCount = 0;

  private presentationCountByRole: Record<Role, number> = {
    'QA': 6, 'BA': 6, 'Developer': 8, 'Technical Lead': 11, 'Management': 4,
  };

  ngOnInit() {
    const content = this.roleContent();
    const role = this.roleService.selectedRole();

    // Filter by role then sort by role-specific order
    this.filteredTopics = this.topicHighlights
      .filter(t => !role || t.roles.includes(role))
      .sort((a, b) => {
        const ai = content.topicOrder.indexOf(a.id);
        const bi = content.topicOrder.indexOf(b.id);
        return (ai === -1 ? 999 : ai) - (bi === -1 ? 999 : bi);
      });

    this.filteredDemos = this.demoVideos
      .filter(d => !role || d.roles.includes(role))
      .sort((a, b) => {
        const ai = content.videoOrder.indexOf(a.id);
        const bi = content.videoOrder.indexOf(b.id);
        return (ai === -1 ? 999 : ai) - (bi === -1 ? 999 : bi);
      });

    this.pairProgrammingCount = 3;
    this.presentationCount = role ? this.presentationCountByRole[role] : 12;

    if (this.filteredTopics.length > 0) {
      this.activeTopic.set(this.filteredTopics[0]);
    }
    if (this.filteredDemos.length > 0) {
      this.activeVideo.set(this.filteredDemos[0]);
    }
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
    const next = (this.activeTopicIndex() + 1) % this.filteredTopics.length;
    this.activeTopicIndex.set(next);
    this.activeTopic.set(this.filteredTopics[next]);
    this.scrollActiveIntoView();
  }

  prevTopic() {
    const prev = (this.activeTopicIndex() - 1 + this.filteredTopics.length) % this.filteredTopics.length;
    this.activeTopicIndex.set(prev);
    this.activeTopic.set(this.filteredTopics[prev]);
    this.scrollActiveIntoView();
  }

  goToTopic(index: number) {
    this.stopCarousel();
    this.activeTopicIndex.set(index);
    this.activeTopic.set(this.filteredTopics[index]);
    this.scrollActiveIntoView();
    this.startCarousel();
  }

}
