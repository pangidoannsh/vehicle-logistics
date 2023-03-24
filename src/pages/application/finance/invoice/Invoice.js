import { Icon } from '@iconify/react';
import React, { useEffect, useState } from 'react';
import ButtonCreate from '../../../../components/ButtonCreate';
import Modal from '../../../../components/Modal';
import SearchTable from '../../../../components/tables/SearchTable';
import Table from '../../../../components/tables/Table';
import { api } from '../../../../config';
import { useFetch } from '../../../../hooks';
import { moneyFormat } from '../../../../utils';
import InvoiceCreate from './InvoiceCreate';

const columnTable = [
    { field: 'invoicenumber', header: 'Invoice Number' },
    { field: 'invoicedate', header: 'Invoice Date' },
    { field: 'ponumber', header: 'PO Number' },
    { field: 'shipmentdate', header: 'Shipped Date' },
    { field: 'salestax', header: 'Sales Tax(Rp)' },
    { field: 'duedate', header: 'Due Date' },
    { field: 'quantity', header: 'QTY' },
    // { field: 'price', header: 'Price' },
    { field: 'linetotal', header: 'Line Total(Rp)' },
    { field: 'total', header: 'Total(Rp)' },
]
const displayInvoice = data => {
    let shipmentdate = data.shipmentdate?.split(" ")[0].split("-").reverse();
    shipmentdate = `${shipmentdate[0]}/${shipmentdate[1]}/${shipmentdate[2]}`;

    let duedate = data.duedate?.split(" ")[0].split("-").reverse();
    duedate = `${duedate[0]}/${duedate[1]}/${duedate[2]}`;

    let invoicedate = data.invoicedate?.split(" ")[0].split("-").reverse();
    invoicedate = `${invoicedate[0]}/${invoicedate[1]}/${invoicedate[2]}`;

    return {
        ...data,
        salestax: moneyFormat(data.salestax),
        linetotal: moneyFormat(data.linetotal),
        total: moneyFormat(data.total),
        shipmentdate,
        duedate,
        invoicedate
    }
}
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
        setLoadingCreate(true);
        api.get("/pocustomerlist?filter=unloading").then(res => {
            setOptionsPO(res.data.map(data => {
                return {
                    oid: data.oid,
                    pocustomer: (<div className='grid grid-cols-3 uppercase'>
                        <span>{data.oid}</span>
                        <span className='text-center'>{data.ponumber}</span>
                    </div>)
                }
            }));
            setOpenModalCreate(true)
        }).catch(err => {

        }).finally(() => setLoadingCreate(false))
    }
    useEffect(() => {
        setDataShow(dataBody.map(data => {
            return displayInvoice(data);
        }));
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
                    <Table dataBody={dataShow} column={columnTable} id="oid" loading={loading} clickField="oid" pagination
                        center={["quantity"]}>
                        {/* Search */}
                        <SearchTable setData={setDataShow} dataBody={dataBody} />
                    </Table>
                </div>
            </div>
            {/* Modal Create */}
            <Modal isOpen={openModalCreate} setIsOpen={setOpenModalCreate} title="Create Inovice" >
                <InvoiceCreate optionsPO={optionsPO} setIsOpen={setOpenModalCreate} reFetch={fetchDataBody} />
            </Modal>
        </>
    );
}

export default Invoice;
