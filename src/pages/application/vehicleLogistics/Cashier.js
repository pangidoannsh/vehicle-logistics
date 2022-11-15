import React from 'react';
import Header from '../../../components/Header';
import Navbar from '../../../components/Navbar';

const Cashier = () => {
    return (
        <div id='container'>
            <Navbar />
            <div className="flex-1">
                <Header />
                <div className="content">
                    Cashier Testing
                </div>
            </div>
        </div>
    );
}

export default Cashier;
