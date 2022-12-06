import React, { useState } from 'react'
import { api } from './config'

export const CreateDataContext = React.createContext()

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
    const [branch, setBranch] = useState([]);
    const [contract, setContract] = useState([])
    const [vehicleType, setVehicleType] = useState([])
    return (
        <CreateDataContext.Provider value={{
            branch: [branch, setBranch],
            contract: [contract, setContract],
            vehicleType: [vehicleType, setVehicleType]
        }}>
            {props.children}
        </CreateDataContext.Provider>
    );
}

export default Store;
