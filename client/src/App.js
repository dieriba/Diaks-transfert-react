import React from 'react';
import { ChakraProvider, Box, Grid, theme } from '@chakra-ui/react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import {
  ProtectAdminRoutes,
  ProtectedMoneyGiverRoutes,
  ProtectAgentRoutes,
  ProtectMediumAdminRoutes,
} from './context/protectedUserRoutes';
import {
  Login,
  Error,
  Calcul,
  Converter,
  AddAgent,
  AddUser,
  ListAgent,
  ListUser,
  ChangePassword,
  Dashboard,
  SharedLayout,
  AddMoneyTaker,
  ListMoneyTakers,
  Rate,
  SearchTransfert,
  AllTransfert,
} from './pages';
import { TransfertForm } from './components';
import DetailsTransfert from './components/DetailsTransfert';
function App() {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/admin"
            element={
              <ProtectAdminRoutes>
                <SharedLayout />
              </ProtectAdminRoutes>
            }
          >
            <Route path="transferts" element={<Dashboard />} />
            <Route path="agents" element={<ListAgent />} />
            <Route path="add-agent" element={<AddAgent />} />
            <Route path="users" element={<ListUser />} />
            <Route path="add-user" element={<AddUser />} />
            <Route path="calcul" element={<Calcul />} />
          </Route>
          <Route
            path="/med-admin"
            element={
              <ProtectAdminRoutes>
                <SharedLayout />
              </ProtectAdminRoutes>
            }
          >
            <Route path="transferts" element={<Dashboard />} />
            <Route path="rate" element={<Rate />} />
            <Route path="add-money-takers" element={<AddMoneyTaker />} />
          </Route>
          <Route
            path="/agent"
            element={
              <ProtectAdminRoutes>
                <SharedLayout />
              </ProtectAdminRoutes>
            }
          >
            <Route path="transferts" element={<Dashboard />} />
          </Route>
          <Route
            path="/moneygiver"
            element={
              <ProtectAdminRoutes>
                <SharedLayout />
              </ProtectAdminRoutes>
            }
          >
            <Route path="search-transfert" element={<SearchTransfert />} />
            <Route path="all-transferts" element={<AllTransfert />} />
          </Route>
          <Route
            path="/shared"
            element={
              <ProtectAdminRoutes>
                <SharedLayout />
              </ProtectAdminRoutes>
            }
          >
            <Route path="list-money-takers" element={<ListMoneyTakers />} />
            <Route path="add-transfert" element={<TransfertForm />} />
            <Route path="details" element={<DetailsTransfert />} />
            <Route path="converter" element={<Converter />} />
            <Route path="change-password" element={<ChangePassword />} />
          </Route>
          <Route path="/" element={<Navigate to="/user/login" replace />} />
          <Route path="/user/login" element={<Login />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
