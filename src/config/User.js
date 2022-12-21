import React from 'react'
import { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react'
import { AuthContext } from '.';
import { api } from './Api';

export const UserContext = React.createContext()

const User = (props) => {
    const [isLogged, setIsLogged] = useContext(AuthContext);
    const [user, setUser] = useState({
        id: -1,
        name: "",
        branch: "",
        branchname: ""
    });
    let mount = true;
    useEffect(() => {
        if (mount) {
            api.get("/cektoken").then(res => {
                setUser(res.data);
                setIsLogged(true);
            }).catch(err => {
                if (err.response.status === 401) {
                    setIsLogged(false);
                }
            })
        }

    }, []);
    return (
        <UserContext.Provider value={[user, setUser]}>
            {props.children}
        </UserContext.Provider>
    );
}

export default User;
