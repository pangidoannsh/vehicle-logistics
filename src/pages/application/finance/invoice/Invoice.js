import { Icon } from '@iconify/react';
import React, { useContext, useEffect, useState } from 'react';
import ButtonCreate from '../../../../components/ButtonCreate';
import Modal from '../../../../components/Modal';
import SearchTable from '../../../../components/tables/SearchTable';
import Table from '../../../../components/tables/Table';
import { api } from '../../../../config';
import { useFetch } from '../../../../hooks';
import { AlertContext } from '../../../../layouts/Main';
import { moneyFormat } from '../../../../utils';
import InvoiceCreate from './InvoiceCreate';
import InvoiceDetail from './InvoiceDetail';
import Loading from '../../../../components/Loading';
import InvoiceEdit from './InvoiceEdit';
import { BASE_URL } from '../../../../config/Api';

const columnTable = [
    { field: 'invoicenumber', header: 'Invoice Number' },
    { field: 'invoicedate', header: 'Invoice Date' },
    { field: 'ponumber', header: 'PO Number' },
    { field: 'shipmentdate', header: 'Shipped Date' },
    // { field: 'salestax', header: 'Sales Tax(Rp)' },
    { field: 'duedate', header: 'Due Date' },
    { field: 'quantity', header: 'QTY' },
    // { field: 'linetotal', header: 'Line Total(Rp)' },
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
    const [alert, setAlert] = useContext(AlertContext);

    const [loadingPage, setLoadingPage] = useState(false);
    const [loading, setLoading] = useState(true);
    const [loadingCreate, setLoadingCreate] = useState(false);
    const [dataBody, setDataBody, fetchDataBody] = useFetch({
        url: "/invoice", setLoading
    });
    const [optionsPO, setOptionsPO] = useState([]);


    const [openModalDetail, setOpenModalDetail] = useState(false);
    const [openModalCreate, setOpenModalCreate] = useState(false);
    const [openModalEdit, setOpenModalEdit] = useState(false);
    const [dataShow, setDataShow] = useState([]);
    const [dataDetail, setDataDetail] = useState({});
    const [dataEdit, setDataEdit] = useState({});
    const [dataUnitInvoice, setDataUnitInvoice] = useState([]);

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
    function handleOpenDetail(invoicenumber) {
        setLoadingPage(true)
        setDataDetail(dataBody.find(data => data.invoicenumber === invoicenumber));
        api.get(`/invoicedetail/${invoicenumber}`).then(res => {
            setDataUnitInvoice(res.data)
            setOpenModalDetail(true);
        }).catch(err => {
            console.log(err.response);
        }).finally(() => setLoadingPage(false))
    }

    function handleOpenModalEdit(invoicenumber) {
        setDataEdit(dataBody.find(data => data.invoicenumber === invoicenumber));
        setOpenModalEdit(true);
    }

    const handleDownload = (oid) => {
        console.log(oid);
        api.get('/invoice/download/' + oid, { responseType: 'blob' }).then(response => {
            console.log(response);
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `Invoice_${oid}.pdf`);
            document.body.appendChild(link);
            link.click();
            link.remove();
            setAlert({
                isActived: true,
                code: 1,
                title: `Success`,
                message: 'Download Invoice done'
            })
        }).catch(err => {
            setAlert({
                isActived: true,
                code: 0,
                title: `Error`,
                message: 'Failed to download Invoice'
            })
            console.log(err);
        }).finally(() => setTimeout(() => setAlert(prev => ({ ...prev, isActived: false })), 2000))
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
                    <Table dataBody={dataShow} column={columnTable} id="invoicenumber" loading={loading} clickField="invoicenumber"
                        pagination center={["quantity"]} handleClickField={handleOpenDetail} handleActionEdit={handleOpenModalEdit}
                        handleActionDownload={handleDownload}>
                        {/* Search */}
                        <SearchTable setData={setDataShow} dataBody={dataBody} />
                    </Table>
                </div>
            </div>
            <Modal isOpen={openModalDetail} setIsOpen={setOpenModalDetail} title="Invoice Detail">
                <InvoiceDetail dataDetail={dataDetail} dataUnitInvoice={dataUnitInvoice} />
            </Modal>
            {/* Modal Create */}
            <Modal isOpen={openModalCreate} setIsOpen={setOpenModalCreate} title="Create Inovice" >
                <InvoiceCreate optionsPO={optionsPO} setIsOpen={setOpenModalCreate} reFetch={fetchDataBody} />
            </Modal>
            {/* Modal Edit */}
            <Modal isOpen={openModalEdit} setIsOpen={setOpenModalEdit} title="Edit Inovice" size={1200}>
                <InvoiceEdit setIsOpen={setOpenModalEdit} dataCurent={dataEdit} setAlert={setAlert} setDataInvoice={setDataBody} />
            </Modal>

            <Loading isLoading={loadingPage} />

        </>
    );
}

export default Invoice;
