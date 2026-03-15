import { Component, signal, computed, inject } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { RoleService, Role } from '../../services/role.service';

interface Recording {
  id: string;
  title: string;
  presenter: string;
  date: string;
  filename: string;
  embedUrl?: string;
  description: string;
  gradient: string;
  icon: string;
  roles: Role[];
}

@Component({
  selector: 'app-pairprogramming',
  imports: [],
  templateUrl: './pairprogramming.html',
  styleUrl: './pairprogramming.scss',
})
export class PairProgramming {
  private sanitizer = inject(DomSanitizer);
  private roleService = inject(RoleService);

  sanitizeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  recordings: Recording[] = [
    {
      id: 'mark-echon',
      title: 'AI SDLC - Pair Programming',
      presenter: 'Mark Echon',
      date: 'November 12, 2025',
      filename: '',
      embedUrl: 'https://nelnet.sharepoint.com/:v:/r/teams/NPIExternalAPI/Shared%20Documents/General/External%20API/Mikko/Recording/11.12.25%20-%20AI%20SDLC%20-%20Pair%20Programming%20-%20(Mark%20Echon).mp4?csf=1&web=1&e=ymbYbx',
      description: 'Live pair programming session demonstrating AI-assisted software development lifecycle practices and real-time coding collaboration.',
      gradient: 'from-primary to-primary-dark',
      icon: '👨‍💻',
      roles: ['QA', 'BA', 'Developer', 'Technical Lead', 'Management'],
    },
    {
      id: 'armando-lopez',
      title: 'AI SDLC - Pair Programming',
      presenter: 'Armando Lopez Jr.',
      date: 'November 11, 2025',
      filename: '',
      embedUrl: 'https://nelnet.sharepoint.com/:v:/r/teams/NPIExternalAPI/Shared%20Documents/General/External%20API/Mikko/Recording/11.11.25%20-%20AI%20SDLC%20-%20Pair%20Programming%20-%20(Armando%20Lopez%20Jr.).mp4?csf=1&web=1&e=ymbYbx',
      description: 'Hands-on pair programming session showcasing AI-driven development workflows, code generation, and collaborative problem solving.',
      gradient: 'from-violet-500 to-violet-700',
      icon: '🤝',
      roles: ['QA', 'BA', 'Developer', 'Technical Lead', 'Management'],
    },
    {
      id: 'alberto-terol',
      title: 'AI SDLC - Pair Programming',
      presenter: 'Alberto Terol',
      date: 'November 10, 2025',
      filename: '',
      embedUrl: 'https://nelnet.sharepoint.com/:v:/r/teams/NPIExternalAPI/Shared%20Documents/General/External%20API/Mikko/Recording/11.10.25%20-%20AI%20SDLC%20-%20Pair%20Programming%20%20-%20(Alberto%20Terol).mp4?csf=1&web=1&e=6b7buN',
      description: 'Interactive pair programming session exploring AI-powered coding tools, best practices, and efficient development techniques.',
      gradient: 'from-emerald-500 to-emerald-700',
      icon: '💻',
      roles: ['QA', 'BA', 'Developer', 'Technical Lead', 'Management'],
    }
  ];

  filteredRecordings = computed(() => {
    const role = this.roleService.selectedRole();
    if (!role) return this.recordings;
    return this.recordings.filter(r => r.roles.includes(role));
  });

  activeRecording = signal<Recording | null>(null);

  playRecording(rec: Recording) {
    this.activeRecording.set(rec);
  }

  closePlayer() {
    this.activeRecording.set(null);
  }
}
