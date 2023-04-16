import { Icon } from '@iconify/react'
import React, { useContext, useEffect, useState } from 'react'
import ButtonCreate from '../../../../components/ButtonCreate'
import ErrorNetwork from '../../../../components/ErrorNetwork'
import Modal from '../../../../components/Modal'
import SearchTable from '../../../../components/tables/SearchTable'
import Table from '../../../../components/tables/Table'
import { api } from '../../../../config'
import { useFetch } from '../../../../hooks'
import { AlertContext } from '../../../../layouts/Main'
import { dateDisplay } from '../../../../utils'
import Loading from '../../../../components/Loading'
import PlanDriverCreate from './PlanDriverCreate'
import PlanDriverEdit from './PlanDriverEdit'

const columnTable = [
    { field: "branch", header: "Branch" },
    { field: "drivername", header: "Driver Name" },
    { field: "plandate", header: "Plan Date" },
    { field: "status", header: "Status" },
]
const displayData = data => {
    return {
        ...data, plandate: dateDisplay(data.plandate),
        status: data.status.toLowerCase() === 'ready' ? (
            <div className="text-center mx-auto w-max py-1 px-4 items-center bg-light-green rounded-sm
             text-white justify-center text-sm capitalize"
            >
                {data.status}
            </div>
        ) : data.status.toLowerCase() === 'used' ? (
            <div className="text-center mx-auto w-max py-1 px-4 items-center bg-yellow-500 rounded-sm
             text-white justify-center text-sm capitalize"
            >
                {data.status}
            </div>
        ) : data.status.toLowerCase() === 'closed' ? (
            <div className="text-center mx-auto w-max py-1 px-2 items-center bg-slate-300 rounded-sm text-slate-600
                     justify-center text-sm capitalize"
            >
                {data.status}
            </div>
        ) : data.status
    };
}
const getDate = data => {
    try {
        return { ...data, plandate: data.plandate.split(" ")[0] }
    } catch (e) {
        return data;
    }
}
export default function PlanDriver() {
    const [alert, setAlert] = useContext(AlertContext);
    const [loadingTable, setloadingTable] = useState(false);
    const [loadingCreate, setloadingCreate] = useState(false);
    const [loadingPage, setloadingPage] = useState(false);
    const [dataBody, setDataBody, fetchDataBody, errorNetwork, setErrorNetwork] = useFetch({
        url: "/plandriver", setLoading: setloadingTable
    });
    const [dataShow, setDataShow] = useState([]);
    const [driverOptions, setdriverOptions] = useState([]);
    const [dataEdit, setDataEdit] = useState({});
    const [openModalCreate, setOpenModalCreate] = useState(false);
    const [openModalEdit, setOpenModalEdit] = useState(false);

    function handleOpenModalCreate(e) {
        setloadingCreate(true);
        setAlert(prev => ({ ...prev, isActived: false }))
        api.get('/driver/list').then(res => {
            setOpenModalCreate(true);
            setdriverOptions(res.data)
        }).catch(err => {
            console.log(err.response);
            setTimeout(() => {
                setAlert(prev => ({ ...prev, isActived: false }))
            }, 2000);
        }).finally(() => setloadingCreate(false))
    }
    function handleOpenModalEdit(oid) {
        setloadingPage(true);
        setAlert(prev => ({ ...prev, isActived: false }))
        api.get('driver').then(res => {
            setOpenModalEdit(true);
            setDataEdit(getDate(dataBody.find(data => data.oid === oid)));
            setdriverOptions(res.data)
        }).catch(err => {
            console.log(err.response);
            setTimeout(() => {
                setAlert(prev => ({ ...prev, isActived: false }))
            }, 2000);
        }).finally(() => setloadingPage(false))
    }
    function handleOpenModalDelete(e) {

    }
    useEffect(() => {
        if (dataBody.length !== 0) setDataShow(dataBody.map(data => displayData(data)));
    }, [dataBody])

    return (
        <>
            {/* Content */}
            <div className="p-4 pb-14">
                <div className="card bg-white p-6">
                    {/* Title */}
                    <div className="flex justify-between items-center divider-bottom">
                        <div className="flex px-2 py-4 gap-x-2 items-center">
                            <Icon icon="fa:drivers-license" className={`text-lg text-gold `} />
                            <span className='text-lg text-dark-green font-medium'>Plan Driver</span>
                        </div>
                        <div>
                            <ButtonCreate loading={loadingCreate} onClick={handleOpenModalCreate} />
                        </div>
                    </div>
                    {/* Table */}
                    <Table dataBody={dataShow} column={columnTable} id="oid" loading={loadingTable} pagination
                        handleActionEdit={handleOpenModalEdit} handleActionDelete={handleOpenModalDelete}
                        center={["payloadcomposition", "plandate"]}>
                        <SearchTable setData={setDataShow} dataBody={dataBody} />
                    </Table>
                </div>
            </div>
            {/* Modal Create */}
            <Modal isOpen={openModalCreate} setIsOpen={setOpenModalCreate} title={'New Plan Driver'} size={700}>
                <PlanDriverCreate setAlert={setAlert} driverOptions={driverOptions} setIsOpen={setOpenModalCreate}
                    setData={setDataBody} />
            </Modal>
            {/* Modal Edit */}
            <Modal isOpen={openModalEdit} setIsOpen={setOpenModalEdit} title="Edit Plan Driver" size={700}>
                <PlanDriverEdit currentData={dataEdit} driverOptions={driverOptions} setIsOpen={setOpenModalEdit}
                    setAlert={setAlert} setData={setDataBody} />
            </Modal>
            {/* Modal Delete */}
            {/* <Modal isOpen={openModalDelete} setIsOpen={setOpenModalDelete} size={500} >

            </Modal> */}
            {/* Notifikasi Error Ketika Tidak Ada Jaringan */}
            <ErrorNetwork isOpen={errorNetwork} setIsOpen={setErrorNetwork} />
            <Loading isLoading={loadingPage} />
        </>
    )
}
