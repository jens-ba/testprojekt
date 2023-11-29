import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { MsalProvider } from '@azure/msal-react';
import { Configuration,  PublicClientApplication } from '@azure/msal-browser';

import App from './App';

const msalConfiguration: Configuration = {
  auth: {
    clientId: "539bd00a-325a-4726-83eb-57e326d7b6d6",
    authority: 'https://login.microsoftonline.com/organizations/',
    redirectUri: "http://localhost:3000",
  }
};

const pca = new PublicClientApplication(msalConfiguration);
pca.initialize();
const AppProvider = () => (
  <MsalProvider instance={pca}>
    <App />
  </MsalProvider>
)

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(<AppProvider />);
