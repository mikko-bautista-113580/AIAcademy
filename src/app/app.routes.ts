import { Routes } from '@angular/router';
import { Landing } from './pages/landing/landing';
import { PairProgramming } from './pages/pairprogramming/pairprogramming';
import { About } from './pages/about/about';
import { Contributors } from './pages/contributors/contributors';
import { AIChampions } from './pages/aichampions/aichampions';
import { Presentations } from './pages/presentations/presentations';
import { GetStarted } from './pages/getstarted/getstarted';
import { RoleSelection } from './pages/roleselection/roleselection';
import { roleGuard } from './guards/role.guard';

export const routes: Routes = [
  { path: 'select-role', component: RoleSelection },
  { path: '', component: Landing, canActivate: [roleGuard] },
  { path: 'get-started', component: GetStarted, canActivate: [roleGuard] },
  { path: 'pair-programming', component: PairProgramming, canActivate: [roleGuard] },
  { path: 'presentations', component: Presentations, canActivate: [roleGuard] },
  { path: 'about', component: About, canActivate: [roleGuard] },
  { path: 'contributors', component: Contributors, canActivate: [roleGuard] },
  { path: 'ai-champions', component: AIChampions, canActivate: [roleGuard] },
  { path: '**', redirectTo: '' }
];
