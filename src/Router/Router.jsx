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
import MyPets from '../Pages/Dasboard/User/MyPets';
import UpdatePet from '../Pages/Dasboard/User/UpdatePet';
import CreateDonationCampaign from '../Pages/Dasboard/User/CreateDonationCampaign ';
import MyDonations from '../Pages/Dasboard/User/MyDonations';
import EditDonation from '../Pages/Dasboard/User/EditDonation';
import PetList from '../Pages/Home/PetList';
import PetDetails from '../Pages/Home/PetDetails';
import DonationCampaigns from '../Pages/Home/DonationCampaigns';
import DonationDetails from '../Pages/Home/DonationDetails';
import AboutUs from '../Pages/Home/AboutUs';

const Router = createBrowserRouter([
    {
        path: '/',
        Component: RootLayout,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: '/pet-listings',
                Component: PetList
            },
            {
                path: '/pet-details/:id',
                Component: PetDetails
            },
            {
                path: '/donation-campaigns',
                Component: DonationCampaigns
            },
            {
                path: '/donation-campaigns/:id',
                Component: DonationDetails
            },
            {
                path: '/about-us',
                Component: AboutUs
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
            {
                path: "my-pets",
                element: <MyPets />,
            },
            {
                path: "update-pet/:id",
                element: <UpdatePet />,
            },
            {
                path: "create-donation-campaign",
                element: <CreateDonationCampaign/>,
            },
            {
                path: "my-campaign",
                element: <MyDonations/>,
            },
            {
                path: "edit-donation/:id",
                element: <EditDonation/>,
            }

        ]
    }


])

export default Router;