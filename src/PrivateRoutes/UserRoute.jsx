import { Navigate } from 'react-router';
import UseUserRole from '../Hook/UseUserRole';
// import UseUserRole from '../hooks/UseUserRole';

const UserRoute = ({ children }) => {
  const { role, loading } = UseUserRole();

  if (loading) return <p>Checking role...</p>;

  return role === 'user' ? children : <Navigate to="/" />;
};

export default UserRoute;
