import { Routes } from '@angular/router';
import { Landing } from './pages/landing/landing';
import { PairProgramming } from './pages/pairprogramming/pairprogramming';
import { About } from './pages/about/about';
import { Contributors } from './pages/contributors/contributors';
import { Presentations } from './pages/presentations/presentations';
import { GetStarted } from './pages/getstarted/getstarted';

export const routes: Routes = [
  { path: '', component: Landing },
  { path: 'get-started', component: GetStarted },
  { path: 'pair-programming', component: PairProgramming },
  { path: 'presentations', component: Presentations },
  { path: 'about', component: About },
  { path: 'contributors', component: Contributors },
  { path: '**', redirectTo: '' }
];
