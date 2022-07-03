import { Outlet } from 'react-router-dom';
import { Sidebar, Navbar } from '../../../components';
import { Box, Grid } from '@chakra-ui/react';
import SmallSidebar from '../../../components/sidebar/SmallSidebar';

const SharedLayout = () => {
  return (
    <Grid minH="100vh" gridTemplateColumns={['1fr', '1fr', '1fr', 'auto 1fr']}>
      <SmallSidebar />
      <Sidebar />
      <Grid>
        <Navbar />
        <Box minHeight="90vh" width="100%">
          <Outlet />
        </Box>
      </Grid>
    </Grid>
  );
};
export default SharedLayout;
