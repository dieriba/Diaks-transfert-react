import { Outlet } from 'react-router-dom';
import { Sidebar, Navbar } from '../../components';
import { Box, Grid } from '@chakra-ui/react';

const SharedLayout = () => {
  return (
    <Grid minH="100vh" gridTemplateColumns={['1fr', 'auto 1fr']}>
      <Sidebar />
      <Grid>
        <Navbar />
        <Box minHeight="100vh" width="100%">
          <Outlet />
        </Box>
      </Grid>
    </Grid>
  );
};
export default SharedLayout;
