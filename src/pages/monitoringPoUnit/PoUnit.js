import { Icon } from '@iconify/react';
import React, { useState } from 'react';
import { useEffect } from 'react';
import SearchTable from '../../components/tables/SearchTable';
import Table from '../../components/tables/Table';
import { api } from '../../config/Api';
import { moneyFormat } from '../../utils'

const columnTable = [
    { field: 'customer', header: 'Customer' },
    { field: 'enginenumber', header: 'Engine Number' },
    { field: 'framenumber', header: 'Frame Number' },
    { field: 'unitbrand', header: 'Brand' },
    { field: 'type', header: 'Type' },
    { field: 'color', header: 'Color' },
    { field: 'amount', header: 'Amount (Rp)' },
    { field: 'status', header: 'Status' }
];
const displayData = data => {
    return {
        ...data, amount: moneyFormat(data.amount),
        status: data.status.toLowerCase() === 'po' ? (
            <div className="flex gap-x-1 py-1 px-2 items-center bg-light-green rounded-sm text-white justify-center">
                <span className="text-sm capitalize">{data.status}</span>
            </div>
        ) : data.status.toLowerCase() === 'manifest' ? (
            <div className="flex gap-x-1 py-1 px-2 items-center bg-custom-blue rounded-sm text-white justify-center">
                <span className="text-sm capitalize">{data.status}</span>
            </div>
        ) : data.status.toLowerCase() === 'closed' ? (
            <div className="flex gap-x-1 py-1 px-2 items-center bg-[#A90101] rounded-sm text-white justify-center">
                <span className="text-sm capitalize">{data.status}</span>
            </div>
        ) : data.status
    };
}
const PoUnit = () => {
    const [loadingTable, setLoadingTable] = useState(true);
    const [dataBody, setDataBody] = useState([]);
    const [dataShow, setDataShow] = useState([]);

    useEffect(() => {
        api.get('vehiclepo').then(res => {
            setDataBody(res.data);
            setDataShow(res.data.map(data => {
                return displayData(data);
            }))
        }).catch(err => {
            console.log("error");
        }).finally(() => setLoadingTable(false))
    }, []);
    return (
        <>
            {/* Content */}
            <div className="p-4">
                <div className="card bg-white p-6">
                    {/* Title */}
                    <div className="flex justify-between items-center divider-bottom">
                        <div className="flex px-2 py-4 gap-x-2 items-center ">
                            <Icon icon="fa6-solid:car-side" className={`text-2xl text-gold `} />
                            <span className='text-lg text-dark-green font-medium'>PO Unit</span>
                        </div>
                    </div>
                    {/* Table */}
                    <Table dataBody={dataShow} column={columnTable} id="oid" loading={loadingTable} pagination>
                        {/* Search searchFunct={customSearch} */}
                        <SearchTable setData={setDataShow} dataBody={dataBody} customDisplay={displayData} />
                    </Table>
                </div>
            </div>
        </>
    );
}

export default PoUnit;
