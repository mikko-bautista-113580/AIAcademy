import { Component, inject, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RoleService, Role } from '../../services/role.service';

interface Reason {
  icon: string;
  title: string;
  description: string;
  color: string;
  borderColor: string;
}

@Component({
  selector: 'app-get-started',
  imports: [RouterLink],
  templateUrl: './getstarted.html',
  styleUrl: './getstarted.scss',
})
export class GetStarted {
  private roleService = inject(RoleService);
  activeRole = this.roleService.selectedRole;

  private reasonsByRole: Record<Role, Reason[]> = {
    'Developer': [
      {
        icon: '🚀',
        title: 'Write Code Faster with AI',
        description: 'AI copilots can generate boilerplate, suggest completions, and scaffold entire features—letting you focus on architecture and logic instead of repetitive coding.',
        color: 'from-blue-500/20 to-cyan-500/20',
        borderColor: 'border-blue-500/30',
      },
      {
        icon: '🔧',
        title: 'Debug and Refactor Smarter',
        description: 'AI tools can identify bugs, suggest fixes, and refactor code for better performance—reducing debugging time and improving code quality.',
        color: 'from-purple-500/20 to-pink-500/20',
        borderColor: 'border-purple-500/30',
      },
      {
        icon: '⚡',
        title: 'Automate Your Workflow',
        description: 'From generating API endpoints to creating pull request descriptions, AI streamlines your daily development tasks so you can ship faster.',
        color: 'from-amber-500/20 to-orange-500/20',
        borderColor: 'border-amber-500/30',
      },
      {
        icon: '🧠',
        title: 'Master Prompt Engineering',
        description: 'Learning how to communicate effectively with AI models unlocks their full potential—turning you into a 10x developer with the right prompts.',
        color: 'from-green-500/20 to-emerald-500/20',
        borderColor: 'border-green-500/30',
      },
    ],
    'QA': [
      {
        icon: '🧪',
        title: 'Generate Test Cases Automatically',
        description: 'AI can convert user stories and requirements into comprehensive test cases—improving coverage and reducing the manual effort of test planning.',
        color: 'from-blue-500/20 to-cyan-500/20',
        borderColor: 'border-blue-500/30',
      },
      {
        icon: '�',
        title: 'Catch Defects Earlier',
        description: 'AI-powered code review and analysis tools help identify potential issues before they reach QA, shifting quality left in the development lifecycle.',
        color: 'from-purple-500/20 to-pink-500/20',
        borderColor: 'border-purple-500/30',
      },
      {
        icon: '⚡',
        title: 'Accelerate Test Automation',
        description: 'AI tools can generate test scripts, create test data, and automate regression suites—freeing you to focus on exploratory and edge-case testing.',
        color: 'from-amber-500/20 to-orange-500/20',
        borderColor: 'border-amber-500/30',
      },
      {
        icon: '📊',
        title: 'Smarter Test Reporting',
        description: 'Leverage AI to analyze test results, identify patterns in failures, and prioritize which areas need the most attention for maximum quality impact.',
        color: 'from-green-500/20 to-emerald-500/20',
        borderColor: 'border-green-500/30',
      },
    ],
    'BA': [
      {
        icon: '📋',
        title: 'Write Better User Stories',
        description: 'AI can help draft user stories with acceptance criteria, edge cases, and technical details—ensuring requirements are clear and complete from the start.',
        color: 'from-blue-500/20 to-cyan-500/20',
        borderColor: 'border-blue-500/30',
      },
      {
        icon: '🔎',
        title: 'Analyze Requirements Faster',
        description: 'AI tools can process large documents, extract key requirements, and identify gaps or conflicts—accelerating your analysis workflow.',
        color: 'from-purple-500/20 to-pink-500/20',
        borderColor: 'border-purple-500/30',
      },
      {
        icon: '📊',
        title: 'Create Visual Artifacts with AI',
        description: 'Generate flowcharts, process diagrams, and wireframes from text descriptions using AI—turning requirements into visual documentation effortlessly.',
        color: 'from-amber-500/20 to-orange-500/20',
        borderColor: 'border-amber-500/30',
      },
      {
        icon: '🤝',
        title: 'Bridge the Gap Between Teams',
        description: 'Understanding AI capabilities helps you translate between technical and business stakeholders, ensuring AI solutions align with real business needs.',
        color: 'from-green-500/20 to-emerald-500/20',
        borderColor: 'border-green-500/30',
      },
    ],
    'Technical Lead': [
      {
        icon: '🏗️',
        title: 'Architect AI-Powered Solutions',
        description: 'Understanding AI models and their capabilities allows you to design systems that leverage AI effectively—from choosing the right model to integrating it into your architecture.',
        color: 'from-blue-500/20 to-cyan-500/20',
        borderColor: 'border-blue-500/30',
      },
      {
        icon: '📈',
        title: 'Multiply Your Team\'s Output',
        description: 'By introducing AI tools into your team\'s workflow, you can dramatically increase velocity—helping your team deliver more with the same resources.',
        color: 'from-purple-500/20 to-pink-500/20',
        borderColor: 'border-purple-500/30',
      },
      {
        icon: '🔄',
        title: 'Automate Code Reviews & CI/CD',
        description: 'AI-powered PR reviewers, automated testing, and intelligent deployment pipelines reduce manual overhead and maintain high code quality standards.',
        color: 'from-amber-500/20 to-orange-500/20',
        borderColor: 'border-amber-500/30',
      },
      {
        icon: '🧠',
        title: 'Make Data-Driven Technical Decisions',
        description: 'Leverage AI to analyze codebase health, estimate effort, and benchmark tools—empowering you to make informed decisions for your team and projects.',
        color: 'from-green-500/20 to-emerald-500/20',
        borderColor: 'border-green-500/30',
      },
    ],
    'Management': [
      {
        icon: '📊',
        title: 'Drive AI Adoption in Your Org',
        description: 'Understanding AI helps you champion the right tools and initiatives, positioning your teams to deliver more value and stay competitive in the market.',
        color: 'from-blue-500/20 to-cyan-500/20',
        borderColor: 'border-blue-500/30',
      },
      {
        icon: '⏱️',
        title: 'Measure and Maximize ROI',
        description: 'AI can reduce development timelines by 30-50%. Knowing how to measure AI-driven productivity gains helps you make the business case for continued investment.',
        color: 'from-purple-500/20 to-pink-500/20',
        borderColor: 'border-purple-500/30',
      },
      {
        icon: '🎯',
        title: 'Strategic Planning with AI Insights',
        description: 'AI tools can analyze project data, forecast timelines, and identify risks—giving you better visibility and control over your portfolio of work.',
        color: 'from-amber-500/20 to-orange-500/20',
        borderColor: 'border-amber-500/30',
      },
      {
        icon: '👥',
        title: 'Build an AI-Ready Team',
        description: 'Equipping your team with AI skills improves retention, morale, and output. Leading the AI transformation makes your organization future-proof.',
        color: 'from-green-500/20 to-emerald-500/20',
        borderColor: 'border-green-500/30',
      },
    ],
  };

  reasons = computed(() => {
    const role = this.activeRole();
    if (role && this.reasonsByRole[role]) {
      return this.reasonsByRole[role];
    }
    return this.reasonsByRole['Developer'];
  });

  offerings = [
    {
      icon: '📊',
      title: 'AI Presentations',
      description: 'Curated slide decks covering AI models, tools, comparisons, and best practices—ready to learn from or share with your team.',
      link: '/presentations',
      linkText: 'Browse Presentations',
      count: '6 Decks',
    },
    {
      icon: '👨‍💻',
      title: 'Pair Programming Sessions',
      description: 'Live coding sessions demonstrating AI-assisted development—from generating APIs to building full-stack apps with AI copilots.',
      link: '/pair-programming',
      linkText: 'Watch Sessions',
      count: '3 Sessions',
    },
    {
      icon: '🎬',
      title: 'AI Demo Videos',
      description: 'Short, focused video demos showing real-world AI tools in action—see exactly how AI accelerates software development.',
      link: '/',
      fragment: 'demo',
      linkText: 'View Demos',
      count: '4 Demos',
    },
  ];
}
