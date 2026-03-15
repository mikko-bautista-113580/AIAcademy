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
  thumbnail?: string;
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
      thumbnail: 'demos/pp-mark-echon.svg',
      date: 'November 12, 2025',
      filename: '',
      embedUrl: 'https://nelnet.sharepoint.com/:v:/r/teams/NPIExternalAPI/Shared%20Documents/General/External%20API/Mikko/Recording/11.12.25%20-%20AI%20SDLC%20-%20Pair%20Programming%20-%20(Mark%20Echon).mp4?csf=1&web=1&e=ymbYbx',
      description: 'Explores using Windsurf workflows to automate API and user story creation from standardized templates. Covers setting up MCP for Azure DevOps integration, creating service architecture documentation, generating research and implementation plans step-by-step, and using dual IDEs (Visual Studio for building, Windsurf for AI workflows) on legacy .NET Framework enterprise projects.',
      gradient: 'from-primary to-primary-dark',
      icon: '👨‍💻',
      roles: ['QA', 'BA', 'Developer', 'Technical Lead', 'Management'],
    },
    {
      id: 'armando-lopez',
      title: 'AI SDLC - Pair Programming',
      presenter: 'Armando Lopez Jr.',
      thumbnail: 'demos/pp-armando-lopez.svg',
      date: 'November 11, 2025',
      filename: '',
      embedUrl: 'https://nelnet.sharepoint.com/:v:/r/teams/NPIExternalAPI/Shared%20Documents/General/External%20API/Mikko/Recording/11.11.25%20-%20AI%20SDLC%20-%20Pair%20Programming%20-%20(Armando%20Lopez%20Jr.).mp4?csf=1&web=1&e=ymbYbx',
      description: 'Demonstrates using Windsurf AI workflows for bug investigation on a .NET API project. Walks through creating service overview documentation, research documents, and implementation plans — reviewing each step before proceeding. Discusses separating workflows from rules for better AI comprehension, using different models (Gemini 2.5 Pro for documentation, SWE-4.5 for coding, thinking model for workflow creation), and troubleshooting MCP connection issues.',
      gradient: 'from-violet-500 to-violet-700',
      icon: '🤝',
      roles: ['QA', 'BA', 'Developer', 'Technical Lead', 'Management'],
    },
    {
      id: 'alberto-terol',
      title: 'AI SDLC - Pair Programming',
      presenter: 'Alberto Terol',
      thumbnail: 'demos/pp-alberto-terol.svg',
      date: 'November 10, 2025',
      filename: '',
      embedUrl: 'https://nelnet.sharepoint.com/:v:/r/teams/NPIExternalAPI/Shared%20Documents/General/External%20API/Mikko/Recording/11.10.25%20-%20AI%20SDLC%20-%20Pair%20Programming%20%20-%20(Alberto%20Terol).mp4?csf=1&web=1&e=6b7buN',
      description: 'Walks through the Business Analyst workflow — from receiving product owner requirements in epics, reviewing Figma designs, to manually creating features and user stories (API and UI) in Azure DevOps. Explores using Windsurf AI to automate the analysis of requirements versus designs and auto-generate features and user stories directly into the backlog, reducing manual documentation effort.',
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
