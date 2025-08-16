import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router';
import { FaUserCircle, FaTachometerAlt, FaSignOutAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';
import UseUserRole from '../../../Hook/UseUserRole';
import UseAuth from '../../../Hook/UseAuth';
import ToggleTheme from '../ToggleTheme/ToggleTheme';

const Navbar = () => {
  const { user, logOut } = UseAuth();
  const navigate = useNavigate();
  const { role, loading } = UseUserRole(user?.email);


  const navItems = (
    <>


      {
        user ? <>
          <li><NavLink to='/'>Home</NavLink></li>
          <li><NavLink to="/pet-listings">Pet Listing</NavLink></li>
          <li><NavLink to="/donation-campaigns">Donation Campaigns</NavLink></li>
          <li><NavLink to="/about-us">About Us</NavLink></li>
          <li><NavLink to='/contact-us'>Contact</NavLink></li>

        </> : <>
          <li><NavLink to='/'>Home</NavLink></li>
          <li><NavLink to='/about-us'>About Us</NavLink></li>
          <li><NavLink to='/contact-us'>Contact</NavLink></li>
        </>
      }
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
    <div className="navbar bg-base-100 shadow-sm px-4 sticky top-0 left-0 w-full z-50">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
            <li>{navItems}</li>
          </ul>
        </div>
        <Link to="/" className="text-xl">
          <img className='w-12' src="https://i.postimg.cc/DfY7D9gv/pets.png" alt="paw-logo" />
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navItems}</ul>
      </div>

      <div className="navbar-end flex items-center gap-3">
        {
          user ?
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full" data-tip="hello">
                  {user?.photoURL ?
                    <img
                      title='User Name'
                      alt="Tailwind CSS Navbar component"
                      src={`${user && user.photoURL}`} />
                    :
                    <FaUserCircle className="text-3xl text-gray-500" />
                  }

                  {
                    user ?
                      <Link to='/signin' onClick={handleLogOut} className="btn btn-primary px-10 ">Log Out</Link> :
                      <Link to='/signin' className="btn btn-primary px-10 ">Login</Link>
                  }
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow space-y-2">
                <ToggleTheme></ToggleTheme>
                <li><button
                  onClick={handleDashboardClick}
                  disabled={loading}
                  className="btn btn-outline btn-sm flex items-center gap-1"
                  title={loading ? "Checking role..." : "Go to Dashboard"}
                >
                  <FaTachometerAlt /> {loading ? 'Checking Role...' : 'Dashboard'}
                </button>
                </li>
                <li>
                  <button
                    onClick={handleLogOut}
                    className="btn btn-outline btn-sm flex items-center gap-1 text-red-600"
                  >
                    <FaSignOutAlt /> Logout
                  </button>
                </li>
              </ul>
            </div>
            :
            <>
              {/* <Link to="/login" className="btn btn-outline btn-sm">Login</Link> */}
              <ToggleTheme></ToggleTheme>
              <Link to="/register" className="btn btn-primary btn-sm">Sign Up</Link>
            </>
        }
      </div>
    </div>
  );
};

export default Navbar;