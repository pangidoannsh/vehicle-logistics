import React, { useState } from 'react'
import { api } from './config'

export const UserContext = React.createContext()

export const fetchOption = (url, setOption) => {
    api.get(url).then(res => {
        setOption(res.data)
    }).catch(error => {
        console.log(error.response);
        if (error.code === "ERR_NETWORK") {
            alert('Periksa jaringan anda dan Reload Browser')
        }
    })
}

const Store = (props) => {
    const user = {
        id: 1,
        name: "DEV",
        branch: "30000",
    }
    return (
        <UserContext.Provider value={user}>
            {props.children}
        </UserContext.Provider>
    );
}

export default Store;
