import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

export const authGuard: CanActivateFn = async () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  try {
    await authService.initialize();

    if (authService.isAuthenticated()) {
      return true;
    }
  } catch (error) {
    console.error('Auth guard - initialization error:', error);
  }

  return router.createUrlTree(['/login']);
};
