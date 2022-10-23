import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Dashboard, Login, Marketing, FinanceAr, PlanArmada, NotFound } from '../pages'

function Routers() {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Dashboard />} />
                <Route path='/login' element={<Login />} />
                <Route path='/marketing' element={<Marketing />} />
                <Route path='/financear' element={<FinanceAr />} />
                <Route path='/plan-armada' element={<PlanArmada />} />
                <Route path='*' element={<NotFound />} />
            </Routes>
        </Router>
    )
}

export default Routers