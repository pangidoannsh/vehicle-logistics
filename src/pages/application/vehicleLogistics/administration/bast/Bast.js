import { Icon } from '@iconify/react'
import React, { useState, useMemo } from 'react'
import SearchTable from '../../../../../components/tables/SearchTable'
import Table from '../../../../../components/tables/Table'

const columnTable = [
    { field: 'oid', header: 'BAST Number' },
    { field: 'bastdate', header: 'BAST Date' },
    { field: 'origin', header: 'Origin' },
    { field: 'destination', header: 'Destination' },
    { field: 'manifestnumber', header: 'Manifest Number' },
    { field: 'moda', header: 'Moda' },
    { field: 'status', header: 'Status' },
]

const Bast = () => {
    const [loading, setLoading] = useState(true);
    const [dataBody, setDataBody] = useState([]);
    const [dataShow, setDataShow] = useState([]);

    return (
        <>
            {/* After Header */}
            <div className="flex justify-end items-center px-4 py-3 divider-top bg-white">
                <button
                    className={`bg-light-green hover:bg-green-700 text-white rounded flex
                                items-center gap-x-1 py-[2px] px-4 `}

                >
                    <Icon icon="fluent:add-12-filled" className="text-base" />
                    <span className="text-base">Create</span>
                </button>
            </div>
            {/* Content */}
            <div className="p-4">
                <div className="card drop-shadow-lg bg-white px-4 pb-4 pt-2">
                    {/* Title */}
                    <div className="flex px-2 py-4 gap-x-2 items-center divider-bottom">
                        <Icon icon="fa-solid:truck" className={`text-xl text-gold `} />
                        <span className="text-lg text-dark-green font-medium">BAST</span>
                    </div>
                    {/* Search searchFunct={customSearch} */}
                    <SearchTable setData={setDataShow} dataBody={dataBody} />
                    {/* Table */}
                    <Table dataBody={dataShow} column={columnTable} id="policenumber" loading={loading} />
                </div>
            </div>
        </>
    )
}

export default Bast