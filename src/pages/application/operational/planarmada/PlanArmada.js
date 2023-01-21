import React, { useEffect, useState, useCallback, useRef } from 'react'
import Modal from '../../../../components/Modal';
import SearchTable from '../../../../components/tables/SearchTable';
import Table from '../../../../components/tables/Table';
import { api } from '../../../../config';
import PlanArmadaCreate from './PlanArmadaCreate';
import Alert from '../../../../components/Alert';
import { Icon } from '@iconify/react';
import Loading from '../../../../components/Loading';
import ErrorNetwork from '../../../../components/ErrorNetwork';
import { useFetch } from '../../../../hooks';
import PlanArmadaEdit from './PlanArmadaEdit';
import ButtonCreate from '../../../../components/ButtonCreate';

const columnTable = [
    { field: "branch", header: "Branch" },
    { field: "moda", header: "Moda" },
    { field: "plandate", header: "Plan Date" },
    { field: "payloadcomposition", header: "Payload Composition" },
    { field: "policenumber", header: "Police Number" },
    { field: "status", header: "Status" },
]
const vehicleArmadaGet = data => {
    const { hullnumber, unittype, policenumber } = data;
    return {
        hullnumber, armadaname: (
            <div className='grid grid-cols-2'>
                <span>{unittype}</span>
                <span>{policenumber}</span>
            </div>
        )
    };
}
const howDataGet = data => {
    const { oid, branch, moda, destination, plandate, payloadcomposition, policenumber, status } = data;
    const date = plandate.split(" ")[0].split("-").reverse();
    return { oid, branch, moda, destination, plandate: `${date[0]}-${date[1]}-${date[2]}`, payloadcomposition, policenumber, status };
}
const PlanArmada = () => {

    const displayData = useCallback(data => {
        return {
            ...data,
            status: data.status.toLowerCase() === 'ready' ? (
                <div className="text-center py-1 px-2 items-center bg-light-green rounded-sm text-white justify-center text-sm capitalize">
                    {data.status}
                </div>
            ) : data.status.toLowerCase() === 'used' ? (
                <div className="text-center py-1 px-2 items-center bg-yellow-500 rounded-sm text-white justify-center text-sm capitalize">
                    {data.status}
                </div>
            ) : data.status.toLowerCase() === 'closed' ? (
                <div className="text-center py-1 px-2 items-center bg-[#A90101] rounded-sm text-white justify-center text-sm capitalize">
                    {data.status}
                </div>
            ) : data.status
        }
    }, []);
    const idToBeEdit = useRef("");
    const idToBeDelete = useRef("");

    const [loadingPage, setLoadingPage] = useState(false)
    const [loading, setLoading] = useState(true);
    const [loadingCreate, setLoadingCreate] = useState(false);
    // dataBody meruoakan data asli yang didapatkan dari consume API dan tidak diganggu gugat
    const [dataBody, setDataBody, fetchDataBody, isErrorNetwork, setIsErrorNetwork] = useFetch({
        url: '/planarmada', setLoading, howDataGet
    });
    // dataShow berfungsi sebagai data yang akan ditampilkan pada table, dapat berubah seperti untuk searcing dll
    const [dataShow, setDataShow] = useState([]);
    // untuk membuka dan menutup modal Create
    const [openModalCreate, setOpenModalCreate] = useState(false);
    // untuk membuka dan menutup modal Edit
    const [openModalEdit, setOpenModalEdit] = useState(false);
    // untuk membuka dan menutup modal Edit
    const [openModalDelete, setOpenModalDelete] = useState(false);

    // option branch untuk select pada create po customer
    const [optionsBranch, setOptionsBranch] = useState([]);
    const [optionsModa, setOptionsModa] = useState([
        { id: "TOWING", name: 'TOWING' },
        { id: "CAR CARRIER", name: 'CAR CARRIER' },
    ]);
    const [optionsVehicleArmada, setOptionsVehicleArmada] = useState([]);
    const [optionsDestination, setOptionsDestination] = useState([]);

    const [alert, setAlert] = useState({
        isActived: false,
        code: 0,
        title: "title",
        message: "message"
    })
    const setAlertActive = active => setAlert({ ...alert, isActived: active });
    const [editModa, setEditModa] = useState({ id: null, name: "nothing to selected" });
    const [editArmada, setEditArmada] = useState({ hullnumber: null, armadaname: "nothing selected" });
    const [editDestination, setEditDestination] = useState({ key: null, name: "nothing selected" });
    const [editPlanDate, setEditPlanDate] = useState("");
    const [editPayLoad, setEditPayLoad] = useState("");

    const handleOpenModalCreate = async e => {
        e.preventDefault();
        if (optionsVehicleArmada.length === 0 || optionsDestination.length === 0) {
            setLoadingCreate(true);
            try {
                await api.get("vehiclearmadalist").then(res => {
                    setOptionsVehicleArmada(res.data.map(data => {
                        return vehicleArmadaGet(data);
                    }))
                })
                await api.get("destination").then(res => {
                    setOptionsDestination(res.data)
                })
                setOpenModalCreate(true)
            } catch (error) {
                setAlert({
                    isActived: true,
                    code: 0,
                    message: "Failed Open Create Form",
                    title: "Error"
                })
            } finally {
                setLoadingCreate(false)
            }
        }
        else {
            setOpenModalCreate(true)
        }
    }

    const handleOpenModalEdit = oid => {
        setLoadingPage(true);
        idToBeEdit.current = oid;
        try {
            api.get(`/planarmada/${oid}`).then(res => {
                const data = res.data;
                setEditModa({ id: data.moda, name: data.moda });
                setEditArmada({
                    hullnumber: data.hullnumber, armadaname: (
                        <div className='grid grid-cols-2'>
                            <span>{data.unittype}</span>
                            <span>{data.policenumber}</span>
                        </div>
                    )
                });
                setEditDestination({ key: data.destination, name: data.destination });
                setEditPlanDate(data.plandate.split(" ")[0]);
                setEditPayLoad(data.payloadcomposition);
                setOpenModalEdit(true);
            })
        } catch (err) {
            setAlert({
                isActived: true,
                code: 0,
                title: "Error",
                message: "Server Error"
            })
            console.log(err);
        } finally {
            setLoadingPage(false);
        }
    }

    const handleOpenModalDelete = oid => {
        idToBeDelete.current = oid;
        setOpenModalDelete(true);
    }

    const handleDelete = e => {
        setAlertActive(false);
        setLoadingPage(true);
        api.delete(`/planarmada/${idToBeDelete.current}`).then(res => {
            setAlert({
                isActived: true,
                code: 1,
                title: "Success",
                message: "Plan Armada Success Deleted"
            });
            fetchDataBody();
            setTimeout(() => {
                setAlertActive(false);
            }, 2000)
        }).catch(err => {
            if (err.response.status < 500) {
                setAlert({
                    isActived: true,
                    code: 1,
                    title: `Error ${err.response.status}`,
                    message: "Client Error"
                });
            }
            else {
                setAlert({
                    isActived: true,
                    code: 1,
                    title: `Error ${err.response.status}`,
                    message: "Server Error"
                });
            }
        }).finally(() => { setLoadingPage(false); setOpenModalDelete(false) })
    }
    // memberikan nilai ke datashow dari data bodi(api)
    useEffect(() => {
        setDataShow(dataBody.map(data => {
            return displayData(data);
        }));
    }, [dataBody])

    useEffect(() => {
        if (!openModalCreate || !openModalEdit) {
            if (alert.code === 0) {
                setAlert({ ...alert, isActived: false });
            }
        }
    }, [openModalCreate, openModalEdit]);
    return (
        <>
            {/* Content */}
            <div className="p-4 pb-14">
                <div className="card bg-white p-6">
                    {/* Title */}
                    <div className="flex justify-between items-center divider-bottom">
                        <div className="flex px-2 py-4 gap-x-2 items-center">
                            <Icon icon="mdi:planner" className={`text-2xl text-gold `} />
                            <span className='text-lg text-dark-green font-medium'>Plan Armada</span>
                        </div>
                        <div>
                            <ButtonCreate loading={loadingCreate} onClick={handleOpenModalCreate} />
                        </div>
                    </div>
                    {/* Table */}
                    <Table dataBody={dataShow} column={columnTable} id="oid" loading={loading} pagination
                        handleActionEdit={handleOpenModalEdit} handleActionDelete={handleOpenModalDelete}>
                        {/* Search */}
                        <SearchTable setData={setDataShow} dataBody={dataBody} customDisplay={displayData} />
                    </Table>
                </div>
            </div>
            {/* Modal Create */}
            <Modal isOpen={openModalCreate} setIsOpen={setOpenModalCreate} title={'New Plan Armada'} size={700}>
                <PlanArmadaCreate setIsOpen={setOpenModalCreate} fetchPlanArmada={fetchDataBody} options={{
                    optionsBranch, optionsModa, optionsVehicleArmada, optionsDestination
                }} setAlert={setAlert} setLoadingPage={setLoadingPage} alert={alert} />
            </Modal>
            {/* Modal Edit */}
            <Modal isOpen={openModalEdit} setIsOpen={setOpenModalEdit} title="Edit Plan Armada" size={700}>
                <PlanArmadaEdit setIsOpen={setOpenModalEdit} fetchPlanArmada={fetchDataBody} oid={idToBeEdit.current} options={{
                    optionsModa, optionsVehicleArmada, optionsDestination
                }} setAlert={setAlert} setLoadingPage={setLoadingPage} currentData={{
                    moda: [editModa, setEditModa],
                    armada: [editArmada, setEditArmada],
                    destination: [editDestination, setEditDestination],
                    plandate: [editPlanDate, setEditPlanDate],
                    payload: [editPayLoad, setEditPayLoad]
                }} />
            </Modal>
            {/* Modal Delete */}
            <Modal isOpen={openModalDelete} setIsOpen={setOpenModalDelete} size={500} >
                <div className='text-slate-600 text-xl font-medium'>
                    Are you sure want to Delete Data Plan Armada ?
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
            {/* Alert */}
            <Alert isOpen={alert.isActived} setIsOpen={setAlertActive} codeAlert={alert.code} title={alert.title}>
                {alert.message}
            </Alert>
            {/* Notifikasi Error Ketika Tidak Ada Jaringan */}
            <ErrorNetwork isOpen={isErrorNetwork} setIsOpen={setIsErrorNetwork} />
            <Loading isLoading={loadingPage} />
        </>
    );
}

export default PlanArmada