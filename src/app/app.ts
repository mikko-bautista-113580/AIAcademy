import { Component, inject, computed } from '@angular/core';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { Navbar } from './components/navbar/navbar';
import { Footer } from './components/footer/footer';
import { filter, map } from 'rxjs/operators';
import { toSignal } from '@angular/core/rxjs-interop';
import { RoleService } from './services/role.service';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Footer],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  title = 'NPI AI Academy';

  private router = inject(Router);
  private roleService = inject(RoleService);
  private authService = inject(AuthService);

  theme = this.roleService.theme;

  private alwaysHiddenRoutes = ['/login', '/select-role'];
  private authConditionalRoutes = ['/privacy-policy', '/terms-of-service'];

  private currentUrl = toSignal(
    this.router.events.pipe(
      filter((e): e is NavigationEnd => e instanceof NavigationEnd),
      map(e => e.urlAfterRedirects)
    ),
    { initialValue: this.router.url }
  );

  showLayout = computed(() => {
    const url = this.currentUrl();
    if (this.alwaysHiddenRoutes.some(r => url.startsWith(r))) return false;
    if (this.authConditionalRoutes.some(r => url.startsWith(r))) return this.authService.isAuthenticated();
    return true;
  });
}
