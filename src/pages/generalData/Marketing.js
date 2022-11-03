import { Icon } from '@iconify/react'
import { useEffect, useState } from 'react'
import Header from '../../components/Header'
import Navbar from '../../components/Navbar'
import Table from '../../components/tables/Table'
import axios from 'axios'
import SearchTable from '../../components/tables/SearchTable'

const Marketing = () => {
    const [loading, setLoading] = useState(true);
    // dataBody meruoakan data asli yang didapatkan dari consume API dan tidak diganggu gugat
    const [dataBody, setDataBody] = useState([]);
    // dataShow berfungsi sebagai data yang akan ditampilkan pada table, dapat berubah seperti untuk searcing dll
    const [dataShow, setDataShow] = useState([]);

    // data untuk table head
    const headTable = [
        "Branch", "PO Number", "Customers", "Contract No", "Contract Name", "Contract Type", "Value"
    ]

    // penentuan id dari data yang ada di table
    const data_id = 'po_number'

    // consume API
    const fetchData = async () => {
        const res = await axios.get('http://localhost:3001/pocustomer')
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
                                <Icon icon="fluent-mdl2:market" className={`text-2xl text-gold `} />
                                <span className='text-lg text-dark-green font-medium'>PO Customer</span>
                            </div>
                            {/* Search */}
                            <SearchTable setData={setDataShow} dataBody={dataBody} />
                            {/* Table */}
                            <Table dataBody={dataShow} dataHead={headTable} id={data_id}
                                loading={loading} handleClick={handleClick} actionInData={1}
                            />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}


export default Marketing