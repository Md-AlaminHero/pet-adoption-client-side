import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router';
// import UseAuth from '../../Hook/UseAuth';
import { FaUserCircle, FaTachometerAlt, FaSignOutAlt } from 'react-icons/fa';
// import StudyHubLogo from './StudyHubLogo/StudyHubLogo';
// import UseUserRole from '../../hooks/UseUserRole';
import Swal from 'sweetalert2';
import UseUserRole from '../../../Hook/UseUserRole';
import UseAuth from '../../../Hook/UseAuth';

const Navbar = () => {
  const { user, logOut } = UseAuth();
  const navigate = useNavigate();
 const { role, loading } = UseUserRole(user?.email);


  const navItems = (
    <>
      <li><NavLink to="/pet-listings">Pet Listing</NavLink></li>
      <li><NavLink to="/donation-campaign">Donation Campaigns</NavLink></li>
      <li><NavLink to="/about-us">About Us</NavLink></li>
    </>
  );

  const handleLogOut = () => {
    logOut()
      .then(() => {
        localStorage.removeItem('access-token');
        navigate('/login');
        Swal.fire({
          title: 'Logout Successful!',
          text: 'Welcome back!',
          icon: 'success',
          confirmButtonText: 'Continue',
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false,
        });
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  const handleDashboardClick = () => {
    if (loading) {
      console.log("Role is still loading...");
      return;
    }

    if (role === 'admin') navigate('/dashboard/admin');
    else if (role === 'user') navigate('/dashboard/user');
    else {
      console.warn("No valid role found, navigating to home.");
      navigate('/');
    }
  };

  return (
    <div className="navbar bg-base-100 shadow-sm px-4">
      <div className="navbar-start">
        <Link to="/" className="text-xl">
          <img className='w-12' src="https://i.postimg.cc/DfY7D9gv/pets.png" alt="paw-logo" />
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navItems}</ul>
      </div>

      <div className="navbar-end flex items-center gap-3">
        {user ? (
          <>
            {/* Dashboard Button */}
            <button
              onClick={handleDashboardClick}
              disabled={loading}
              className="btn btn-outline btn-sm flex items-center gap-1"
              title={loading ? "Checking role..." : "Go to Dashboard"}
            >
              <FaTachometerAlt /> {loading ? 'Checking Role...' : 'Dashboard'}
            </button>

            {/* Logout Button */}
            <button
              onClick={handleLogOut}
              className="btn btn-outline btn-sm flex items-center gap-1 text-red-600"
            >
              <FaSignOutAlt /> Logout
            </button>

            {/* User Profile Picture */}
            {user?.photoURL ? (
              <img
                src={user.photoURL}
                alt={user.displayName || 'User'}
                className="w-10 h-10 rounded-full border"
              />
            ) : (
              <FaUserCircle className="text-3xl text-gray-500" />
            )}
          </>
        ) : (
          <>
            <Link to="/login" className="btn btn-outline btn-sm">Login</Link>
            <Link to="/register" className="btn btn-primary btn-sm">Sign Up</Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;