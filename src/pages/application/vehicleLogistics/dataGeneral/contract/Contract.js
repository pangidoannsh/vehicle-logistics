import { Icon, _api } from '@iconify/react'
import React, { useEffect, useState } from 'react'
import SearchTable from '../../../../../components/tables/SearchTable'
import Table from '../../../../../components/tables/Table'
import { api } from '../../../../../config/Api'
import { moneyFormat } from '../../../../../utils'
import Alert from "../../../../../components/Alert"

const columnTable = [
    { field: "branch", header: "Branch" },
    { field: "contractdate", header: "Date" },
    { field: "contractno", header: "Contract No" },
    { field: "contractname", header: "Contract Name" },
    { field: "contractvalue", header: "Value" },
    { field: "customer", header: "Customer" }
];

const Contract = () => {
    const templateObject = data => {
        const { oid, branch, contractdate, contractno, contractname, contractvalue, customer } = data;
        return { oid, branch, contractdate, contractno, contractname, contractvalue: moneyFormat(contractvalue), customer };
    }
    // const [loading, setLoading] = useState(true);
    const [loadingTable, setLoadingTable] = useState(true);
    const [dataShow, setDataShow] = useState([]);
    const [dataBody, setDataBody] = useState([]);
    const [isErrorNetwork, setIsErrorNetwork] = useState(false);

    // use effect untuk consume API
    useEffect(() => {
        api.get('/contract').then(res => {
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
                        <Icon icon="clarity:contract-solid" className={`text-xl text-gold `} />
                        <span className="text-lg text-dark-green font-medium">Contract</span>
                    </div>
                    {/* Search */}
                    <SearchTable setData={setDataShow} dataBody={dataBody} customDisplay={templateObject} />
                    {/* Table */}
                    <Table dataBody={dataShow} column={columnTable} id="oid" loading={loadingTable} />
                </div>
                {/* Error Network */}
                <Alert isOpen={isErrorNetwork} setIsOpen={setIsErrorNetwork} title="Network Error" codeAlert={0}>
                    Please check your connection and reload browser
                </Alert>
            </div>
        </>
    )
}

export default Contract