import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class VisitorService {
  visitorCount = signal<number>(0);
  private tracked = false;

  async trackVisit(): Promise<void> {
    if (this.tracked) return;

    const alreadyCounted = sessionStorage.getItem('visitor_counted');

    if (alreadyCounted) {
      // Already counted this session — just fetch the current count
      await this.fetchCount();
    } else {
      // New session — increment and fetch
      await this.incrementCount();
      sessionStorage.setItem('visitor_counted', 'true');
    }

    this.tracked = true;
  }

  private async fetchCount(): Promise<void> {
    try {
      const res = await fetch('/api/visitor-count');
      const data = await res.json();
      this.visitorCount.set(data.count ?? 0);
    } catch {
      console.warn('Failed to fetch visitor count');
    }
  }

  private async incrementCount(): Promise<void> {
    try {
      const res = await fetch('/api/visitor-count', { method: 'POST' });
      const data = await res.json();
      this.visitorCount.set(data.count ?? 0);
    } catch {
      console.warn('Failed to increment visitor count');
    }
  }
}
