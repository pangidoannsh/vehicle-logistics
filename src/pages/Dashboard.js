import Header from "../components/Header"
import Navbar from "../components/Navbar"

function Dashboard() {
    return (
        <div className="flex">
            <Navbar />
            <div className="flex-1 bg-body">
                <Header />
                <div className="p-4 grid grid-cols-4 gap-4">
                    {/* <h1 className="font-bold text-2xl">Dashboard</h1> */}
                    {/* <div className="col-span-1">
                        <div className="bg-dark-green h-44 rounded-md"></div>
                    </div>
                    <div className="col-span-1">
                        <div className="bg-dark-green h-44 rounded-md"></div>
                    </div>
                    <div className="col-span-1">
                        <div className="bg-dark-green h-44 rounded-md"></div>
                    </div>
                    <div className="col-span-1">
                        <div className="bg-dark-green h-44 rounded-md"></div>
                    </div>
                    <div className="col-span-3">
                        <div className="bg-dark-green h-56 rounded-md"></div>
                    </div> */}
                </div>
            </div>
        </div>
    )
}

export default Dashboard