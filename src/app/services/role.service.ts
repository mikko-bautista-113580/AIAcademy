import { Injectable, signal, computed } from '@angular/core';

export type Role = 'QA' | 'BA' | 'Developer' | 'Technical Lead' | 'Management';

export interface RoleTheme {
  primary: string;
  primaryDark: string;
  primaryLight: string;
  secondary: string;
  secondaryDark: string;
}

const defaultTheme: RoleTheme = {
  primary: '#6366f1', primaryDark: '#4f46e5', primaryLight: '#818cf8',
  secondary: '#0ea5e9', secondaryDark: '#0284c7',
};

const roleThemes: Record<Role, RoleTheme> = {
  'QA': { primary: '#10b981', primaryDark: '#059669', primaryLight: '#34d399', secondary: '#14b8a6', secondaryDark: '#0d9488' },
  'BA': { primary: '#f59e0b', primaryDark: '#d97706', primaryLight: '#fbbf24', secondary: '#f97316', secondaryDark: '#ea580c' },
  'Developer': { primary: '#6366f1', primaryDark: '#4f46e5', primaryLight: '#818cf8', secondary: '#0ea5e9', secondaryDark: '#0284c7' },
  'Technical Lead': { primary: '#06b6d4', primaryDark: '#0891b2', primaryLight: '#22d3ee', secondary: '#3b82f6', secondaryDark: '#2563eb' },
  'Management': { primary: '#f43f5e', primaryDark: '#e11d48', primaryLight: '#fb7185', secondary: '#ec4899', secondaryDark: '#db2777' },
};

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  private readonly STORAGE_KEY = 'selectedRole';

  selectedRole = signal<Role | null>(this.loadRole());

  theme = computed<RoleTheme>(() => {
    const role = this.selectedRole();
    return role ? roleThemes[role] : defaultTheme;
  });

  private loadRole(): Role | null {
    const stored = sessionStorage.getItem(this.STORAGE_KEY);
    return stored as Role | null;
  }

  selectRole(role: Role): void {
    sessionStorage.setItem(this.STORAGE_KEY, role);
    this.selectedRole.set(role);
  }

  clearRole(): void {
    sessionStorage.removeItem(this.STORAGE_KEY);
    this.selectedRole.set(null);
  }

  hasRole(): boolean {
    return this.selectedRole() !== null;
  }
}
