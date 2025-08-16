// import axios from 'axios';
// import React from 'react';
// const UseAxiosSecure = () => {
//   const axiosSecure = axios.create({
//     // baseURL: 'https://twelveth-assignment-server.vercel.app',
//     baseURL: 'http://localhost:3000',
//   });

//   axiosSecure.interceptors.request.use((config) => {
//     const token = localStorage.getItem('access-token');
//     // console.log(localStorage.getItem("access-token"))

//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   });

//   return axiosSecure;
// };

// export default UseAxiosSecure;

// hooks/useAxiosSecure.js

import React from 'react';
import axios from 'axios';

const UseAxiosSecure = () => {
    const axiosSecure = axios.create({
        baseURL: 'https://pet-adoption-server-side-three.vercel.app/',
    });

    axiosSecure.interceptors.request.use((config) => {
        const token = localStorage.getItem('access-token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    });

    return axiosSecure;
};

export default UseAxiosSecure;
