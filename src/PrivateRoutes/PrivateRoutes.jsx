import React from 'react';
// import UseAuth from '../Hook/UseAuth';
import { Navigate, useLocation } from 'react-router'; // fixed from 'react-router'
import UseAuth from '../Hook/UseAuth';

const PrivateRoute = ({ children }) => {
  const { loading, user } = UseAuth();
  const location = useLocation();

  if (loading) {
    return <span className="loading loading-spinner loading-xl"></span>;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;
