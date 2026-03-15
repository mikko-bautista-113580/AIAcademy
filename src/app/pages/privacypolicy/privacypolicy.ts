import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-privacy-policy',
  imports: [RouterLink],
  templateUrl: './privacypolicy.html',
  styleUrl: './privacypolicy.scss',
})
export class PrivacyPolicy {
  lastUpdated = 'March 15, 2026';
}
