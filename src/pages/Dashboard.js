import Header from "../components/Header"
import Navbar from "../components/Navbar"

function Dashboard() {
    return (
        <div className="flex">
            <Navbar />
            <div className="flex-1 bg-body">
                <Header />
                <div className="p-4 grid grid-cols-4 gap-4">
                </div>
            </div>
        </div>
    )
}

export default Dashboard