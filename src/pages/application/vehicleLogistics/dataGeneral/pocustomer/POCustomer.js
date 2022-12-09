import { Icon } from '@iconify/react';
import React, { useState, useEffect, useCallback, useRef } from 'react';
import Alert from '../../../../../components/Alert';
import Loading from '../../../../../components/Loading';
import Modal from '../../../../../components/Modal';
import SearchTable from '../../../../../components/tables/SearchTable';
import Table from '../../../../../components/tables/Table';
import { api } from '../../../../../config';
import { moneyFormat, fetchOption } from '../../../../../utils';
import POCustomerCreate from './POCustomerCreate';
import POCustomerDetail from './POCustomerDetail';

const columnTable = [
    { field: "branch", header: "branch" },
    { field: "ponumber", header: "PO Number" },
    { field: "customer", header: "Customer" },
    { field: "contractno", header: "Contract No" },
    { field: "quantity", header: "Quantity" },
    { field: "value", header: "Total (Rp)" },
];
const clickFieldTable = "ponumber";

const dataDisplay = data => {
    const { oid, branch, ponumber, customer, contractno, quantity, value } = data;
    return {
        oid, branch, ponumber, customer, contractno, quantity, value: moneyFormat(value)
    }
}
const POCustomer = () => {

    const [loadingPage, setLoadingPage] = useState(false)
    const [loadingTable, setLoadingTable] = useState(true);
    // dataBody merupakan data asli yang didapatkan dari consume API dan tidak diganggu gugat
    const [dataBody, setDataBody] = useState([]);
    // dataShow berfungsi sebagai data yang akan ditampilkan pada table, dapat berubah seperti untuk searcing dll
    const [dataShow, setDataShow] = useState([]);
    // dataUnitPo berfungsi sebagai data yang akan ditampilkan ketika masuk ke modal detail pada bagian table vehicle unit
    const [dataUnitPo, setDataUnitPo] = useState([]);
    // untuk membuka dan menutup modal detail
    const [openModalDetail, setOpenModalDetail] = useState(false)
    // untuk membuka dan menutup modal Create
    const [openModalCreate, setOpenModalCreate] = useState(false)
    // untuk membuka dan menutup modal Edit
    const [openModalEdit, setOpenModalEdit] = useState(false)
    // untuk membuka dan menutup modal delete
    const [openModalDelete, setOpenModalDelete] = useState(false)
    // const [idToBeDelete, setIdToBeDelete] = useState("")
    const idToBeDelete = useRef("");
    const idToBeEdit = useRef("");
    // untuk data yang akan ditampilkan Modal -> ModalContent
    const [dataModalDetail, setDataModalDetail] = useState(null);//object
    // untuk menampung kondisi error network
    const [isErrorNetwork, setIsErrorNetwork] = useState(false);
    // untuk menampung kondisi berhasil
    const [isSuccessAlert, setIsSuccessAlert] = useState(false);
    // untuk menampung kondisi gagal
    const [isFailAlert, setIsFailAlert] = useState(false);
    // message alert
    const [msgAlert, setMsgAlert] = useState(['title', 'message'])

    // option branch untuk select pada create po customer
    const [optionsBranch, setOptionsBranch] = useState([]);
    const [optionsContract, setOptionsContract] = useState([]);
    const [optionsBrand, setOptionsBrand] = useState([]);

    const [dataEdit, setDataEdit] = useState({
        valuePoNumber: "",
        currentBranch: { oid: "", branchname: "" },
        currentContract: { oid: "", contractname: "" }
    })

    // untuk handle Open dari Modal PO Customer Detail
    const handleOpenModalDetail = useCallback(id => {
        api.get('/vehiclebrand').then(res => {
            setOptionsBrand(res.data.map(data => {
                return { oid: data.brand, name: data.brand };
            }))
        }).catch(error => {
            console.log(error.response);
            isFailAlert(true);
            setMsgAlert('error');
        })
        const fetchDataUnit = () => {
            api.get(`/vehiclepo/${id}`).then(res => {
                setDataUnitPo(res.data)
                setLoadingPage(false);
                setOpenModalDetail(true);
            }).catch(err => {
                setLoadingPage(false);
                setOpenModalDetail(true);
                console.log(err.message)
            })
        }
        if (dataModalDetail === null) {
            setDataModalDetail(dataBody.filter(data => data.oid === id).map(filter => filter)[0]);
            setLoadingPage(true);
            fetchDataUnit();
        } else {
            if (id !== dataModalDetail.oid) {
                setDataModalDetail(dataBody.filter(data => data.oid === id).map(filter => filter)[0]);
                setLoadingPage(true);
                fetchDataUnit();
            } else {
                setOpenModalDetail(true)
            }
        }
    }, [dataBody])
    const handleOpenModalCreate = e => {
        e.preventDefault()
        if (optionsBranch.length === 0) {
            fetchOption("/branchlist", setOptionsBranch);
        }
        if (optionsContract.length === 0) {
            fetchOption("/contractlist", setOptionsContract);
        }
        setOpenModalCreate(true)
    }

    const handleOpenModalEdit = oid => {
        setLoadingPage(true);
        setOpenModalEdit(true)
    }
    // function untuk menampilkan modal konfirmasi delete ketika mengklik action trash/delete pada table
    const handleOpenModalDelete = useCallback(oid => {
        idToBeDelete.current = oid
        setOpenModalDelete(true)
    }, []);

    // function untuk meng-handle ketika mengklik button delete pada modal konfirmasi delete
    const handleDelete = e => {
        e.preventDefault()
        setIsFailAlert(false);
        setLoadingPage(true);
        api.delete(`/pocustomer/${idToBeDelete.current}`)
            .then(response => {
                console.log(response.data);
                setMsgAlert(["Success", response.data])
                setDataBody(dataBody.filter(data => data.oid !== idToBeDelete.current).map(filter => filter))
                setIsSuccessAlert(true)
                setOpenModalDelete(false)
                setLoadingPage(false)
                setTimeout(() => {
                    setIsSuccessAlert(false);
                }, 3000);
            })
            .catch(error => {
                console.log(error.response);
                setLoadingPage(false)
                setIsFailAlert(true)
                setMsgAlert(["Failed", error.response.data])
            })
    }

    //function untuk fetch data PO Customer
    const fetchPoCustomer = () => {
        api.get('/pocustomer').then(res => {
            setDataBody(res.data)
            setLoadingTable(false)
        }).catch(error => {
            console.log(error);
            if (error.code === "ERR_NETWORK") {
                setIsErrorNetwork(true)
            }
        })
    }
    // use effect untuk consume API
    useEffect(() => {
        fetchPoCustomer()
    }, []);

    // pemberian isi dari data show
    useEffect(() => {
        setDataShow(dataBody.map(data => {
            return dataDisplay(data);
        }));
    }, [dataBody])

    // penonaktifan fail alert ketika modal create tertutup
    useEffect(() => {
        if (!openModalCreate) {
            setIsFailAlert(false)
        }
    }, [openModalCreate]);
    return (
        <>
            {/* After Header */}
            <div className="flex justify-end items-center px-4 py-3 divider-top bg-white">
                <button className={`bg-light-green hover:bg-green-700 text-white rounded flex
                                items-center gap-x-1 py-[2px] px-4 `} onClick={handleOpenModalCreate}>
                    <Icon icon="fluent:add-12-filled" className="text-base" />
                    <span className='text-base'>Create</span>
                </button>
            </div>

            {/* Content */}
            <div className="p-4">
                <div className="card bg-white p-6">
                    {/* Title */}
                    <div className="flex px-2 py-4 gap-x-2 items-center divider-bottom">
                        <Icon icon="bxs:purchase-tag" className={`text-2xl text-gold `} />
                        <span className='text-lg text-dark-green font-medium'>PO Customer</span>
                    </div>
                    {/* Search */}
                    <SearchTable setData={setDataShow} dataBody={dataBody} dataSkipSearch={0} customDisplay={dataDisplay} />
                    {/* Table */}
                    <Table dataBody={dataShow} column={columnTable} id="oid" loading={loadingTable}
                        handleActionDelete={handleOpenModalDelete} handleActionEdit={handleOpenModalEdit}
                        handleClickField={handleOpenModalDetail} clickField={clickFieldTable} />
                </div>
            </div>

            {/* Modal Detail */}
            <Modal isOpen={openModalDetail} setIsOpen={setOpenModalDetail} title={"PO Customer Detail"} iconTitle={"ooui:view-details-ltr"}>
                <POCustomerDetail data={dataModalDetail} dataUnitPo={dataUnitPo} setDataUnitPo={setDataUnitPo}
                    setSuccessCreate={setIsSuccessAlert} setFailCreate={setIsFailAlert} setMsgAlert={setMsgAlert}
                    setLoadingPage={setLoadingPage} optionsBrand={optionsBrand} />
            </Modal>

            {/* Modal Create */}
            <Modal isOpen={openModalCreate} setIsOpen={setOpenModalCreate} title={'New PO Customer'} size={700}>
                <POCustomerCreate setIsOpen={setOpenModalCreate} setSuccessCreate={setIsSuccessAlert} setFailCreate={setIsFailAlert}
                    setMsgAlert={setMsgAlert} fetchPoCustomer={fetchPoCustomer} options={{
                        branch: { optionsBranch, setOptionsBranch },
                        contract: { optionsContract, setOptionsContract }
                    }} setLoadingPage={setLoadingPage} />
            </Modal>

            {/* Modal Edit */}
            <Modal dataEdit={dataEdit} isOpen={openModalEdit} setIsOpen={setOpenModalEdit} title={'Edit PO Customer'} size={700}>
                {/* <MarketingEdit oid={idToBeEdit.current} setIsOpen={setOpenModalEdit} setLoadingPage={setLoadingPage} options={{
                    branch: { optionsBranch, setOptionsBranch },
                    contract: { optionsContract, setOptionsContract }
                }} setSuccessCreate={setIsSuccessAlert} setFailCreate={setIsFailAlert} setMsgAlert={setMsgAlert} /> */}
            </Modal>

            {/* Modal Delete */}
            <Modal isOpen={openModalDelete} setIsOpen={setOpenModalDelete} size={500}>
                <div className='text-slate-600 text-xl font-medium'>
                    Are you sure want to Delete Data with PO Number <span className='text-gold'>{
                        dataBody.filter(data => data.oid === idToBeDelete.current).map(filter => filter.ponumber)[0]
                    }</span> ?
                </div>
                <div className="flex justify-end mt-4">
                    <button type="Submit" className={`border border-red-600 text-red-600 rounded flex items-center gap-x-1 py-2 px-4 
                            focus:ring focus:ring-red-200 active:ring active:ring-red-200`} onClick={handleDelete}>
                        Delete
                    </button>
                </div>
            </Modal>
            {/* Notifikasi Error Ketika Tidak Ada Jaringan */}
            <Alert isOpen={isErrorNetwork} setIsOpen={setIsErrorNetwork} codeAlert={0} title="Error Network">
                Please Check Your Connection and Reload the Browser!
            </Alert>
            {/* Notifikasi Ketika Berhasil Create Data */}
            <Alert isOpen={isSuccessAlert} setIsOpen={setIsSuccessAlert} codeAlert={1} title={msgAlert[0]}>
                {msgAlert[1]}
            </Alert>
            {/* Notifikasi Ketika Gagal Create Data */}
            <Alert isOpen={isFailAlert} setIsOpen={setIsFailAlert} codeAlert={0} title={msgAlert[0]}>
                {msgAlert[1]}
            </Alert>
            <Loading isLoading={loadingPage} />
        </>
    )
}

export default POCustomer