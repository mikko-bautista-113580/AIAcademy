import { Injectable, inject, NgZone, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { RoleService } from './role.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class IdleService implements OnDestroy {
  private authService = inject(AuthService);
  private roleService = inject(RoleService);
  private router = inject(Router);
  private ngZone = inject(NgZone);

  private idleTimeoutMs = 3 * 60 * 1000; // 3 minutes
  private timeoutId: ReturnType<typeof setTimeout> | null = null;
  private running = false;

  private readonly activityEvents = [
    'mousemove',
    'mousedown',
    'keydown',
    'scroll',
    'touchstart',
    'pointerdown',
  ];

  private boundOnActivity = this.onActivity.bind(this);

  start(): void {
    if (this.running) return;
    this.running = true;

    // Run outside Angular zone so activity listeners don't trigger change detection
    this.ngZone.runOutsideAngular(() => {
      for (const event of this.activityEvents) {
        window.addEventListener(event, this.boundOnActivity, { passive: true });
      }
      this.resetTimer();
    });
  }

  stop(): void {
    this.running = false;
    this.clearTimer();
    for (const event of this.activityEvents) {
      window.removeEventListener(event, this.boundOnActivity);
    }
  }

  ngOnDestroy(): void {
    this.stop();
  }

  private onActivity(): void {
    this.resetTimer();
  }

  private resetTimer(): void {
    this.clearTimer();
    this.timeoutId = setTimeout(() => {
      this.ngZone.run(() => this.onIdle());
    }, this.idleTimeoutMs);
  }

  private clearTimer(): void {
    if (this.timeoutId !== null) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
  }

  private async onIdle(): Promise<void> {
    this.stop();
    if (this.authService.isAuthenticated()) {
      this.roleService.clearRole();
      await this.authService.logout();
    }
  }
}
