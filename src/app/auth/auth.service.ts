import { Injectable, signal, computed } from '@angular/core';
import { PublicClientApplication, AccountInfo, InteractionRequiredAuthError } from '@azure/msal-browser';
import { msalConfig, loginRequest } from './auth.config';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private msalInstance = new PublicClientApplication(msalConfig);
  private initialized = false;

  account = signal<AccountInfo | null>(null);
  isAuthenticated = computed(() => this.account() !== null);
  userName = computed(() => this.account()?.name ?? '');
  userEmail = computed(() => this.account()?.username ?? '');

  async initialize(): Promise<void> {
    if (this.initialized) return;

    try {
      await this.msalInstance.initialize();

      // Handle redirect response
      const response = await this.msalInstance.handleRedirectPromise();
      if (response?.account) {
        this.msalInstance.setActiveAccount(response.account);
        this.account.set(response.account);
      } else {
        const accounts = this.msalInstance.getAllAccounts();
        if (accounts.length > 0) {
          this.msalInstance.setActiveAccount(accounts[0]);
          this.account.set(accounts[0]);
        }
      }
    } catch (error) {
      console.error('MSAL initialization error:', error);
    }

    this.initialized = true;
  }

  async login(): Promise<void> {
    try {
      await this.initialize();
      await this.msalInstance.loginRedirect(loginRequest);
    } catch (error) {
      console.error('Login failed:', error);
    }
  }

  async logout(): Promise<void> {
    await this.initialize();
    this.account.set(null);
    await this.msalInstance.logoutRedirect({
      postLogoutRedirectUri: window.location.origin + '/login',
    });
  }

  async getToken(): Promise<string | null> {
    try {
      await this.initialize();
      const account = this.msalInstance.getActiveAccount();
      if (!account) return null;

      const response = await this.msalInstance.acquireTokenSilent({
        ...loginRequest,
        account,
      });
      return response.accessToken;
    } catch (error) {
      if (error instanceof InteractionRequiredAuthError) {
        try {
          const response = await this.msalInstance.acquireTokenPopup(loginRequest);
          return response.accessToken;
        } catch {
          return null;
        }
      }
      return null;
    }
  }
}
