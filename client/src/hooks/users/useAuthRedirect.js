import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthContext } from '../../context/context-provider/authContext';

const useAuthRedirect = () => {
  const navigate = useNavigate();
  const { userRole, user, logoutUser } = useAuthContext();

  useEffect(() => {
    if (user && (userRole === 'highAdmin' || userRole === 'admin'))
      return navigate('/admin/transferts', { replace: true });
    if (user && userRole === 'mediumAdmin')
      return navigate('/med-admin/transferts', { replace: true });
    if (user && userRole === 'agent')
      return navigate('/agent/transferts', { replace: true });
    if (user && userRole === 'moneyGiver')
      return navigate('/moneygiver/search-transfert', {
        replace: true,
      });

    logoutUser();
  }, [user, navigate]);
};
export default useAuthRedirect;
