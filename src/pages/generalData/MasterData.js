import { Icon } from '@iconify/react'
import { data } from 'autoprefixer';
import axios from 'axios';
import { useEffect, useState } from 'react'
import Header from '../../components/Header'
import Navbar from '../../components/Navbar'
import SearchTable from '../../components/tables/SearchTable';
import Table from '../../components/tables/Table';

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
    const customSearch = (e) => {
        setDataShow(
            dataBody.filter(dataRow => {
                return Object.values(dataRow).findIndex((dataCell, index) => {
                    if (index < 6) return dataCell.toLowerCase().includes(e.target.value.toLowerCase())
                    else if (index === 6) return dataCell.props.children.toLowerCase().includes(e.target.value.toLowerCase())
                    else if (index === 7) return dataCell.props.children[1].props.children.toLowerCase().includes(e.target.value.toLowerCase())
                }) !== -1
            }
            ).map(filter => { return filter })
        )
    }

    // use effect untuk menjalankan function consume API
    useEffect(() => {
        fetchData().catch((error) => console.log(error))
    }, []);

    // pemberian isi dari data show
    useEffect(() => {
        // Perubahan isi dari Type dan Status karena Type dan Status memiliki Style nya sendiri
        dataBody.forEach(data => {
            if (data.status === 'ready') {
                data.status = (
                    <div className='flex gap-x-1 py-1 px-2 items-center bg-light-green rounded-sm text-white justify-center'>
                        <Icon icon="akar-icons:check" className='text-base' />
                        <span className='text-sm capitalize'>{data.status}</span>
                    </div>
                )
            } else if (data.status === 'repair') {
                data.status = (
                    <div className='flex gap-x-1 py-1 px-2 items-center bg-[#A90101] rounded-sm text-white justify-center'>
                        <Icon icon="fa6-solid:gears" className='text-base' />
                        <span className='text-sm capitalize'>{data.status}</span>
                    </div>
                )
            }

            if (data.type === 'asset') {
                data.type = (
                    <span className='text-light-green capitalize'>
                        {data.type}
                    </span>
                )
            }
            else if (data.type === 'vendor') {
                data.type = (
                    <span className='text-[#015796] capitalize'>
                        {data.type}
                    </span>
                )
            }
        })
        // End Function

        setDataShow(dataBody)
    }, [dataBody]);

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
                            {/* Search searchFunct={customSearch} */}
                            <SearchTable setData={setDataShow} dataBody={dataBody} searchFunct={customSearch} />
                            {/* Table */}
                            <Table dataBody={dataShow} dataHead={headTable} id={data_id} loading={loading} handleClick={handleClick} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
