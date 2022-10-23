import Header from '../../../../components/Header'
import Navbar from '../../../../components/Navbar'

const PlanArmada = () => {
    return (
        <div className="flex bg-body">
            <Navbar />
            <div className="flex-1">
                <Header />
                <div id="content" className=''>Plan Armada</div>
            </div>
        </div>
    );
}

export default PlanArmada;

