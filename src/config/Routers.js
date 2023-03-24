import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Main from '../layouts/Main'
import {
    Dashboard, Login, FinanceAr, PlanArmada, NotFound, TransitOut, Unloading, Invoice,
    Armada, Revenue, Manifest, Register, ManifestCreate, Bast, POCustomer, Common, Branch, Customers, Contract, PoUnit, Loading,
    ChangePassword
} from '../pages';

const Routers = () => {

    return (
        <Router>
            <Routes>
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/settings' element={<Main><ChangePassword /></Main>} />
                <Route path='/' element={<Main><Dashboard /></Main>} />
                <Route path='/armada' element={<Main><Armada /></Main>} />
                <Route path='/pocustomer' element={<Main><POCustomer /></Main>} />
                <Route path='/financear' element={<Main><FinanceAr /></Main>} />
                <Route path='/revenue' element={<Main><Revenue /></Main>} />
                <Route path='/plan-armada' element={<Main><PlanArmada /></Main>} />
                <Route path='/manifest' element={<Main><Manifest /></Main>} />
                <Route path='/manifest/create' element={<Main><ManifestCreate /></Main>} />
                <Route path='/bast' element={<Main><Bast /></Main>} />
                <Route path='/common' element={<Main><Common /></Main>} />
                <Route path='/branch' element={<Main><Branch /></Main>} />
                <Route path='/customers' element={<Main><Customers /></Main>} />
                <Route path='/contract' element={<Main><Contract /></Main>} />
                <Route path='/pounit' element={<Main><PoUnit /></Main>} />
                <Route path='/transit-out' element={<Main><TransitOut /></Main>} />
                <Route path='/loading' element={<Main><Loading /></Main>} />
                <Route path='/unloading' element={<Main><Unloading /></Main>} />
                <Route path='/invoice' element={<Main><Invoice /></Main>} />
                <Route path='*' element={<NotFound />} />
            </Routes>
        </Router>
    )
}


export default Routers