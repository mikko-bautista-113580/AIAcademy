import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RoleService, Role } from '../../services/role.service';

interface RoleOption {
  role: Role;
  label: string;
  icon: string;
  description: string;
  gradient: string;
}

@Component({
  selector: 'app-role-selection',
  templateUrl: './roleselection.html',
  styleUrl: './roleselection.scss',
})
export class RoleSelection {
  builderName = 'Mikko Bautista';
  builderTitle = 'Software Engineer II';
  vibeCodingUrl = 'https://roadmap.sh/vibe-coding';

  roles: RoleOption[] = [
    {
      role: 'QA',
      label: 'QA',
      icon: '🧪',
      description: 'Quality Assurance & Testing',
      gradient: 'from-emerald-500 to-teal-600',
    },
    {
      role: 'BA',
      label: 'BA',
      icon: '📋',
      description: 'Business Analysis & Requirements',
      gradient: 'from-amber-500 to-orange-600',
    },
    {
      role: 'Developer',
      label: 'Developer',
      icon: '👨‍💻',
      description: 'Software Development & Engineering',
      gradient: 'from-violet-600 to-indigo-600',
    },
    {
      role: 'Technical Lead',
      label: 'Technical Lead',
      icon: '🏗️',
      description: 'Technical Leadership & Architecture',
      gradient: 'from-cyan-500 to-blue-600',
    },
    {
      role: 'Management',
      label: 'Management',
      icon: '📊',
      description: 'Project & Team Management',
      gradient: 'from-rose-500 to-pink-600',
    },
  ];

  constructor(
    private roleService: RoleService,
    private router: Router
  ) {}

  selectRole(role: Role): void {
    this.roleService.selectRole(role);
    this.router.navigate(['/']);
  }
}
