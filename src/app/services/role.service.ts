import { Injectable, signal } from '@angular/core';

export type Role = 'QA' | 'BA' | 'Developer' | 'Technical Lead' | 'Management';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  private readonly STORAGE_KEY = 'selectedRole';

  selectedRole = signal<Role | null>(this.loadRole());

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
