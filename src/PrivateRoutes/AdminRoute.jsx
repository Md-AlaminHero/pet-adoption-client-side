import { Navigate } from 'react-router';
import UseUserRole from '../Hook/UseUserRole';
// import UseUserRole from '../Hook/UseUserRole';
// import UseUserRole from '../hooks/UseUserRole';

const AdminRoute = ({ children }) => {
  const { role, loading } = UseUserRole();
    console.log("From AdminRoute: ", { role, loading });

  if (loading) return <p>Checking role...</p>;

  return role === 'admin' ? children : <Navigate to="/" />;
  
};


export default AdminRoute;
