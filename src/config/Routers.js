import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Dashboard, Login, Marketing, FinanceAr, PlanArmada, NotFound, MasterData, Revenue } from '../pages'

function Routers() {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Dashboard />} />
                <Route path='/login' element={<Login />} />
                <Route path='/master-data' element={<MasterData />} />
                <Route path='/marketing' element={<Marketing />} />
                <Route path='/financear' element={<FinanceAr />} />
                <Route path='/revenue' element={<Revenue />} />
                <Route path='/plan-armada' element={<PlanArmada />} />
                <Route path='*' element={<NotFound />} />
            </Routes>
        </Router>
    )
}

export default Routers