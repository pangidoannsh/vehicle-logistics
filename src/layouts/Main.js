import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import Header from '../components/Header'
import Navbar from '../components/Navbar'
import { AuthContext } from '../config'

const Main = ({ children }) => {
    const [isLogged] = useContext(AuthContext);

    // if (!isLogged) return <Navigate to="/login" />;
    return (
        <div id='container'>
            <Navbar />
            <div className="flex-1">
                <Header />
                <div className="content">
                    {children}
                </div>
            </div>
        </div>
    )
}
export default Main;
