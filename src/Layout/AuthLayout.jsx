import Lottie from 'lottie-react';
import React from 'react';
import registerLottie from '../assets/lotties/register.json'
import { Link, Outlet } from 'react-router';

const AuthLayout = () => {
    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className='flex-col'>
                    <Lottie style={{ width: '250px' }} animationData={registerLottie} loop={true}></Lottie>
                    <button className='btn bg-teal-600 w-full'><Link to='/'>Go to Home</Link></button></div>
                <div>
                    <Outlet></Outlet>
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;