import { ColorModeScript } from '@chakra-ui/react';
import * as ReactDOM from 'react-dom/client';
import { disableReactDevTools } from '@fvilers/disable-react-devtools';
import App from './App';
import {
  TransfertProvider,
  AgentProvider,
  AuthProvider,
  GlobalProvider,
  UserProvider,
  MoneyGiverProvider,
  ConvertProvider,
  MoneyTakerProvider,
} from './context/context-provider';
import dotenv from 'dotenv';
dotenv.config({path : '../.env'});
const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

disableReactDevTools();

root.render(
  <AuthProvider>
    <GlobalProvider>
      <ConvertProvider>
        <ColorModeScript />
        <TransfertProvider>
          <UserProvider>
            <AgentProvider>
              <MoneyTakerProvider>
                <MoneyGiverProvider>
                  <App />
                </MoneyGiverProvider>
              </MoneyTakerProvider>
            </AgentProvider>
          </UserProvider>
        </TransfertProvider>
      </ConvertProvider>
    </GlobalProvider>
  </AuthProvider>
);
