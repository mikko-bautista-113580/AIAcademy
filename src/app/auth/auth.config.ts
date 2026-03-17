import { Configuration, LogLevel } from '@azure/msal-browser';

// ============================================================
// AZURE AD CONFIGURATION
// ============================================================
// To set up authentication:
// 1. Go to Azure Portal → Microsoft Entra ID → App Registrations
// 2. Click "New registration"
// 3. Name: "NPI AI Academy"
// 4. Supported account types: "Accounts in this organizational directory only"
// 5. Redirect URI: Select "Single-page application (SPA)" and enter your app URL
//    - Local: http://localhost:4200
//    - Production: https://your-netlify-url.netlify.app
// 6. Copy the "Application (client) ID" → paste below as CLIENT_ID
// 7. Copy the "Directory (tenant) ID" → paste below as TENANT_ID
// ============================================================

const TENANT_ID = '3eb3202c-0f79-442a-b5c2-c534769f11e3';
const CLIENT_ID = '8470f1a8-77be-4dce-82b2-0f112902bbd9';

export const msalConfig: Configuration = {
  auth: {
    clientId: CLIENT_ID,
    authority: `https://login.microsoftonline.com/${TENANT_ID}`,
    redirectUri: window.location.origin + '/login',
    postLogoutRedirectUri: window.location.origin,
  },
  cache: {
    cacheLocation: 'localStorage',
  },
  system: {
    loggerOptions: {
      logLevel: LogLevel.Warning,
      piiLoggingEnabled: false,
    },
  },
};

export const loginRequest = {
  scopes: ['User.Read'],
};
