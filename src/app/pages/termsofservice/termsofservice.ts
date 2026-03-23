import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-terms-of-service',
  imports: [RouterLink],
  templateUrl: './termsofservice.html',
  styleUrl: './termsofservice.scss',
})
export class TermsOfService {
  private authService = inject(AuthService);
  isAuthenticated = this.authService.isAuthenticated;
  lastUpdated = 'March 20, 2026';
}
