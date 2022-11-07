import React from 'react'
import Header from '../../components/Header'
import Navbar from '../../components/Navbar'

const FinanceAr = () => {
    return (
        <div id='container'>
            <Navbar />
            <div className="flex-1">
                <Header />
                <div className="content">
                    <div className='h-screen bg-light-green'></div>
                    <div className='h-screen bg-blue-300'></div>
                </div>
            </div>
        </div >
    )
}

export default FinanceAr
