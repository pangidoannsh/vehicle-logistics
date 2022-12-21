import { Icon } from '@iconify/react'
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import ErrorNetwork from '../../../../../components/ErrorNetwork'
import SearchTable from '../../../../../components/tables/SearchTable'
import Table from '../../../../../components/tables/Table'
import { useFetch } from '../../../../../hooks'

const columnTable = [
    { field: 'oid', header: 'BAST Number' },
    { field: 'bastdate', header: 'BAST Date' },
    { field: 'origin', header: 'Origin' },
    { field: 'destination', header: 'Destination' },
    { field: 'oidmanifest', header: 'Manifest Number' },
    { field: 'moda', header: 'Moda' },
    { field: 'status', header: 'Status' },
]
const howDataGet = data => {
    return { ...data, bastdate: data.bastdate.split(" ")[0] };
}
const dataDisplay = data => {
    return {
        ...data,
        status: data.status.toLowerCase() === 'create' ? (
            <div className="flex gap-x-1 py-1 items-center bg-light-green rounded-sm text-white justify-center">
                {/* <Icon icon="akar-icons:check" className="text-base" /> */}
                <span className="text-sm capitalize">{data.status}</span>
            </div>
        ) : data.status.toLowerCase() === 'bast' ? (
            <div className="flex gap-x-1 py-1 items-center bg-[#0092E4] rounded-sm text-white justify-center">
                {/* <Icon icon="bi:stack" className="text-base" /> */}
                <span className="text-sm capitalize">{data.status}</span>
            </div>
        ) : data.status.toLowerCase() === 'closed' ? (
            <div className="flex gap-x-1 py-1 items-center bg-[#A90101] rounded-sm text-white justify-center">
                {/* <Icon icon="eos-icons:init-container" className="text-base" /> */}
                <span className="text-sm capitalize">{data.status}</span>
            </div>
        ) : data.status
    }
}
const Bast = () => {
    const [loading, setLoading] = useState(true);
    const [dataBody, setDataBody, fetchData, isErrorNetwork, setIsErrorNetwork] = useFetch({
        url: "/beritaacara", setLoading, howDataGet
    })
    const [dataShow, setDataShow] = useState([]);

    const handleOpenModalDetail = oid => {
        console.log(oid);
    }
    useEffect(() => {
        setDataShow(dataBody.map(data => {
            return dataDisplay(data);
        }));

    }, [dataBody]);
    return (
        <>
            {/* Content */}
            <div className="p-4">
                <div className="card drop-shadow-lg bg-white p-6">
                    {/* Title */}
                    <div className="flex justify-between items-center divider-bottom">
                        <div className="flex px-2 py-4 gap-x-2 items-center">
                            <Icon icon="fa-solid:truck-loading" className={`text-xl text-gold `} />
                            <span className="text-lg text-dark-green font-medium">B.A.S.T Create</span>
                        </div>
                        <div>
                            <NavLink to="/bast/create" className="bg-light-green hover:bg-green-700
                             text-white rounded flex 
                                items-center gap-x-1 py-[2px] px-4" >
                                <Icon icon="fluent:add-12-filled" className="text-base" />
                                <span className='text-base'>Create</span>
                            </NavLink>
                        </div>
                    </div>
                    {/* Table */}
                    <Table dataBody={dataShow} column={columnTable} id="oid" loading={loading} clickField="oid"
                        handleClickField={handleOpenModalDetail} pagination>
                        {/* Search */}
                        <SearchTable setData={setDataShow} dataBody={dataBody} />
                    </Table>
                </div>
            </div>
            {/* Notifikasi Error Ketika Tidak Ada Jaringan */}
            <ErrorNetwork isOpen={isErrorNetwork} setIsOpen={setIsErrorNetwork} />
        </>
    )
}

export default Bast