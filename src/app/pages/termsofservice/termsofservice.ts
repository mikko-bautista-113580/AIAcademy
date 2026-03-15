import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-terms-of-service',
  imports: [RouterLink],
  templateUrl: './termsofservice.html',
  styleUrl: './termsofservice.scss',
})
export class TermsOfService {
  lastUpdated = 'March 15, 2026';
}
