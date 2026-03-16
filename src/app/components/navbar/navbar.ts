import { Component, signal, HostListener, inject, ElementRef } from '@angular/core';
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
  isExploreMenuOpen = signal(false);
  isMoreMenuOpen = signal(false);
  isLegalMenuOpen = signal(false);

  roleService = inject(RoleService);
  private el = inject(ElementRef);
  private router = inject(Router);

  changeRole(): void {
    this.roleService.clearRole();
    this.closeMobileMenu();
    this.router.navigate(['/select-role']);
  }

  @HostListener('window:scroll')
  onScroll() {
    this.isScrolled.set(window.scrollY > 20);
    this.closeAllDropdowns();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    if (!this.el.nativeElement.contains(event.target)) {
      this.closeAllDropdowns();
    }
  }

  closeAllDropdowns() {
    this.isExploreMenuOpen.set(false);
    this.isMoreMenuOpen.set(false);
    this.isLegalMenuOpen.set(false);
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen.update(v => !v);
  }

  closeMobileMenu() {
    this.isMobileMenuOpen.set(false);
    this.closeAllDropdowns();
  }

  toggleExploreMenu() {
    this.isExploreMenuOpen.update(v => !v);
    this.isMoreMenuOpen.set(false);
    this.isLegalMenuOpen.set(false);
  }

  closeExploreMenu() {
    this.isExploreMenuOpen.set(false);
  }

  toggleMoreMenu() {
    this.isMoreMenuOpen.update(v => !v);
    this.isExploreMenuOpen.set(false);
    this.isLegalMenuOpen.set(false);
  }

  closeMoreMenu() {
    this.isMoreMenuOpen.set(false);
  }

  toggleLegalMenu() {
    this.isLegalMenuOpen.update(v => !v);
    this.isExploreMenuOpen.set(false);
    this.isMoreMenuOpen.set(false);
  }

  closeLegalMenu() {
    this.isLegalMenuOpen.set(false);
  }
}
