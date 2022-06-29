import { useGlobalContext } from '../../context/contextProvider';
import { useEffect } from 'react';
const AllTransferts = () => {
  const { searchAllValidateTransferts } = useGlobalContext();
  useEffect(() => {
    searchAllValidateTransferts();
  }, []);
  return <div>AllTransferts</div>;
};
export default AllTransferts;
