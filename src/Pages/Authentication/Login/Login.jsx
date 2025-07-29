import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import axios from 'axios';
import Swal from 'sweetalert2';
import UseAuth from '../../../Hook/UseAuth';
import SocialLogin from '../SocialLogin/SocialLofin';

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { signIn } = UseAuth();
//   const { signIn } = UseAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const result = await signIn(data.email, data.password);
      const user = result.user;
      console.log(" Logged in:", user);


    //   const res = await axios.post('https://twelveth-assignment-server.vercel.app/jwt', {
    //     email: user.email
    //   });
      const res = await axios.post('http://localhost:3000/jwt', {
        email: user.email
      });

      const token = res.data.token;
      localStorage.setItem('access-token', token);
      console.log(" JWT token saved");

      Swal.fire({
        title: 'Login Successful!',
        text: 'Welcome back!',
        icon: 'success',
        confirmButtonText: 'Continue',
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false,
      });
      navigate("/");
    } catch (error) {
      console.error(" Login error:", error);
      Swal.fire("Please check email and password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <div className='card-body'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset className="fieldset">
            <h1 className='text-5xl font-semibold'>Login !</h1>

            <label className="label">Email</label>
            <input
              type="email"
              autoComplete="off"
              {...register('email')}
              className="input"
              placeholder="Email"
            />

            <label className="label">Password</label>
            <input
              type="password"
              autoComplete="new-password"
              {...register('password', {
                required: true,
                minLength: 6
              })}
              className="input"
              placeholder="Password"
            />

            {errors.password?.type === "minLength" && (
              <p role='alert' className='text-red-600'>
                Password must be at least 6 characters
              </p>
            )}

            {errors.password?.type === "required" && (
              <p role='alert' className='text-red-600'>
                Password is required
              </p>
            )}

            <div><a className="link link-hover">Forgot password?</a></div>

            <button className="btn bg-[#caeb66] text-black font-bold w-full mt-4" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </fieldset>

          <p>
            <small>
              Don't have an account?
              <Link to='/register' className='btn-link text-blue-700'> Register</Link>
            </small>
          </p>
        </form>

       <SocialLogin></SocialLogin>
      </div>
    </div>
  );
};

export default Login;
