import { Icon } from '@iconify/react'
import React, { useEffect, useState } from 'react'
import SearchTable from '../../../components/tables/SearchTable';
import Table from '../../../components/tables/Table';
import { api } from '../../../config';



const columnTable = [
    { field: "oid", header: "Branch ID" },
    { field: "branchname", header: "Branch Name" },
    { field: "branchaddress", header: "Address" },
    { field: "phoneno", header: "Phone Number" },
    { field: "email", header: "Email" },
];


const Branch = () => {
    const templateObject = data => {
        const { oid, branchname, branchaddress, phoneno, email } = data;
        return { oid, branchname, branchaddress, phoneno, email };
    }
    // const [loading, setLoading] = useState(true);
    const [loadingTable, setLoadingTable] = useState(true);
    const [dataShow, setDataShow] = useState([]);
    const [dataBody, setDataBody] = useState([]);
    const [isErrorNetwork, setIsErrorNetwork] = useState(false);


    // use effect untuk consume API
    useEffect(() => {
        api.get('/branch').then(res => {
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
                        <Icon icon="clarity:organization-solid" className={`text-xl text-gold `} />
                        <span className="text-lg text-dark-green font-medium">Branch</span>
                    </div>

                    {/* Search searchFunct={customSearch} */}
                    <SearchTable setData={setDataShow} dataBody={dataBody} />
                    {/* Table */}
                    <Table dataBody={dataShow} column={columnTable} id="oid" loading={loadingTable} />

                </div>
            </div>


        </>
    )
}


export default Branch