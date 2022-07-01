import React from 'react';
import { ChakraProvider, theme } from '@chakra-ui/react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import {
  Login,
  Error,
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
  Unauthorized,
} from './pages';
import { TransfertForm } from './components';
import DetailsTransfert from './components/transferts/DetailsTransfert';
import Auth from './protectedUserRoutes/Auth';
import { AdminRoutes } from './routes';
function App() {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/admin"
            element={
              <Auth role="highAdmin">
                <SharedLayout />
              </Auth>
            }
          >
            <Route path="transferts" element={<Dashboard />} />
            <Route path="agents" element={<ListAgent />} />
            <Route path="add-agent" element={<AddAgent />} />
            <Route path="users" element={<ListUser />} />
            <Route path="add-user" element={<AddUser />} />
          </Route>
          <Route
            path="/med-admin"
            element={
              <Auth role="mediumAdmin">
                <SharedLayout />
              </Auth>
            }
          >
            <Route path="transferts" element={<Dashboard />} />
            <Route path="rate" element={<Rate />} />
            <Route path="add-money-takers" element={<AddMoneyTaker />} />
          </Route>
          <Route
            path="/agent"
            element={
              <Auth role="agent">
                <SharedLayout />
              </Auth>
            }
          >
            <Route path="transferts" element={<Dashboard />} />
          </Route>
          <Route
            path="/moneygiver"
            element={
              <Auth role="moneyGiver">
                <SharedLayout />
              </Auth>
            }
          >
            <Route path="search-transfert" element={<SearchTransfert />} />
            <Route path="all-transferts" element={<Dashboard />} />
          </Route>
          <Route
            path="/shared"
            element={
              <Auth>
                <SharedLayout />
              </Auth>
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
          <Route path="unauthorized" element={<Unauthorized />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
