import React, { useState } from 'react';
import PasswordInput from '../components/inputs/PasswordInput';
import Sign from '../layouts/Sign';

export default function Register() {
    const handleSubmit = e => {
        e.preventDefault()
    }
    return (
        <Sign>
            <form className='py-6' onSubmit={handleSubmit}>
                {/* Input Name */}
                <div className="relative mb-8">
                    <input id='name' type="text" className='focus:outline-none bg-transparent p-1 focus:rounded
                                        border-b border-b-slate-400 w-full text-slate-400 focus:text-slate-600 peer' placeholder=" " />
                    <div className='absolute bottom-0 duration-300 w-0 peer-focus:w-full h-[2px] bg-light-green'></div>
                    <label htmlFor="name" className="floating-label font-medium">Name</label>
                </div>
                {/* Input Email */}
                <div className="relative mb-8">
                    <input id='email' type="text" className='focus:outline-none bg-transparent p-1 focus:rounded
                                        border-b border-b-slate-400 w-full text-slate-400 focus:text-slate-600 peer ' placeholder=" " />
                    <div className='absolute bottom-0 duration-300 w-0 peer-focus:w-full h-[2px] bg-light-green'></div>
                    <label htmlFor="email" className="floating-label font-medium">Email</label>
                </div>
                {/* Input Password */}
                <PasswordInput id="password" className="mb-8">Password</PasswordInput>
                <PasswordInput id="confirmpassword" className="mb-8">Confirm Password</PasswordInput>
                {/* Login Button */}
                <button className='bg-light-green hover:bg-green-600 active:ring-4 active:ring-green-300 focus:ring-4 focus:ring-green-300
                rounded py-2 px-4 text-white font-medium tracking-[.25em]'>
                    REGISTER
                </button>
            </form>
        </Sign>
    )
}
