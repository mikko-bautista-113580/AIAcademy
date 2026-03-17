import { Component, inject } from '@angular/core';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { Navbar } from './components/navbar/navbar';
import { Footer } from './components/footer/footer';
import { filter, map } from 'rxjs/operators';
import { toSignal } from '@angular/core/rxjs-interop';
import { RoleService } from './services/role.service';

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

  theme = this.roleService.theme;

  showLayout = toSignal(
    this.router.events.pipe(
      filter((e): e is NavigationEnd => e instanceof NavigationEnd),
      map(e => !e.urlAfterRedirects.startsWith('/select-role') && !e.urlAfterRedirects.startsWith('/login'))
    ),
    { initialValue: !this.router.url.startsWith('/select-role') && !this.router.url.startsWith('/login') }
  );
}
