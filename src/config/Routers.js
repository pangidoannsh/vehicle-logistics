import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import {
    Dashboard, Login, Marketing, FinanceAr, PlanArmada, NotFound,
    Armada, Revenue, Manifest, Cashier, Register, ManifestCreate, Bast
} from '../pages'

function Routers() {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Dashboard />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/armada' element={<Armada />} />
                <Route path='/marketing' element={<Marketing />} />
                <Route path='/financear' element={<FinanceAr />} />
                <Route path='/revenue' element={<Revenue />} />
                <Route path='/plan-armada' element={<PlanArmada />} />
                <Route path='/manifest' element={<Manifest />} />
                <Route path='/manifest/create' element={<ManifestCreate />} />
                <Route path='/bast' element={<Bast />} />
                <Route path='/cashier' element={<Cashier />} />
                <Route path='*' element={<NotFound />} />
            </Routes>
        </Router>
    )
}

export default Routers