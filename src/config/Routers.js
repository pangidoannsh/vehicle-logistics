import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Main from '../layouts/Main'
import {
    Dashboard, Login, Marketing, FinanceAr, PlanArmada, NotFound,
    Armada, Revenue, Manifest, Cashier, Register, ManifestCreate, Bast
} from '../pages'

function Routers() {
    return (
        <Router>
            <Routes>
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/' element={<Main><Dashboard /></Main>} />
                <Route path='/armada' element={<Main><Armada /></Main>} />
                <Route path='/marketing' element={<Main><Marketing /></Main>} />
                <Route path='/financear' element={<Main><FinanceAr /></Main>} />
                <Route path='/revenue' element={<Main><Revenue /></Main>} />
                <Route path='/plan-armada' element={<Main><PlanArmada /></Main>} />
                <Route path='/manifest' element={<Main><Manifest /></Main>} />
                <Route path='/manifest/create' element={<Main><ManifestCreate /></Main>} />
                <Route path='/bast' element={<Main><Bast /></Main>} />
                <Route path='/cashier' element={<Main><Cashier /></Main>} />
                <Route path='*' element={<NotFound />} />
            </Routes>
        </Router>
    )
}

export default Routers