import React, { useState } from 'react'
import { login as authLogin } from '../store/authSlice'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Input, Logo } from './index'
import authService from '../appwrite/auth'


function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [ error, setError ] = useState(null);
    const { register, handleSubmit } = useForm();
 
    const login = async (data) => {
        setError("");
        // console.log(data);
        try {
            const session = await authService.login(data);

            if (session) {
                const userData = await authService.getCurrentUser();

                if (userData) dispatch(authLogin(userData));
                navigate("/");
            }
        } catch (error) {
            setError(error.message);
        }
    }

    return (
        <div>
            <div>
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>

                <h2 className="text-center text-2xl font-bold">Sign in to your account</h2>

                <p className="mt-2 text-center text-base text-black/60">
                    Don't have any account?
                    <Link
                        to="/signup"
                        className="font-medium text-primary hover:underline"
                    >
                        Sign Up
                    </Link>
                </p>

                {error && <p className='text-red-600 mt-8 text-center'>{error}</p>}

                <form className='mt-8' onSubmit={handleSubmit(login)}>
                    <div className='space-y-5'>
                        <Input
                            label="Email"
                            type="email"
                            placeholder='Enter your email'
                            {...register("email", {
                                required: true,
                                // pattern:,
                                validate: {
                                    matchPattern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                        "Email address must be a valid address",
                                }
                            })}
                        />

                        <Input
                            label="Password"
                            type="password"
                            placeholder="Enter your password"
                            {...register("password", {
                                required: true,
                            })}
                        />

                        <Button
                            type='submit'
                            className='w-full'>Sign in</Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login