import { Icon } from '@iconify/react'
import React, { useEffect, useState } from 'react'
import SearchTable from '../../../components/tables/SearchTable';
import Table from '../../../components/tables/Table';
import { api } from '../../../config';



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
    const [dataBody, setDataBody] = useState([]);
    const [isErrorNetwork, setIsErrorNetwork] = useState(false);


    // use effect untuk consume API
    useEffect(() => {
        api.get('/customers').then(res => {
            setDataBody(res.data)
            setLoadingTable(false)
        }).catch(error => {
            console.log(error.response);
            if (error.code === "ERR_NETWORK") {
                setIsErrorNetwork(true)
            }
        })
    }, []);

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

                    {/* Search searchFunct={customSearch} */}
                    <SearchTable setData={setDataShow} dataBody={dataBody} />
                    {/* Table */}
                    <Table dataBody={dataShow} column={columnTable} id="branch" loading={loadingTable} />

                </div>
            </div>


        </>
    )
}


export default Customers