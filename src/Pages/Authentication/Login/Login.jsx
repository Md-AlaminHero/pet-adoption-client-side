import React from 'react';
import { useForm } from 'react-hook-form';

const Login = () => {
    const { register, handleSubmit } = useForm();

    const onSubmit = data => {
        console.log(data);
    }


    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <div className="card-body">
                        <h1 className="text-5xl font-bold">SignIn now!</h1>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <fieldset className="fieldset">
                                <label className="label">Email</label>
                                <input type="email" {...register('email')} className="input" placeholder="Email" />

                                <label className="label">Password</label>
                                <input type="password" {...register('password')} className="input" placeholder="Password" />

                                <button className="btn btn-neutral mt-4">Sign In</button>
                            </fieldset>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;