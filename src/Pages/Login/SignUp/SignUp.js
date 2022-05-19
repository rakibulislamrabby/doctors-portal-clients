import React from 'react';
import { useCreateUserWithEmailAndPassword, useSignInWithEmailAndPassword, useSignInWithGoogle, useUpdateProfile } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import auth from '../../../firebase_init';
import useToken from '../../../hooks/useToken';
import Loading from '../../Shared/Loading';

const SignUp = () => {
    const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
    const { register, formState: { errors }, handleSubmit } = useForm();
    const navigate = useNavigate();
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth);

    const onSubmit = async data => {
        await createUserWithEmailAndPassword(data.email, data.password);
        await updateProfile({ displayName: data.name });
        console.log('update one');
        console.log(gUser);
    }

    const [updateProfile, updating, updateError] = useUpdateProfile(auth);

    const [token] = useToken(user || gUser)
    if (token) {
        console.log(token);
        navigate("/home");

    }
    let signInError;
    if (loading || gLoading || updating) {
        return <Loading></Loading>
    }

    if (error || gError || updateError) {
        signInError = <p className='text-red-500'><small>{error?.message || gError?.message}</small></p>
    }

    return (
        <div className='flex h-screen justify-center items-center pt-10 mb-20'>
            <div className="card w-96 bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="text-center text-2xl font-bold ">Sign Up</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {/* email with validation */}
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input
                                {...register("name", {
                                    required: {
                                        value: true,
                                        message: "Name is Required"
                                    },

                                })}
                                type="name" placeholder="You Name"
                                className="input input-bordered input-secondary w-full max-w-xs" />
                            <label className="label">
                                {errors.name?.type === 'required' && <span className="label-text-alt text-red-500">{errors.name.message}</span>}
                                {/* {errors.name?.type === 'pattern' && <span className="label-text-alt text-red-500">{errors.email.message}</span>} */}
                            </label>
                        </div>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                {...register("email", {
                                    required: {
                                        value: true,
                                        message: "Email is Required"
                                    },
                                    pattern: {
                                        value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                                        message: "provide a valid email"
                                    }

                                })}
                                type="email" placeholder="You email"
                                className="input input-bordered input-secondary w-full max-w-xs" />
                            <label className="label">
                                {errors.email?.type === 'required' && <span className="label-text-alt text-red-500">{errors.email.message}</span>}
                                {errors.email?.type === 'pattern' && <span className="label-text-alt text-red-500">{errors.email.message}</span>}
                            </label>
                        </div>
                        {/* password with validation */}
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input
                                {...register("password", {
                                    required: {
                                        value: true,
                                        message: "password is Required"
                                    },
                                    minLength: {
                                        value: 6,
                                        message: "Must be 6 Character longer"
                                    }

                                })}
                                type="password" placeholder="You Password"
                                className="input input-bordered input-secondary w-full max-w-xs" />
                            <label className="label">
                                {errors.password?.type === 'required' && <span className="label-text-alt text-red-500">{errors.password.message}</span>}
                                {errors.password?.type === 'minLength' && <span className="label-text-alt text-red-500">{errors.password.message}</span>}
                            </label>
                        </div>
                        {signInError}
                        <input className='btn w-full  max-w-xs text-white' type="submit" value="Sign Up" />
                    </form>
                    <p>Already have account? <Link className='text-secondary' to={"/login"}>Please Login</Link></p>
                    <div className="divider">OR</div>
                    <button onClick={() => signInWithGoogle()} className="btn btn-outline btn-secondary">CONTINUE WITH GOOGLE</button>
                </div>
            </div>
        </div>
    );
};

export default SignUp;