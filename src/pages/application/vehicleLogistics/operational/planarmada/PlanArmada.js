import React, { useEffect, useState, useCallback } from 'react'
import Modal from '../../../../../components/Modal';
import SearchTable from '../../../../../components/tables/SearchTable';
import Table from '../../../../../components/tables/Table';
import { api } from '../../../../../config';
import PlanArmadaCreate from './PlanArmadaCreate';
import Alert from '../../../../../components/Alert';
import { fetchOption } from '../../../../../utils';
import { Icon } from '@iconify/react';
import Loading from '../../../../../components/Loading';

const columnTable = [
    { field: "branch", header: "Branch" },
    { field: "moda", header: "Moda" },
    { field: "plandate", header: "Plan Date" },
    { field: "payloadcomposition", header: "Payload Composition" },
    { field: "policenumber", header: "Police Number" },
    { field: "status", header: "Status" },
]

const PlanArmada = () => {
    const howDataGet = useCallback(data => {
        const { branch, moda, destination, plandate, payloadcomposition, policenumber, status } = data;
        const date = plandate.split(" ")[0].split("-").reverse();
        return { branch, moda, destination, plandate: `${date[0]}-${date[1]}-${date[2]}`, payloadcomposition, policenumber, status };
    })
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
    const [loadingPage, setLoadingPage] = useState(false)
    const [loading, setLoading] = useState(true);
    // dataBody meruoakan data asli yang didapatkan dari consume API dan tidak diganggu gugat
    const [dataBody, setDataBody] = useState([]);
    // dataShow berfungsi sebagai data yang akan ditampilkan pada table, dapat berubah seperti untuk searcing dll
    const [dataShow, setDataShow] = useState([]);
    // untuk data yang akan ditampilkan Modal -> ModalContent
    const [dataModal, setDataModal] = useState({});
    const [isErrorNetwork, setIsErrorNetwork] = useState(false);
    // untuk membuka dan menutup modal
    const [openModal, setOpenModal] = useState(false);
    // untuk membuka dan menutup modal detail
    const [openModalCreate, setOpenModalCreate] = useState(false);
    // untuk menampung kondisi berhasil create data
    const [isSuccessCreated, setIsSuccessCreated] = useState(false);

    // option branch untuk select pada create po customer
    const [optionsBranch, setOptionsBranch] = useState([]);
    const [optionsModa, setOptionsModa] = useState([
        { id: "TOWING", name: 'TOWING' },
        { id: "CAR CARRIER", name: 'CAR CARRIER' },
    ]);
    const [optionsVehicleArmada, setOptionsVehicleArmada] = useState([]);

    const [alert, setAlert] = useState({
        isActived: false,
        code: 0,
        title: "title",
        message: "message"
    })
    const setAlertActive = active => setAlert({ ...alert, isActived: active });

    const handleOpenModalCreate = e => {
        e.preventDefault()
        if (optionsBranch.length === 0) {
            fetchOption('/branch', setOptionsBranch);
        }
        if (optionsVehicleArmada.length === 0) {
            fetchOption('/vehiclearmada', setOptionsVehicleArmada);
            api.get('/vehiclearmada').then(res => {
                setOptionsVehicleArmada(res.data.map(data => {
                    const { hullnumber, unittype, policenumber } = data;
                    return {
                        hullnumber, armadaname: (
                            <div className='flex justify-between w-[50%] '>
                                <span>{unittype}</span>
                                <span>{policenumber}</span>
                            </div>
                        )
                    };
                }))
            }).catch(error => {
                console.log(error.response);
            })
        }

        setOpenModalCreate(true)
    }
    const fetchPlanArmada = () => {
        api.get('/planarmada').then(res => {
            setDataBody(res.data.map(data => {
                return howDataGet(data);
            }));
            setLoading(false)
        }).catch(error => {
            console.log(error.response);
            if (error.code === "ERR_NETWORK") {
                setAlert({
                    isActived: true,
                    code: 0,
                    title: "Error Network",
                    message: "Please Check Your Connection and Reload the Browser!"
                })
            }
        })
    }
    // use effect untuk consume API
    useEffect(() => {
        fetchPlanArmada()
    }, []);

    // memberikan nilai ke datashow dari data bodi(api)
    useEffect(() => {
        setDataShow(dataBody.map(data => {
            return displayData(data);
        }));
    }, [dataBody])

    useEffect(() => {
        if (!openModalCreate) {
            if (alert.code === 0) {
                setAlert({ ...alert, isActived: false });
            }
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
            <div className="p-4 pb-14">
                <div className="card bg-white p-6">
                    {/* Title */}
                    <div className="flex px-2 py-4 gap-x-2 items-center divider-bottom">
                        <Icon icon="mdi:planner" className={`text-2xl text-gold `} />
                        <span className='text-lg text-dark-green font-medium'>Plan Armada</span>
                    </div>
                    {/* Search */}
                    <SearchTable setData={setDataShow} dataBody={dataBody} customDisplay={displayData} />
                    {/* Table */}
                    <Table dataBody={dataShow} column={columnTable} id="oid" loading={loading} />
                </div>
            </div>
            {/* Modal Create */}
            <Modal isOpen={openModalCreate} setIsOpen={setOpenModalCreate} title={'New Plan Armada'} size={700}>
                <PlanArmadaCreate setIsOpen={setOpenModalCreate} fetchPlanArmada={fetchPlanArmada} options={{
                    optionsBranch, optionsModa, optionsVehicleArmada
                }} setAlert={setAlert} setLoadingPage={setLoadingPage} alert={alert} />
            </Modal>
            {/* Alert */}
            <Alert isOpen={alert.isActived} setIsOpen={setAlertActive} codeAlert={alert.code} title={alert.title}>
                {alert.message}
            </Alert>
            <Loading isLoading={loadingPage} />
        </>
    );
}

export default PlanArmada