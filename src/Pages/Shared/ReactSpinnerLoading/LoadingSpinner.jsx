import React from 'react';
import { FadeLoader } from 'react-spinners';

const LoadingSpinner = () => {
    return (
        <div className='text-center h-screen flex items-center justify-center'>
            <FadeLoader color='#E1AA36'/>
        </div>
    );
};

export default LoadingSpinner;