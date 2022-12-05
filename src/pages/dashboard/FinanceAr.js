import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import Navbar from '../../components/Navbar'

const FinanceAr = () => {
    const [state, setState] = React.useState({
        id: 1,
        name: "Edo"
    });
    useEffect(() => {
        console.log(state);
    }, []);
    useEffect(() => {
        console.log(state);
    }, [state]);
    const handleChange = e => {
        setState({
            ...state, name: e.target.value
        })
    }

    return (
        <>
            Finance Ar
        </>
    )
}

export default FinanceAr
