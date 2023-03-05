import { Icon } from '@iconify/react';
import React, { useEffect, useState } from 'react';
import ButtonCreate from '../../../../components/ButtonCreate';
import Modal from '../../../../components/Modal';
import SearchTable from '../../../../components/tables/SearchTable';
import Table from '../../../../components/tables/Table';
import { useFetch } from '../../../../hooks';
import InvoiceCreate from './InvoiceCreate';

const columnTable = [
    { field: 'oid', header: 'Invoice Number' },
    { field: 'invoicedate', header: 'Invoice Date' },
    { field: 'ponumber', header: 'PO Number' },
    { field: 'shippeddate', header: 'Shipped Date' },
    { field: 'top', header: 'TOP' },
    { field: 'duedate', header: 'Due Date' },
    { field: 'quantity', header: 'QTY' },
    // { field: 'price', header: 'Price' },
    { field: 'linetotal', header: 'Line Total' },
    { field: 'total', header: 'Total' },
]

const Invoice = () => {
    const [loading, setLoading] = useState(true);
    const [loadingCreate, setLoadingCreate] = useState(false);
    const [dataBody, setDataBody, fetchDataBody] = useFetch({
        url: "/invoice", setLoading
    });
    const [optionsPO, setOptionsPO] = useState([]);

    const [openModalCreate, setOpenModalCreate] = useState(false);
    const [dataShow, setDataShow] = useState([]);

    const handleOpenModalCreate = e => {
        setOpenModalCreate(true)
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
            {/* Modal Create */}
            <Modal isOpen={openModalCreate} setIsOpen={setOpenModalCreate} title="Create Inovice">
                <InvoiceCreate optionsPO={optionsPO} />
            </Modal>
        </>
    );
}

export default Invoice;
