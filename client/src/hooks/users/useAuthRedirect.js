import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthContext } from '../../context/context-provider/authContext';

const useAuthRedirect = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname;
  const { userRole, user, logoutUser } = useAuthContext();

  useEffect(() => {
    if (user && userRole === 'highAdmin')
      return navigate(from || '/admin/transferts', { replace: true });
    if (user && userRole === 'mediumAdmin')
      return navigate(from || '/med-admin/transferts', { replace: true });
    if (user && userRole === 'agent')
      return navigate(from || '/agent/transferts', { replace: true });
    if (user && userRole === 'moneyGiver')
      return navigate(from || '/moneygiver/search-transfert', {
        replace: true,
      });

    logoutUser();
  }, [user, navigate]);
};
export default useAuthRedirect;
