import React from 'react';
import { ChakraProvider, Box, Grid, theme } from '@chakra-ui/react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';


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
} from './pages';
import { TransfertForm } from './components';
function App() {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/admin" element={<SharedLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="agents" element={<ListAgent />} />
            <Route path="add-agent" element={<AddAgent />} />
            <Route path="users" element={<ListUser />} />
            <Route path="add-user" element={<AddUser />} />
            <Route path="calcul" element={<Calcul />} />
          </Route>
          {/* <Route
                  path="/admin"
                  element={
              
                  }
                >
                  <Route index element={<Stat />} />
                  <Route path="add-job" element={<AddJob />} />
                  <Route path="all-job" element={<AllJobs />} />
                  <Route path="profile" element={<Profile />} />
                </Route> */}
          {/* <Route
                  path="/admin"
                  element={
              
                  }
                >
                  <Route index element={<Stat />} />
                  <Route path="add-job" element={<AddJob />} />
                  <Route path="all-job" element={<AllJobs />} />
                  <Route path="profile" element={<Profile />} />
                </Route> */}
          {/* <Route
                  path="/admin"
                  element={
              
                  }
                >
                  <Route index element={<Stat />} />
                  <Route path="add-job" element={<AddJob />} />
                  <Route path="all-job" element={<AllJobs />} />
                  <Route path="profile" element={<Profile />} />
                </Route> */}
          <Route path="/shared" element={<SharedLayout />}>
            <Route path="add-transfert" element={<TransfertForm />} />
            <Route path="converter" element={<Converter />} />
            <Route path="change-password" element={<ChangePassword />} />
            {/* <Route path="profile" element={<Profile />} /> */}
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
