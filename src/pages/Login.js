import React, { useState } from 'react';
import Background from '../assets/images/login-bg.jpg'
import { VehicleLogo, Shape, Logo, TopShape, BottomShape } from '../assets'
import { Icon } from '@iconify/react';


const Login = () => {
    const [isOpen, setIsOpen] = useState(true);
    const [seePassword, setSeePassword] = useState(false);
    const [passOnFocus, setPassOnFocus] = useState(false)

    const screenHeight = window.innerHeight
    const minMediumScreen = window.innerHeight < 680;

    const handleSubmit = e => {
        e.preventDefault()
        console.log('test');
    }
    const handleContent = e => {

    }
    return (
        <div className='h-screen bg-no-repeat bg-center bg-cover'
            style={{ backgroundImage: `url(${Background})` }}>
            <div className="flex">
                <div className="w-[600px] h-screen">
                    <div className={`fixed ${isOpen ? 'w-[600px]' : 'w-16'} duration-300
                        relative h-screen bg-white rounded-r-2xl overflow-hidden`}>
                        <div className="fixed z-10 top-[40px] left-16 duration-500">
                            <img src={VehicleLogo} style={{
                                width: minMediumScreen ? '120px' : '150px'
                            }} />
                        </div>
                        <div className="absolute -top-[180px] -left-48" style={{
                            width: minMediumScreen && '400px',
                            top: minMediumScreen && '-150px',
                            left: minMediumScreen && '-150px'
                        }} >
                            <img src={TopShape} />
                        </div>
                        <div className='absolute -bottom-60 -right-44'>
                            <img src={BottomShape} />
                        </div>
                        <div className="px-16 h-full flex flex-col gap-y-6 justify-center">
                            <div className="flex gap-x-6">
                                <button className={`text-5xl text-dark-green font-medium`}>Sign In</button>
                                <button className={`text-3xl text-slate-400 font-medium`} onClick={handleContent}>Sign up</button>
                            </div>
                            <form className='py-6' onSubmit={handleSubmit}>
                                {/* Input Email */}
                                <div className="relative mb-8 ">
                                    <input id='email' type="text" className='focus:outline-none bg-transparent p-1 focus:rounded
                                    border-b border-b-slate-400 w-full text-slate-400 focus:text-slate-600 peer ' placeholder=" " />
                                    <div className='absolute bottom-0 duration-300 w-0 peer-focus:w-full h-[2px] bg-light-green'></div>
                                    <label htmlFor="email" className="floating-label">Email</label>
                                </div>
                                {/* Input Password */}
                                <div className="relative mb-3">
                                    <input id='password' type={`${seePassword ? 'text' : 'password'}`} className='focus:outline-none
                                    bg-transparent p-1 focus:rounded border-b border-b-slate-400 w-full text-slate-400 
                                    focus:text-slate-600 peer' placeholder=" " onFocus={() => setPassOnFocus(true)} />
                                    <div className='absolute bottom-0 duration-300 w-0 peer-focus:w-full h-[2px] bg-light-green '></div>
                                    <label htmlFor="password" className="floating-label">Password</label>
                                    <button id="seepassword" className={`absolute right-0 text-center p-2 pr-4 ${passOnFocus ? 'inline' : 'hidden'}`}
                                        onClick={e => { e.preventDefault(); setSeePassword(!seePassword) }}>
                                        <Icon icon={`${seePassword ? 'mdi:eye-off' : 'ic:round-remove-red-eye'}`}
                                            className='text-lg text-slate-600' />
                                    </button>
                                </div>
                                {/* Forgot Password */}
                                <button className='text-sm font-medium text-slate-400 block mb-8 hover:text-light-green'>
                                    forgot password?
                                </button>
                                {/* Login Button */}
                                <button className='bg-light-green rounded py-2 px-4 text-white font-medium tracking-[.25em]'>
                                    LOGIN
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="flex-1 flex justify-center items-center h-screen">
                    <img src={Logo} alt="" className='w-[582px]' />
                </div>
            </div>
        </div>
    );
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