import React, { useState, useEffect } from 'react';
import { useMsal, AuthenticatedTemplate, UnauthenticatedTemplate, useAccount } from '@azure/msal-react';
import './App.css';
import { ApolloClient, HttpLink, createHttpLink, ApolloProvider, InMemoryCache, from } from '@apollo/client';
import {setContext } from '@apollo/client/link/context'
import { onError } from '@apollo/client/link/error';
import { ProfileList } from './Components/ProfileList';
import { create } from 'domain';
import { IPublicClientApplication } from '@azure/msal-browser';
import { log } from 'console';
import { NormalizedCacheObject } from '@apollo/client';
import { ProfileComponent } from './Components/ProfileComponent';


const setupApolloClient = (token : string) => {
  const httpLink = createHttpLink({
    //uri: 'https://bitnet2backend.azurewebsites.net/graphql/',
    uri: 'https://localhost:7289/graphql/',
  });

  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      }
    }
  });

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink.concat(httpLink)
  });
}

const acquireAccessToken = async (msalInstance : IPublicClientApplication) => {
  const activeAccount = msalInstance.getActiveAccount(); // This will only return a non-null value if you have logic somewhere else that calls the setActiveAccount API
  const accounts = msalInstance.getAllAccounts();

  if (!activeAccount && accounts.length === 0) {
      /*
      * User is not signed in. Throw error or wait for user to login.
      * Do not attempt to log a user in outside of the context of MsalProvider
      */   
  }
  const request = {
      scopes: ["api://539bd00a-325a-4726-83eb-57e326d7b6d6/access_as_user"],
      account: activeAccount || accounts[0]
  };

  const authResult = await msalInstance.acquireTokenSilent(request);

  return authResult.accessToken
};





function App() {

  const {instance, accounts, inProgress } = useMsal();
  const account = useAccount(accounts[0] || {});
  const [accessToken, setAccessToken] = useState<string>("");

  useEffect(() => {
    if(!account)
    {
      return;
    }
    var retreiveToken = async () => {
      var tokenet = await acquireAccessToken(instance);
      console.log("We have acquired a token:");
      console.log(tokenet);
      setAccessToken(tokenet);
    }
    retreiveToken();
  }, [account, instance])


  return (
    <React.Fragment>
      <p>This is a page that is authenticated.</p>

      <AuthenticatedTemplate>
        <p>A user is signed in, therefore you see this text. Press button to log out.</p>
        <p>Logged in user: {account?.name}</p>
        <p>We received the following access token: {accessToken}</p>
        <button onClick={() => instance.logoutRedirect()}>Logout</button>
        <ApolloProvider client={setupApolloClient(accessToken)}>
          <ProfileComponent/>
        </ApolloProvider>
      </AuthenticatedTemplate>

      <UnauthenticatedTemplate>
      <p>There are no users signed in, therefore you see this text. Press button to log in.</p>
      <button onClick={() => instance.loginRedirect()}>Login</button>
      </UnauthenticatedTemplate>

    </React.Fragment>
  );
}

export default App;
