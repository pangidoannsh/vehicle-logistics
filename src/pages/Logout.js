import { Icon } from '@iconify/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../config';

const Logout = ({ setIsLogged }) => {
    let navigate = useNavigate();
    const handleLogout = e => {
        e.preventDefault();
        api.post('/logout').then(res => {
            localStorage.clear();
            setIsLogged(false);
            navigate('/login');
        }).catch(err => {
            console.log("Error");
        })
    }
    return (
        <button className='flex w-full px-3 py-2 hover:text-red-400 gap-2 rounded-b text-slate-500'
            onClick={handleLogout}>
            <Icon icon="ic:round-logout" className='text-xl' />
            <span className='text-sm'>Logout</span>
        </button>
    );
}

export default Logout;
