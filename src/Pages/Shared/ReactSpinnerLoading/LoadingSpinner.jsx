import React from 'react';
import { FadeLoader } from 'react-spinners';

const LoadingSpinner = () => {
    return (
        <div className='text-center h-screen flex items-center justify-center'>
            <FadeLoader color='#006A71'/>
        </div>
    );
};

export default LoadingSpinner;