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
        <button className='w-full hover:bg-red-400 px-3 py-2 hover:text-white' onClick={handleLogout}>
            Logout
        </button>
    );
}

export default Logout;
