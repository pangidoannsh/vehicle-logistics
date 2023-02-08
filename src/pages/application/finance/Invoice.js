import { Icon } from '@iconify/react';
import React, { useEffect, useState } from 'react';
import ButtonCreate from '../../../components/ButtonCreate';
import SearchTable from '../../../components/tables/SearchTable';
import Table from '../../../components/tables/Table';
import { useFetch } from '../../../hooks';

const columnTable = [
    { field: 'oid', header: 'Invoice Number' },
    { field: 'bastdate', header: 'Invoice Date' },
    { field: 'origin', header: 'Origin' },
    { field: 'destination', header: 'Destination' },
    { field: 'oidmanifest', header: 'Manifest Number' },
    { field: 'moda', header: 'Moda' },
    { field: 'status', header: 'Status' },
]

const Invoice = () => {
    const [loading, setLoading] = useState(true);
    const [loadingCreate, setLoadingCreate] = useState(false);
    const [dataBody, setDataBody, fetchDataBody] = useFetch({
        url: "/invoice", setLoading
    });
    const [dataShow, setDataShow] = useState([]);

    const handleOpenModalCreate = e => {

    }
    useEffect(() => {
        setDataShow(dataBody)
    }, [dataBody]);
    return (
        <>
            {/* Content */}
            <div className="p-4">
                <div className="card shadow-lg bg-white p-6">
                    {/* Title */}
                    <div className="flex justify-between items-center divider-bottom">
                        <div className="flex px-2 py-4 gap-x-2 items-center">
                            <Icon icon="mdi:invoice" className="text-2xl text-gold" />
                            <span className="text-lg text-dark-green font-medium">Invoice</span>
                        </div>
                        <div>
                            <ButtonCreate onClick={handleOpenModalCreate} loading={loadingCreate} />
                        </div>
                    </div>
                    {/* Table */}
                    <Table dataBody={dataShow} column={columnTable} id="oid" loading={loading} clickField="oid" pagination>
                        {/* Search */}
                        <SearchTable setData={setDataShow} dataBody={dataBody} />
                    </Table>
                </div>
            </div>
        </>
    );
}

export default Invoice;
