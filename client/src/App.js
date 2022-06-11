import React from 'react';
import { ChakraProvider, Box, Grid, theme } from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Home, Auth, Profil, Trending } from './pages';
function App() {
  return (
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <Box fontSize="xl">
          <Grid minH="100vh" p={3}>
            <ColorModeSwitcher justifySelf="flex-end" />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/profil" element={<Profil />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/trending" element={<Trending />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Grid>
        </Box>
      </ChakraProvider>
    </BrowserRouter>
  );
}

export default App;
