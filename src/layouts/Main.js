import React from 'react'
import Header from '../components/Header'
import Navbar from '../components/Navbar'

const Main = (props) => {
    return (
        <div id='container'>
            <Navbar />
            <div className="flex-1">
                <Header />
                <div className="content">
                    {props.children}
                </div>
            </div>
        </div>
    )
}
export default React.memo(Main);
