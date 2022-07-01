import { Route, Routes } from 'react-router-dom';
import {
  SharedLayout,
  Dashboard,
  ListAgent,
  AddAgent,
  ListUser,
  AddUser,
} from '../pages';
import Auth from '../protectedUserRoutes/Auth';
const AdminRoutes = () => {
  return (
    <>
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
    </>
  );
};
export default AdminRoutes;
