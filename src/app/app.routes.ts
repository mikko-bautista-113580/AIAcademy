import { Routes } from '@angular/router';
import { Landing } from './pages/landing/landing';
import { PairProgramming } from './pages/pairprogramming/pairprogramming';
import { About } from './pages/about/about';
import { Contributors } from './pages/contributors/contributors';
import { AIChampions } from './pages/aichampions/aichampions';
import { Presentations } from './pages/presentations/presentations';
import { GetStarted } from './pages/getstarted/getstarted';
import { RoleSelection } from './pages/roleselection/roleselection';
import { PrivacyPolicy } from './pages/privacypolicy/privacypolicy';
import { TermsOfService } from './pages/termsofservice/termsofservice';
import { Articles } from './pages/articles/articles';
import { Login } from './pages/login/login';
import { roleGuard } from './guards/role.guard';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'select-role', component: RoleSelection, canActivate: [authGuard] },
  { path: '', component: Landing, canActivate: [authGuard, roleGuard] },
  { path: 'get-started', component: GetStarted, canActivate: [authGuard, roleGuard] },
  { path: 'pair-programming', component: PairProgramming, canActivate: [authGuard, roleGuard] },
  { path: 'presentations', component: Presentations, canActivate: [authGuard, roleGuard] },
  { path: 'about', component: About, canActivate: [authGuard, roleGuard] },
  { path: 'contributors', component: Contributors, canActivate: [authGuard, roleGuard] },
  { path: 'ai-champions', component: AIChampions, canActivate: [authGuard, roleGuard] },
  { path: 'articles', component: Articles, canActivate: [authGuard, roleGuard] },
  { path: 'privacy-policy', component: PrivacyPolicy },
  { path: 'terms-of-service', component: TermsOfService },
  { path: '**', redirectTo: '' }
];
