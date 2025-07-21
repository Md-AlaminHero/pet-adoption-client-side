import React from 'react';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import UseAxiosSecure from './UseAxiosSecure';
import { auth } from '../Firebase/firebse.init';



const UseUserRole = () => {
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const axiosSecure = UseAxiosSecure();
  const [user] = useAuthState(auth);

  useEffect(() => {
    if (user?.email) {
      axiosSecure.get(`/users/${user.email}`)
        .then(res => {
          const userRole = res.data?.role;
          setRole(userRole || 'unknown');
          setLoading(false);
        })
        .catch(() => {
          setRole('unknown'); // fallback so it never stays null
          setLoading(false);
        });
    } else {
      setRole('unknown'); // no user = fallback role
      setLoading(false);
    }
  }, [user]);

  return { role, loading }; // ✅ Always return an object
};


 export default UseUserRole;