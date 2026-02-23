import { Component, signal } from '@angular/core';

interface Recording {
  id: string;
  title: string;
  presenter: string;
  date: string;
  filename: string;
  description: string;
  gradient: string;
  icon: string;
}

@Component({
  selector: 'app-pairprogramming',
  imports: [],
  templateUrl: './pairprogramming.html',
  styleUrl: './pairprogramming.scss',
})
export class PairProgramming {
  recordings: Recording[] = [
    {
      id: 'mark-echon',
      title: 'AI SDLC - Pair Programming',
      presenter: 'Mark Echon',
      date: 'November 12, 2025',
      filename: '11.12.25 - AI SDLC - Pair Programming - (Mark Echon).mp4',
      description: 'Live pair programming session demonstrating AI-assisted software development lifecycle practices and real-time coding collaboration.',
      gradient: 'from-primary to-primary-dark',
      icon: '👨‍💻'
    },
    {
      id: 'armando-lopez',
      title: 'AI SDLC - Pair Programming',
      presenter: 'Armando Lopez Jr.',
      date: 'November 11, 2025',
      filename: '11.11.25 - AI SDLC - Pair Programming - (Armando Lopez Jr.).mp4',
      description: 'Hands-on pair programming session showcasing AI-driven development workflows, code generation, and collaborative problem solving.',
      gradient: 'from-violet-500 to-violet-700',
      icon: '🤝'
    },
    {
      id: 'alberto-terol',
      title: 'AI SDLC - Pair Programming',
      presenter: 'Alberto Terol',
      date: 'November 10, 2025',
      filename: '11.10.25 - AI SDLC - Pair Programming  - (Alberto Terol).mp4',
      description: 'Interactive pair programming session exploring AI-powered coding tools, best practices, and efficient development techniques.',
      gradient: 'from-emerald-500 to-emerald-700',
      icon: '💻'
    }
  ];

  activeRecording = signal<Recording | null>(null);

  playRecording(rec: Recording) {
    this.activeRecording.set(rec);
  }

  closePlayer() {
    this.activeRecording.set(null);
  }
}
