import React from 'react';

export const AuthContext = React.createContext();

const Authentication = ({ children }) => {
    const [isLogged, setIsLogged] = React.useState(() => {
        if (localStorage.getItem('access-token') === "x123") {
            return true;
        }
        else {
            return false;
        }
    });

    return (
        <AuthContext.Provider value={[isLogged, setIsLogged]}>
            {children}
        </AuthContext.Provider>
    );
}

export default Authentication;
