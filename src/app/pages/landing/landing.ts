import { Component, signal, ViewChild, ElementRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';

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
export class Landing {
  @ViewChild('videoPlayer') videoPlayer!: ElementRef<HTMLVideoElement>;

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

}
