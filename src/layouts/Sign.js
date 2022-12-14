import React, { useContext, useEffect, useState } from 'react';
import Background from '../assets/images/login-bg.jpg'
import { VehicleLogo, Logo, TopShape, BottomShape } from '../assets'
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from "../config";

export default function Sign(props) {
    const [isLogged, setIsLogged] = useContext(AuthContext);
    let navigate = useNavigate();
    if (isLogged) navigate('/');
    let location = useLocation();
    const widthSceen = window.innerWidth
    const [isOpen, setIsOpen] = useState(false);
    const [isShow, setIsShow] = useState(false)
    const [isRegister, setIsRegister] = useState(() => {
        if (location.pathname === "/register") {
            return true
        }
        return false
    })

    const handleContent = e => {
        if (e.target.id === "login") {
            if (location.pathname !== '/login') {
                setIsOpen(false)
                setIsRegister(false)
                setTimeout(() => {
                    navigate('/login')
                }, 700);
            }
        } else {
            if (location.pathname !== '/register') {
                setIsShow(false)
                setIsOpen(false)
                setIsRegister(true)
                setTimeout(() => {
                    navigate('/register')
                }, 700);
            }
        }
    }

    let onceEffect = false

    useEffect(() => {
        if (!onceEffect) {
            setTimeout(() => {
                setIsOpen(true)
                setTimeout(() => {
                    setIsShow(true)
                }, 300);
            }, 100);
        }
        return () => {
            onceEffect = true
        };
    }, []);
    // if (isLogged) return <Navigate to="/" />;
    return (
        <div className='bg-no-repeat bg-center bg-cover overflow-hidden'
            style={{ backgroundImage: `url(${Background})` }}>
            <div className="flex">
                <div className="md:w-[600px] w-full h-screen">
                    <div className={`fixed ${isOpen ? 'md:w-[600px]' : 'md:w-0'} duration-500
                        relative h-screen bg-white md:rounded-r-2xl overflow-hidden`} style={{
                            width: widthSceen < 768 && (isOpen ? `${widthSceen}px` : '0px')
                        }}>
                        <div className="fixed z-50 top-[40px] lg:left-16 md:left-12 left-8 duration-500">
                            <img src={VehicleLogo} className="w-[150px]" />
                        </div>
                        <div className="absolute -top-[180px] -left-48">
                            <img src={TopShape} />
                        </div>
                        <div className='absolute -bottom-60 -right-44'>
                            <img src={BottomShape} />
                        </div>
                        <div className={`relative z-20 lg:px-16 md:px-10 px-4 h-full flex flex-col gap-y-6 justify-center 
                            duration-100 origin-left ${!isOpen ? 'opacity-0' : 'opacity-1'} ${isRegister ? 'top-8' : ''}`}>
                            <div className="flex gap-x-6 items-center">
                                <button id="login" disabled={!isRegister}
                                    className={`${!isRegister ? 'text-5xl text-dark-green' : 'text-3xl text-slate-400 hover:text-dark-green'} 
                                    font-medium ${!isShow ? 'opacity-0' : 'opacity-100'}`} onClick={handleContent}>
                                    Sign In
                                </button>
                                <button id="resgister" disabled={isRegister}
                                    className={`${isRegister ? 'text-5xl text-dark-green' : 'text-3xl text-slate-400 hover:text-dark-green'} 
                                    font-medium ${!isShow ? 'opacity-0' : 'opacity-100'}`} onClick={handleContent}>
                                    Sign Up
                                </button>
                            </div>
                            {props.children}
                        </div>
                    </div>
                </div>
                <div className="flex-1 hidden justify-center items-center h-screen md:flex">
                    <img src={Logo} alt="" className='w-[480px]' />
                </div>
            </div>
        </div>
    );
}
