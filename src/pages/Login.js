import React, { useState } from 'react';
import PasswordInput from '../components/inputs/PasswordInput';
import Sign from '../layouts/Sign';

const Login = () => {
    const handleSubmit = e => {
        e.preventDefault()
    }
    return (
        <Sign>
            <form className='py-6' onSubmit={handleSubmit}>
                {/* Input Email */}
                <div className="relative mb-8">
                    <input id='email' type="text" className='focus:outline-none bg-transparent p-1 focus:rounded
                                    border-b border-b-slate-400 w-full text-slate-400 focus:text-slate-600 peer ' placeholder=" " />
                    <div className='absolute bottom-0 duration-300 w-0 peer-focus:w-full h-[2px] bg-light-green'></div>
                    <label htmlFor="email" className="floating-label font-medium">Email</label>
                </div>
                {/* Input Password */}
                <PasswordInput id="password" className="mb-3">Password</PasswordInput>
                {/* Forgot Password */}
                <button className='text-sm font-medium text-slate-400 block mb-8 hover:text-light-green'>
                    forgot password?
                </button>
                {/* Login Button */}
                <button className='bg-light-green hover:bg-green-600 active:ring-4 active:ring-green-300 focus:ring-4 focus:ring-green-300
                rounded py-2 px-4 text-white font-medium tracking-[.25em]'>
                    LOGIN
                </button>
            </form>
        </Sign>
    )
}

export default Login;

{/* <div className="relative z-0">
                            <input type="text" id="email" className="block py-3 px-0 w-full text-sm bg-transparent border-0 border-b-2
                                 border-gray-300 appearance-none dark:text-white focus:outline-none email" placeholder=" " />
                            <label htmlFor="email" className="absolute text-sm text-white/60 duration-300 transform 
                                -translate-y-6 scale-75 top-3 -z-10 origin-[0] email-focus:left-0 email-focus:text-blue-600 
                                email-placeholder-shown:scale-100 email-placeholder-shown:translate-y-0 email-focus:scale-75 
                                email-focus:-translate-y-6">Email</label>
                        </div> */}