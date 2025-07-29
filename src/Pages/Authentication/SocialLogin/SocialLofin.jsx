import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import UseAuth from '../../../Hook/UseAuth';
import UseAxios from '../../../Hook/UseAxios';

const SocialLogin = () => {
    const { signInWithGoogle } = UseAuth();
    const axiosInstance = UseAxios();
    const navigate = useNavigate();

    //  Save user to DB
    const saveUserToDB = async (user) => {
        const userInfo = {
            name: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            uid: user.uid,
            role: 'user', // default role
        };

        try {
            const res = await axiosInstance.post('/users/social', userInfo);
            console.log(' User saved:', res.data);
        } catch (err) {
            console.error('❌ Error saving user to DB:', err);
        }
    };

    //  Get JWT Token from backend
    const getJWTToken = async (email) => {
        try {
            const res = await axios.post('http://localhost:3000/jwt', { email });
            localStorage.setItem('access-token', res.data.token);
            console.log(' Token received and saved');
        } catch (err) {
            console.error(' JWT token error:', err);
        }
    };

    //  Google sign in handler
    const handleGoogleSignIn = () => {
        // signInWithGoogle()
        //   .then(async (result) => {
        //     const user = result.user;

        //     if (user?.email) {
        //       await saveUserToDB(user);
        //       await getJWTToken(user.email);
        //       navigate('/'); //  Later you can navigate based on role
        //     }
        //   })

        signInWithGoogle()
            .then(async (result) => {
                const user = result.user;

                await getJWTToken(user.email);   // 🔐 get token first (checks DB)
                await saveUserToDB(user);        // 💾 save user with that token in header (axiosInstance)


                const res = await axiosInstance.get(`/users/${user.email}`);
                const role = res.data.role;
                Swal.fire({
                    icon: 'success',
                    title: 'Login Successful',
                    text: `Welcome, ${user.displayName || 'User'}!`,
                    timer: 2000,
                    showConfirmButton: false

                });
                navigate('/')

                if (role === 'admin') navigate('/dashboard/admin');
                else if (role === 'user') navigate('/dashboard/user');
                // else navigate('/dashboard/student');
                else navigate('/');
            })

            .catch((error) => {
                console.error(' Google Login Error:', error);
            });
    };

    return (
        <div>
            <div className="divider">OR</div>
            <button
                onClick={handleGoogleSignIn}
                className="btn w-full bg-white text-black border-[#e5e5e5]"
            >
                <svg
                    aria-label="Google logo"
                    width="16"
                    height="16"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                >
                    <g>
                        <path d="m0 0H512V512H0" fill="#fff"></path>
                        <path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path>
                        <path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path>
                        <path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path>
                        <path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path>
                    </g>
                </svg>
                Login with Google
            </button>
        </div>
    );
};

export default SocialLogin;
