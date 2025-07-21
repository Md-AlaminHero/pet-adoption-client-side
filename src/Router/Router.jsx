import React from 'react';
import { createBrowserRouter } from 'react-router';
import RootLayout from '../Layout/RootLayout';
import Home from '../Pages/Home/Home';
import AuthLayout from '../Layout/AuthLayout';
import Login from '../Pages/Authentication/Login/Login';
import Register from '../Pages/Authentication/Register/Register';
import AdminRoute from '../PrivateRoutes/AdminRoute';
import PrivateRoute from '../PrivateRoutes/PrivateRoutes';
import AdminLayout from '../Layout/AdminLayout';
import UserRoute from '../PrivateRoutes/UserRoute';
import UserLayout from '../Layout/UserLayout';
import AddPet from '../Pages/Dasboard/User/AddPet';

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
        path: '/',
        Component: AuthLayout,
        children: [
            {
                path: 'login',
                Component: Login
            },
            {
                path: 'register',
                Component: Register
            }
        ]
    },

    {
        path: "/dashboard/admin",
        element: (
            <PrivateRoute>
                <AdminRoute>
                    <AdminLayout />
                </AdminRoute>
            </PrivateRoute>
        ),
        children: [
            {
                path: "users",
                // element: <AdminViewUsers />
            },


        ]


    },

    {
        path: "/dashboard/user",
        element: (
            <PrivateRoute>
                <UserRoute>
                    <UserLayout />
                </UserRoute>
            </PrivateRoute>
        ),
        children: [
            {
                path: "add-pet",
                element: <AddPet />,
            },

        ]
    }


])

export default Router;