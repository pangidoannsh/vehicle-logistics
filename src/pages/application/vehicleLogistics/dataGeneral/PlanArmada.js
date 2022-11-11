import { useEffect } from 'react';
import Header from '../../../../components/Header'
import Navbar from '../../../../components/Navbar'

const PlanArmada = () => {

    return (
        <div id="container">
            <Navbar />
            <div className="flex-1">
                <Header />
                <div className='content'>Plan Armada</div>
            </div>
        </div>
    );
}

export default PlanArmada;

