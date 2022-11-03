import { Icon } from '@iconify/react'
import axios from 'axios';
import { useEffect, useState } from 'react'
import Header from '../../components/Header'
import Navbar from '../../components/Navbar'
import SearchTable from '../../components/tables/SearchTable';
import TableMasterData from '../../components/tables/TableMasterData'

export default function MasterData() {
    const [loading, setLoading] = useState(true);
    const [dataBody, setDataBody] = useState([]);
    const [dataShow, setDataShow] = useState([]);

    const headTable = [
        "Branch", "Model Name", "Unit Type", "HUll Number", "Frame Number", "Plat Number", "Type", "Status"
    ]

    const data_id = 'plat_number';

    // / consume API
    const fetchData = async () => {
        const res = await axios.get('http://localhost:3001/masterdata')
        setDataBody(res.data)
        setLoading(false)
    }

    const handleClick = e => {
        console.log(e.target.name);
    }

    // use effect untuk menjalankan function consume API
    useEffect(() => {
        fetchData().catch((error) => console.log(error))
    }, []);

    // pemberian isi dari data show
    useEffect(() => {
        setDataShow(dataBody)
    }, [dataBody])

    return (
        <div className='container'>
            <Navbar />
            <div className="flex-1">
                <Header />
                <div className="content">
                    {/* After Header */}
                    <div className="flex justify-end items-center px-4 py-3 divider-top bg-white">
                        <button className={`bg-light-green hover:bg-green-700 text-white rounded flex
                                items-center gap-x-1 py-[2px] px-4 `}>
                            <Icon icon="fluent:add-12-filled" className="text-base" />
                            <span className='text-base'>Create</span>
                        </button>
                    </div>

                    {/* Content */}
                    <div className="p-4 pb-14">
                        <div className="card bg-white px-4 pb-4 pt-2">
                            {/* Title */}
                            <div className="flex px-2 py-4 gap-x-2 items-center divider-bottom">
                                <Icon icon="bxs:folder-open" className={`text-2xl text-gold `} />
                                <span className='text-lg text-dark-green font-medium'>Master Data</span>
                            </div>
                            {/* Search */}
                            <SearchTable setData={setDataShow} dataBody={dataBody} />
                            {/* Table */}
                            <TableMasterData dataBody={dataShow} dataHead={headTable} id={data_id} loading={loading} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
