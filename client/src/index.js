import { ColorModeScript } from '@chakra-ui/react';
import React, { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App';
import { ContextProvider } from './context/context-provider/globalContext';
import { TransfertProvider } from './context/context-provider';
import { UserProvider } from './context/context-provider/userContext';
import { AgentProvider } from './context/context-provider/agentContext';
import { MoneyTakerProvider } from './context/context-provider/moneyTakerContext';
import { AuthContextProvider } from './context/context-provider/authContext';
const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
  <AuthContextProvider>
    <ContextProvider>
      <ColorModeScript />
      <TransfertProvider>
        <UserProvider>
          <AgentProvider>
            <MoneyTakerProvider>
              <App />
            </MoneyTakerProvider>
          </AgentProvider>
        </UserProvider>
      </TransfertProvider>
    </ContextProvider>
  </AuthContextProvider>
);
