import React, { useContext } from 'react';
import { useState } from 'react';
import useAuth from '../hooks/useAuth';
import { UserContext } from './User';

export const AuthContext = React.createContext();

const Authentication = ({ children }) => {
    const [isLogged, setIsLogged] = useState(() => {
        if (localStorage.getItem("access-token")) {
            return true;
        }
        return false;
    })

    return (
        <AuthContext.Provider value={[isLogged, setIsLogged]}>
            {children}
        </AuthContext.Provider>
    );
}

export default Authentication;
