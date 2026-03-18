import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-privacy-policy',
  imports: [RouterLink],
  templateUrl: './privacypolicy.html',
  styleUrl: './privacypolicy.scss',
})
export class PrivacyPolicy {
  private authService = inject(AuthService);
  isAuthenticated = this.authService.isAuthenticated;
  lastUpdated = 'March 18, 2026';
}
