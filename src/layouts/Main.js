import React from 'react'
import { Navigate } from 'react-router-dom';
import Alert from '../components/Alert';
import Header from '../components/Header'
import Navbar from '../components/Navbar'
import { AuthContext } from '../config'

export const AlertContext = React.createContext();

const Main = ({ children }) => {
    const [isLogged, setIsLogged] = React.useContext(AuthContext);
    const [alert, setAlert] = React.useState({
        isActived: false,
        code: 0,
        title: "title",
        message: "message"
    });
    if (!isLogged) return <Navigate to="/login" />;
    return (
        <>
            <div id='container'>
                <Navbar />
                <div className="flex-1">
                    <Header setIsLogged={setIsLogged} />
                    <div className="content">
                        <AlertContext.Provider value={[alert, setAlert]}>
                            {children}
                        </AlertContext.Provider>
                    </div>
                </div>
            </div>
            <Alert isOpen={alert.isActived} setIsOpen={isActived => setAlert(prev => ({ ...prev, isActived }))} codeAlert={alert.code} title={alert.title}>
                {alert.message}
            </Alert>
        </>
    )
}
export default Main;
