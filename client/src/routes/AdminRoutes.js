import { Route } from 'react-router-dom';
import {
  SharedLayout,
  Dashboard,
  ListAgent,
  AddAgent,
  ListUser,
  AddUser,
  Calcul,
} from '../pages';

const AdminRoutes = () => {
  return (
    <>
      <Route path="/admin" element={<SharedLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="agents" element={<ListAgent />} />
        <Route path="add-agent" element={<AddAgent />} />
        <Route path="users" element={<ListUser />} />
        <Route path="add-user" element={<AddUser />} />
        <Route path="calcul" element={<Calcul />} />
      </Route>
    </>
  );
};
export default AdminRoutes;
