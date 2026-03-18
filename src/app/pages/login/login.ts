import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-login',
  imports: [RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);

  isLoading = false;
  errorMessage = '';

  async ngOnInit(): Promise<void> {
    // After Microsoft redirect returns, MSAL picks up the auth response
    await this.authService.initialize();
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/select-role']);
    }
  }

  async signIn(): Promise<void> {
    this.isLoading = true;
    this.errorMessage = '';

    try {
      await this.authService.login();
      // loginRedirect will navigate away from the page
    } catch {
      this.errorMessage = 'An unexpected error occurred. Please try again.';
      this.isLoading = false;
    }
  }
}
