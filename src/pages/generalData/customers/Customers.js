import { Icon } from '@iconify/react'
import React, { useEffect, useState } from 'react'
import Alert from '../../../components/Alert';
import ErrorNetwork from '../../../components/ErrorNetwork';
import SearchTable from '../../../components/tables/SearchTable';
import Table from '../../../components/tables/Table';
import { api } from '../../../config';
import { useFetch } from '../../../hooks';



const columnTable = [
    { field: "branch", header: "Branch" },
    { field: "customername", header: "Name" },
    { field: "npwp", header: "NPWP" },
    { field: "email", header: "Email" },
    { field: "address", header: "Address" },
    { field: "pic", header: "PIC" },
    { field: "phone", header: "Phone " }
];

const templateObject = data => {
    const { branch, customername, npwp, email, address, pic, phone } = data;
    return { branch, customername, npwp, email, address, pic, phone };
}
const Customers = () => {
    // const [loading, setLoading] = useState(true);
    const [loadingTable, setLoadingTable] = useState(true);
    const [dataShow, setDataShow] = useState([]);
    const [dataBody, setDataBody, fetchDataBody, isErrorNetwork, setIsErrorNetwork] = useFetch({
        url: '/customers', setLoading: setLoadingTable
    })

    // memberikan nilai ke datashow dari data bodi(api)
    useEffect(() => {
        setDataShow(dataBody.map(data => {
            return templateObject(data);
        }));
    }, [dataBody])

    return (
        <>
            {/* Content */}
            <div className="p-4">
                <div className="card bg-white p-6">
                    {/* Title */}
                    <div className="flex px-2 py-4 gap-x-2 items-center divider-bottom">
                        <Icon icon="fluent:people-team-20-filled" className={`text-xl text-gold `} />
                        <span className="text-lg text-dark-green font-medium">Customers</span>
                    </div>

                    {/* Table */}
                    <Table dataBody={dataShow} column={columnTable} id="branch" loading={loadingTable} pagination>
                        {/* Search searchFunct={customSearch} */}
                        <SearchTable setData={setDataShow} dataBody={dataBody} />
                    </Table>
                </div>
            </div>
            {/* Notifikasi Error Ketika Tidak Ada Jaringan */}
            <ErrorNetwork isOpen={isErrorNetwork} setIsOpen={setIsErrorNetwork} />
        </>
    )
}


export default Customers