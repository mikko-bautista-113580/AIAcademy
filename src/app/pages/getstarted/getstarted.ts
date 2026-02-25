import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-get-started',
  imports: [RouterLink],
  templateUrl: './getstarted.html',
  styleUrl: './getstarted.scss',
})
export class GetStarted {
  reasons = [
    {
      icon: '🚀',
      title: 'AI is Reshaping Every Industry',
      description: 'From healthcare to finance, AI is transforming how businesses operate. Professionals who understand AI will lead the next wave of innovation.',
      color: 'from-blue-500/20 to-cyan-500/20',
      borderColor: 'border-blue-500/30',
    },
    {
      icon: '💼',
      title: 'Strengthen Your Impact',
      description: 'AI skills help you deliver more value in your current role. Learning AI today makes you a stronger contributor and a more effective team member.',
      color: 'from-purple-500/20 to-pink-500/20',
      borderColor: 'border-purple-500/30',
    },
    {
      icon: '⚡',
      title: 'Boost Your Productivity',
      description: 'AI tools can automate repetitive tasks, generate code, and accelerate workflows—letting you focus on what matters most.',
      color: 'from-amber-500/20 to-orange-500/20',
      borderColor: 'border-amber-500/30',
    },
    {
      icon: '🧠',
      title: 'Think Smarter, Build Faster',
      description: 'Understanding AI models and prompt engineering enables you to solve complex problems with unprecedented speed and creativity.',
      color: 'from-green-500/20 to-emerald-500/20',
      borderColor: 'border-green-500/30',
    },
  ];

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
