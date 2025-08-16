import { Navigate } from 'react-router';
import UseUserRole from '../Hook/UseUserRole';
import LoadingSpinner from '../Pages/Shared/ReactSpinnerLoading/LoadingSpinner';
// import UseUserRole from '../hooks/UseUserRole';

const UserRoute = ({ children }) => {
  const { role, loading } = UseUserRole();

  if (loading) return <LoadingSpinner></LoadingSpinner>;

  return role === 'user' ? children : <Navigate to="/" />;
};

export default UserRoute;
