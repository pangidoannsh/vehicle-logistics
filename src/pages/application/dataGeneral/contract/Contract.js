import { Icon, _api } from '@iconify/react'
import React, { useEffect, useState } from 'react'
import ErrorNetwork from '../../../../components/ErrorNetwork'
import SearchTable from '../../../../components/tables/SearchTable'
import Table from '../../../../components/tables/Table'
import { api } from '../../../../config/Api'
import { useFetch } from '../../../../hooks'
import { moneyFormat } from '../../../../utils'

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
    const [dataBody, setDataBody, fetchDataBody, isErrorNetwork, setIsErrorNetwork] = useFetch({
        url: '/contract',
        setLoading: setLoadingTable
    });

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
                    {/* Table */}
                    <Table dataBody={dataShow} column={columnTable} id="oid" loading={loadingTable} pagination>
                        {/* Search */}
                        <SearchTable setData={setDataShow} dataBody={dataBody} customDisplay={templateObject} />
                    </Table>
                </div>
            </div>
            {/* Error Network */}
            <ErrorNetwork isOpen={isErrorNetwork} setIsOpen={setIsErrorNetwork} />
        </>
    )
}

export default Contract