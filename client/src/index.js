import { ColorModeScript } from '@chakra-ui/react';
import React, { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App';
import { ContextProvider } from './context/contextProvider';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
  <ContextProvider>
    <ColorModeScript />
    <App />
  </ContextProvider>
);
