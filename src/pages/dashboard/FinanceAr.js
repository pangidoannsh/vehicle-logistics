import React from 'react'
import Header from '../../components/Header'
import Navbar from '../../components/Navbar'

const FinanceAr = () => {
    return (
        <div className='flex bg-white'>
            <Navbar />
            <div className="flex-1">
                <Header />
                <div id="content">Test</div>
            </div>
        </div>
    )
}

export default FinanceAr
