import React from 'react';
import { createBrowserRouter } from 'react-router';
import RootLayout from '../Layout/RootLayout';
import Home from '../Pages/Home/Home';
import AuthLayout from '../Layout/AuthLayout';
import Login from '../Pages/Authentication/Login/Login';

const Router = createBrowserRouter([
    {
        path: '/',
        Component: RootLayout,
        children: [
            {
                index: true,
                Component: Home
            }
        ]
    },
    {
        path:'/',
        Component: AuthLayout,
        children: [
            {
                path: 'login',
                Component: Login
            }
        ]
    }
])

export default Router;