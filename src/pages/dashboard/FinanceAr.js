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
        <div id='container'>
            <Navbar />
            <div className="flex-1">
                <Header />
                <div className='text-2xl text-red mt-4'>{state.name}</div>
                <label htmlFor="x">Test</label>
                <input type="text" id='x' onChange={handleChange} />
                <div className="content">
                    <div className='h-screen bg-light-green'></div>
                    <div className='h-screen bg-blue-300'></div>
                </div>
            </div>
        </div >
    )
}

export default FinanceAr
