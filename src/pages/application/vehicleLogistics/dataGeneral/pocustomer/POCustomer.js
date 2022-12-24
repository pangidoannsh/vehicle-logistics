import { Icon } from '@iconify/react';
import React, { useState, useEffect, useCallback, useRef, useContext } from 'react';
import Alert from '../../../../../components/Alert';
import Loading from '../../../../../components/Loading';
import Modal from '../../../../../components/Modal';
import SearchTable from '../../../../../components/tables/SearchTable';
import Table from '../../../../../components/tables/Table';
import { api } from '../../../../../config';
import { moneyFormat, fetchOption } from '../../../../../utils';
import POCustomerCreate from './POCustomerCreate';
import POCustomerDetail from './POCustomerDetail';
import { useFetch } from '../../../../../hooks'
import ErrorNetwork from '../../../../../components/ErrorNetwork';
import { UserContext } from '../../../../../config/User';
import POCustomerEdit from './POCustomerEdit';
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

    const [user] = useContext(UserContext);

    const [loadingPage, setLoadingPage] = useState(false)
    const [loadingTable, setLoadingTable] = useState(true);
    // dataBody merupakan data asli yang didapatkan dari consume API dan tidak diganggu gugat
    const [dataBody, setDataBody, fetchDataBody, isErrorNetwork, setIsErrorNetwork] = useFetch({
        url: '/pocustomer', setLoading: setLoadingTable
    });

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

    const [alert, setAlert] = useState({
        isActive: false,
        code: 0,
        title: "title",
        message: "message"
    })
    const setIsActiveAlert = isActive => setAlert({ ...alert, isActive });

    // option branch untuk select pada create po customer
    const [optionsBranch, setOptionsBranch] = useState([]);
    const [optionsContract, setOptionsContract] = useState([]);
    const [optionsBrand, setOptionsBrand] = useState([]);

    const [editPoNumber, setEditPoNumber] = useState("");
    const [editBranch, setEditBranch] = useState({ oid: null, branchname: "nothing selected" });
    const [editContract, setEditContract] = useState({ oid: null, contractname: "nothing selected" });

    const handleOpenModalDetail = useCallback(id => {
        api.get('/vehiclebrand').then(res => {
            setOptionsBrand(res.data.map(data => {
                return { oid: data.brand, name: data.brand };
            }))
        }).catch(error => {
            console.log(error.response);
            setAlert({
                isActive: true,
                code: 0,
                title: `Error ${error.response.status}`,
                message: "Cant Connect to Server"
            })
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
        if (optionsContract.length === 0) {
            fetchOption("/contractlist", setOptionsContract);
        }
        setOpenModalCreate(true)
    }

    const handleOpenModalEdit = oid => {
        setLoadingPage(true);
        idToBeEdit.current = oid;
        try {
            api.get(`/pocustomer/${oid}`).then(res => {
                // setDataEdit(res)
                // console.log(res.data);
                const data = res.data;
                setEditPoNumber(data.ponumber);
                setEditBranch({ oid: data.branchoid, branchname: data.branchname });
                setEditContract({ oid: data.contractoid, contractname: data.contractname });
            })
        } catch (error) {

            console.log(error);
        } finally {
            setLoadingPage(false)
            setOpenModalEdit(true)
        }
    }
    // function untuk menampilkan modal konfirmasi delete ketika mengklik action trash/delete pada table
    const handleOpenModalDelete = useCallback(oid => {
        idToBeDelete.current = oid
        setOpenModalDelete(true)
    }, []);

    // function untuk meng-handle ketika mengklik button delete pada modal konfirmasi delete
    const handleDelete = e => {
        e.preventDefault()
        setIsActiveAlert(false)
        setLoadingPage(true);
        api.delete(`/pocustomer/${idToBeDelete.current}`)
            .then(response => {
                setAlert({
                    isActive: true,
                    code: 1,
                    title: "Success",
                    message: "Data PO Customer Deleted"
                })
                setDataBody(dataBody.filter(data => data.oid !== idToBeDelete.current).map(filter => filter))
                setOpenModalDelete(false)
                setLoadingPage(false)
                setTimeout(() => {
                    setIsActiveAlert(false)
                }, 3000);
            })
            .catch(error => {
                console.log(error.response);
                setLoadingPage(false);
                setAlert({
                    isActive: true,
                    code: 0,
                    title: "Failed",
                    message: "Something Wrong Check Console Or Reload"
                })
            })
    }

    // pemberian isi dari data show
    useEffect(() => {
        setDataShow(dataBody.map(data => {
            return dataDisplay(data);
        }));
    }, [dataBody])

    // penonaktifan fail alert ketika modal create atau edit tertutup
    useEffect(() => {
        if ((!openModalCreate || !openModalEdit) && (alert.code === 0)) {
            setIsActiveAlert(false)
        }
    }, [openModalCreate, openModalEdit]);
    return (
        <>

            {/* Content */}
            <div className="p-4">
                <div className="card bg-white p-6">
                    {/* Title */}
                    <div className="flex justify-between items-center divider-bottom">
                        <div className="flex px-2 py-4 gap-x-2 items-center ">
                            <Icon icon="bxs:purchase-tag" className={`text-2xl text-gold `} />
                            <span className='text-lg text-dark-green font-medium'>PO Customer</span>
                        </div>
                        <div>
                            <button className={`bg-light-green hover:bg-green-700 text-white rounded flex
                                items-center gap-x-1 py-[2px] px-4 `} onClick={handleOpenModalCreate}>
                                <Icon icon="fluent:add-12-filled" className="text-base" />
                                <span className='text-base'>Create</span>
                            </button>
                        </div>
                    </div>
                    {/* Table */}
                    <Table dataBody={dataShow} column={columnTable} id="oid" loading={loadingTable}
                        handleActionDelete={handleOpenModalDelete} handleActionEdit={handleOpenModalEdit}
                        handleClickField={handleOpenModalDetail} clickField={clickFieldTable} pagination>
                        {/* Search */}
                        <SearchTable setData={setDataShow} dataBody={dataBody} dataSkipSearch={0} customDisplay={dataDisplay} />
                    </Table>
                </div>
            </div>

            {/* Modal Detail */}
            <Modal isOpen={openModalDetail} setIsOpen={setOpenModalDetail} title="PO Customer Detail" iconTitle="ooui:view-details-ltr">
                <POCustomerDetail data={dataModalDetail} dataUnitPo={dataUnitPo} setDataUnitPo={setDataUnitPo}
                    setAlert={setAlert} setLoadingPage={setLoadingPage} optionsBrand={optionsBrand} fetchPoCustomer={fetchDataBody} />
            </Modal>

            {/* Modal Create */}
            <Modal isOpen={openModalCreate} setIsOpen={setOpenModalCreate} title={'New PO Customer'} size={700}>
                <POCustomerCreate setIsOpen={setOpenModalCreate} setAlert={setAlert} fetchPoCustomer={fetchDataBody} options={{
                    contract: { optionsContract, setOptionsContract }
                }} setLoadingPage={setLoadingPage} />
            </Modal>

            {/* Modal Edit */}
            <Modal isOpen={openModalEdit} setIsOpen={setOpenModalEdit} title={'Edit PO Customer'} size={700}>
                <POCustomerEdit setIsOpen={setOpenModalEdit} fetchPoCustomer={fetchDataBody} oid={idToBeEdit.current} options={{
                    contract: { optionsContract, setOptionsContract }
                }} setLoading={setLoadingPage} currentData={{
                    ponumber: [editPoNumber, setEditPoNumber],
                    branch: [editBranch, setEditBranch],
                    contract: [editContract, setEditContract]
                }} setAlert={setAlert} />
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
            <ErrorNetwork isOpen={isErrorNetwork} setIsOpen={setIsErrorNetwork} />
            {/* Notifikasi Ketika Berhasil Create Data */}
            <Alert isOpen={alert.isActive} setIsOpen={setIsActiveAlert} codeAlert={alert.code} title={alert.title}>
                {alert.message}
            </Alert>
            <Loading isLoading={loadingPage} />
        </>
    )
}

export default POCustomer