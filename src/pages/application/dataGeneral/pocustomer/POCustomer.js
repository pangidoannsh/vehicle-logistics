import { Icon } from '@iconify/react';
import React, { useState, useEffect, useCallback, useRef, useContext } from 'react';
import Loading from '../../../../components/Loading';
import Modal from '../../../../components/Modal';
import SearchTable from '../../../../components/tables/SearchTable';
import Table from '../../../../components/tables/Table';
import { api } from '../../../../config';
import { moneyFormat, fetchOption } from '../../../../utils';
import POCustomerCreate from './POCustomerCreate';
import POCustomerDetail from './POCustomerDetail';
import { useFetch } from '../../../../hooks'
import ErrorNetwork from '../../../../components/ErrorNetwork';
import POCustomerEdit from './POCustomerEdit';
import ButtonCreate from '../../../../components/ButtonCreate';
import { AlertContext } from '../../../../layouts/Main';

const columnTable = [
    { field: "branch", header: "Branch" },
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
    // =============================================
    // ========================== USE REF ==========================
    const idToBeDelete = useRef("");
    const idToBeEdit = useRef("");
    // ========================================================================

    // =================================== USE STATE ===================================
    const [loadingCreate, setLoadingCreate] = useState(false);
    const [loadingPage, setLoadingPage] = useState(false)
    const [loadingTable, setLoadingTable] = useState(true);
    const [alert, setAlert] = useContext(AlertContext);

    const setIsActiveAlert = isActived => setAlert(prev => ({ ...prev, isActived }));

    // databody merupakan variable untuk menampung data dari api
    const [dataBody, setDataBody, fetchDataBody, isErrorNetwork, setIsErrorNetwork] = useFetch({
        url: '/pocustomer', setLoading: setLoadingTable
    });

    // data yang akan ditampilkan pada table UTAMA
    const [dataShow, setDataShow] = useState([]);

    // data yang akan ditampilkan pada table DATA UNIT
    const [dataUnitPo, setDataUnitPo] = useState([]);

    // ======================= STATE MODAL ===========================
    // untuk membuka dan menutup modal detail
    const [openModalDetail, setOpenModalDetail] = useState(false);
    // untuk membuka dan menutup modal Create
    const [openModalCreate, setOpenModalCreate] = useState(false);
    // untuk membuka dan menutup modal Edit
    const [openModalEdit, setOpenModalEdit] = useState(false);
    // untuk membuka dan menutup modal delete
    const [openModalDelete, setOpenModalDelete] = useState(false);
    // ===============================================================

    // data yang tampil ketika membuka DETAIL
    const [dataModalDetail, setDataModalDetail] = useState(null);//object

    // ============================= OPTIONS =============================
    const [optionsContract, setOptionsContract] = useState([]);
    const [optionsBrand] = useFetch({
        url: "/vehiclebrand", howDataGet: (data => {
            return { oid: data.brand, name: data.brand };
        })
    });
    // ========================================================================

    // ==================== DATA EDIT ====================
    const [editPoNumber, setEditPoNumber] = useState("");
    const [editBranch, setEditBranch] = useState({ oid: null, branchname: "nothing selected" });
    const [editContract, setEditContract] = useState({ oid: null, contractname: "nothing selected" });
    // ========================================================================

    // =================================== HANDLE FUNCTION ===================================

    // TO OPEN MODAL DETAIL
    const handleOpenModalDetail = useCallback(id => {

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
    }, [dataBody, dataModalDetail])

    // TO OPEN MODAL CREATE
    const handleOpenModalCreate = e => {
        e.preventDefault()
        if (optionsContract.length === 0) {
            setLoadingCreate(true);
            fetchOption("/contractlist", setOptionsContract);
            api.get("/contractlist").then(res => {
                setOptionsContract(res.data);
                setOpenModalCreate(true)
            }).catch(err => {
                setAlert({
                    isActived: true,
                    code: 0,
                    message: "Failed Get Data contract",
                    title: err.response.status
                })
            }).finally(() => setLoadingCreate(false))
        } else {
            setOpenModalCreate(true)
        }
    }

    // TO OPEN MODAL EDIT
    const handleOpenModalEdit = oid => {
        setLoadingPage(true);
        setDataModalDetail([]);
        idToBeEdit.current = oid;
        try {
            api.get(`/pocustomer/${oid}`).then(res => {
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

    // TO OPEN MODAL DELETE CONFIRMATION
    const handleOpenModalDelete = useCallback(oid => {
        idToBeDelete.current = oid;
        const dataPO = dataBody.find(data => data.oid === oid);
        if (dataPO) {
            if (dataPO.status.toUpperCase() !== "CREATE") {
                setAlert({
                    isActived: true,
                    code: 2,
                    title: "Warning! ",
                    message: "PO Customer Status is already Manifested"
                })
                setTimeout(() => {
                    setAlert(current => ({ ...current, isActived: false }))
                }, 3000);
            } else {
                setOpenModalDelete(true)
            }
        }
    }, [dataBody]);

    // TO DELETE DATA
    const handleDelete = e => {
        e.preventDefault()
        setIsActiveAlert(false)
        setLoadingPage(true);
        api.delete(`/pocustomer/${idToBeDelete.current}`)
            .then(response => {
                setAlert({
                    isActived: true,
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
                    isActived: true,
                    code: 0,
                    title: "Failed",
                    message: "Something Wrong Check Console Or Reload"
                })
            })
    }
    // =================================== END HANDLE FUNCTION ===================================

    // =================================== USE EFFECT ===================================

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

    // =================================== END USE EFFECT ===================================

    return (
        <>
            {/* Content */}
            <div className="p-4">
                <div className="card shadow-lg bg-white p-6">
                    {/* Title */}
                    <div className="flex justify-between items-center divider-bottom">
                        <div className="flex px-2 py-4 gap-x-2 items-center ">
                            <Icon icon="bxs:purchase-tag" className={`text-2xl text-gold `} />
                            <span className='text-lg text-dark-green font-medium'>PO Customer</span>
                        </div>
                        <div>
                            <ButtonCreate onClick={handleOpenModalCreate} loading={loadingCreate} />
                        </div>
                    </div>
                    {/* Table */}
                    <Table dataBody={dataShow} column={columnTable} id="oid" loading={loadingTable}
                        handleActionDelete={handleOpenModalDelete} handleActionEdit={handleOpenModalEdit}
                        handleClickField={handleOpenModalDetail} clickField={clickFieldTable} pagination center={["quantity"]}>
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
            <Modal isOpen={openModalDelete} setIsOpen={setOpenModalDelete} size={500} >
                <div className='text-slate-600 text-xl font-medium'>
                    Are you sure want to Delete Data with PO Number <span className='text-gold'>{
                        dataBody.filter(data => data.oid === idToBeDelete.current).map(filter => filter.ponumber)[0]
                    }</span> ?
                </div>
                <div className="flex justify-end gap-x-4 mt-4">
                    <button className={`text-slate-500 hover:text-slate-600 items-center gap-x-1 py-2 px-4 `}
                        onClick={() => setOpenModalDelete(false)}>
                        Cancel
                    </button>
                    <button type="Submit" className={`border border-red-600 text-red-600 rounded flex items-center gap-x-1 py-2 px-4 
                            focus:ring focus:ring-red-200 active:ring active:ring-red-200`} onClick={handleDelete}>
                        Delete
                    </button>
                </div>
            </Modal>
            {/* Notifikasi Error Ketika Tidak Ada Jaringan */}
            <ErrorNetwork isOpen={isErrorNetwork} setIsOpen={setIsErrorNetwork} />
            <Loading isLoading={loadingPage} />
        </>
    )
}

export default POCustomer