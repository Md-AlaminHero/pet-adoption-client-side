import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import axios from 'axios';
import Swal from 'sweetalert2';
import UseAxios from '../../../Hook/UseAxios';
import UseAuth from '../../../Hook/UseAuth';


const Register = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const { createUser, updateUserProfile } = UseAuth();
  const [profilePic, setProfilePic] = useState('');
  const axiosInstance = UseAxios();
  const navigate = useNavigate();
  const onSubmit = data => {

    console.log(data);

    createUser(data.email, data.password)
      .then(async (result) => {
        console.log(result.user);
        Swal.fire({
          title: 'Registration  Successful!',
          text: 'Welcome back!',
          icon: 'success',
          confirmButtonText: 'Continue',
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false,
        });
        // update userinfo in the database
        const userInfo = {
          name: data.name,        // ADD THIS
          photoURL: profilePic,
          email: data.email,
          role: data.role, // default role
          created_at: new Date().toISOString(),
          last_log_in: new Date().toISOString()
        }

        const userRes = await axiosInstance.post('/users', userInfo);
        console.log(userRes.data);

        // update user profile in firebase
        const userProfile = {
          displayName: data.name,
          photoURL: profilePic
        }
        updateUserProfile(userProfile)
          .then(() => {
            console.log('profile name pic updated')
            reset();
            navigate('/');
          })
          .catch(error => {
            console.log(error)
          })

      })
      .catch(error => {
        console.error(error);
      })
  }

  const handleImageUpload = async (e) => {
    const image = e.target.files[0];
    console.log(image)

    const formData = new FormData();
    formData.append('image', image);


    const imagUploadUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_upload_key}`
    console.log("img", imagUploadUrl);
    const res = await axios.post(imagUploadUrl, formData)
    console.log(res.data.data.url);
    setProfilePic(res.data.data.url);

  }

  return (

    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <div className="card-body">
        <h1 className="text-5xl font-bold">Create Account</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset className="fieldset">
            {/* name field */}
            <label className="label">Your Name</label>
            <input type="text"
              {...register('name', { required: true })}
              className="input" placeholder="Your Name" />
            {
              errors.email?.type === 'required' && <p className='text-red-500'>Name is required</p>
            }
            {/* name field */}
            <label className="label">Your Name</label>
            <input type="file"
              onChange={handleImageUpload}
              className="input" placeholder="Your Profile picture" />

            {/* email field */}
            <label className="label">Email</label>
            <input type="email"
              {...register('email', { required: true })}
              className="input" placeholder="Email" />
            {
              errors.email?.type === 'required' && <p className='text-red-500'>Email is required</p>
            }
            {/* password field*/}
            <label className="label">Password</label>
            <input type="password" {...register('password', { required: true, minLength: 6 })} className="input" placeholder="Password" />
            {
              errors.password?.type === 'required' && <p className='text-red-500'>Password is required</p>
            }
            {
              errors.password?.type === 'minLength' && <p className='text-red-500'>Password must be 6 characters or longer</p>
            }

            {/* Role */}
            <label className="label">Select Role</label>
            <select
              className="select select-bordered w-full"
              {...register("role", { required: true })}
            >
              <option value="">-- Choose Role --</option>
              <option value="user">user</option>
              
            </select>
            {errors.role && <p className="text-red-500">Role is required</p>}

            <div><a className="link link-hover">Forgot password?</a></div>
            <button className="btn bg-[#caeb66] text-black mt-4">Register</button>
          </fieldset>
          <p><small>Already have an account? <Link className="btn btn-link" to="/login">Login</Link></small></p>
        </form>
 
      </div>
    </div>
  );
};

export default Register;