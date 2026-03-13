import { Component, signal, HostListener, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { RoleService } from '../../services/role.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  isScrolled = signal(false);
  isMobileMenuOpen = signal(false);

  roleService = inject(RoleService);
  private router = inject(Router);

  changeRole(): void {
    this.roleService.clearRole();
    this.closeMobileMenu();
    this.router.navigate(['/select-role']);
  }

  @HostListener('window:scroll')
  onScroll() {
    this.isScrolled.set(window.scrollY > 20);
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen.update(v => !v);
  }

  closeMobileMenu() {
    this.isMobileMenuOpen.set(false);
  }
}
