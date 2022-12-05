import { Icon } from '@iconify/react'
import { useEffect, useState } from 'react'
import ErrorNetwork from '../../../components/ErrorNetwork';
import Modal from '../../../components/Modal';
import SearchTable from '../../../components/tables/SearchTable';
import Table from '../../../components/tables/Table';
import { api } from '../../../config';
import ArmadaCreate from './ArmadaCreate';
import { useRef } from 'react';
import { useCallback } from 'react';
import Alert from '../../../components/Alert';
import Loading from '../../../components/Loading';
import Action from '../../../components/tables/Action';
import LoadingTable from '../../../components/tables/LoadingTable';

export default function Armada() {
    // const columnTable = useRef([
    //     { field: "no", header: "No" },
    //     { field: "action", header: "#" },
    //     { field: "branch", header: "Branch" },
    //     { field: "modelname", header: "Unit Type" },
    //     { field: "hullnumber", header: "Hull Number" },
    //     { field: "framenumber", header: "Frame Number" },
    //     { field: "policenumber", header: "Police Number" },
    //     { field: "type", header: "Type" },
    //     { field: "status", header: "Status" },
    // ])
    const templateObject = useCallback(data => {
        const { branch, modelname, unittype, hullnumber, framenumber, policenumber, type, status } = data;
        return { branch, modelname, unittype, hullnumber, framenumber, policenumber, type, status };
    })

    const displayData = useCallback(data => {
        const { branch, modelname, unittype, hullnumber, framenumber, policenumber, type, status } = data;
        return {
            branch, modelname, unittype, hullnumber, framenumber, policenumber, type,
            status: status.toLowerCase() === "ready" ? (
                <div className="flex gap-x-1 py-1 px-2 items-center bg-light-green rounded-sm text-white justify-center">
                    <Icon icon="akar-icons:check" className="text-base" />
                    <span className="text-sm capitalize">{data.status}</span>
                </div>
            ) : status.toLowerCase() === "repair" ? (
                <div className="flex gap-x-1 py-1 px-2 items-center bg-[#A90101] rounded-sm text-white justify-center">
                    <Icon icon="fa6-solid:gears" className="text-base" />
                    <span className="text-sm capitalize">{data.status}</span>
                </div>
            ) : status.toLowerCase() === "used" ? (
                <div className="flex gap-x-1 py-1 px-2 items-center bg-yellow-500 rounded-sm text-white justify-center">
                    <Icon icon="game-icons:steering-wheel" className="text-base" />
                    <span className="text-sm capitalize">{data.status}</span>
                </div>
            ) : status
        };
    })
    const [loadingPage, setLoadingPage] = useState(false);
    const [loading, setLoading] = useState(true);
    const [mainData, setMainData] = useState([]);
    const [dataBody, setDataBody] = useState([]);
    const [dataShow, setDataShow] = useState([]);
    const [openModalCreate, setOpenModalCreate] = useState(false);
    const [isErrorNetwork, setIsErrorNetwork] = useState(false);
    const [optionsBranch, setOptionsBranch] = useState([]);
    const [optionsType, setOptionsType] = useState([]);
    const [optionsBrand, setOptionsBrand] = useState([]);
    const [optionsModel, setOptionsModel] = useState([]);
    const [alert, setAlert] = useState({
        isActived: false,
        code: 0,
        title: "title",
        message: "message"
    })
    const setAlertActive = active => setAlert({ ...alert, isActived: active });

    const headTable = useRef([
        "Branch", "Model Name", "Unit Type", "HUll Number", "Frame Number", "Police Number", "Type", "Status"
    ]);

    const customSearch = useCallback((e) => {
        setDataShow(dataBody.filter(dataRow => {
            return Object.values(dataRow).findIndex(dataCell => {
                return dataCell.toString().toLowerCase().includes(e.target.value.toLowerCase())
            }) !== -1
        }
        ).map(filter => { return displayData(filter) }));
    }, [dataBody]);

    const handleOpenModalCreate = e => {
        e.preventDefault();
        if (optionsBranch.length === 0) {
            // fetchOption("/branch", setOptionsBranch)
            api.get("/branch").then(res => {
                setOptionsBranch(res.data)
            }).catch(error => {
                if (error.code === "ERR_NETWORK") {
                    alert('Periksa jaringan anda dan Reload Browser')
                }
            })

            api.get("/vehicletype").then(res => {
                setOptionsType(res.data)
            }).catch(error => {
                if (error.code === "ERR_NETWORK") {
                    alert('Periksa jaringan anda dan Reload Browser')
                }
            })

            api.get("/vehiclemodel").then(res => {
                setOptionsModel(res.data)
            }).catch(error => {
                if (error.code === "ERR_NETWORK") {
                    alert('Periksa jaringan anda dan Reload Browser')
                }
            })

            api.get("/vehiclebrand").then(res => {
                setOptionsBrand(res.data)
            }).catch(error => {
                if (error.code === "ERR_NETWORK") {
                    alert('Periksa jaringan anda dan Reload Browser')
                }
            })
        }
        setOpenModalCreate(true)
    }
    const fetchArmada = () => {
        api.get('/vehiclearmada?').then(res => {
            setMainData(res.data);
            setDataBody(res.data.map(data => {
                return templateObject(data);
            }));
            setLoading(false)
        })
            .catch(error => {
                if (error.code === "ERR_NETWORK") {
                    setIsErrorNetwork(true)
                }
            })
    }
    // use effect untuk consume API
    useEffect(() => {
        fetchArmada();
    }, []);

    // pemberian isi dari data show
    useEffect(() => {
        setDataShow(dataBody.map(data => {
            return displayData(data);
        }));
    }, [dataBody]);

    useEffect(() => {
        if (!openModalCreate) {
            if (alert.code === 0) {
                setAlertActive(false);
            }
        }

    }, [openModalCreate]);
    return (
        <>
            {/* After Header */}
            <div className="flex justify-end items-center px-4 py-3 divider-top bg-white">
                <button
                    className={`bg-light-green hover:bg-green-700 text-white rounded flex
                                items-center gap-x-1 py-[2px] px-4 `}
                    onClick={handleOpenModalCreate}>
                    <Icon icon="fluent:add-12-filled" className="text-base" />
                    <span className="text-base">Create</span>
                </button>
            </div>

            {/* Content */}
            <div className="p-4">
                <div className="card drop-shadow-lg bg-white px-4 pb-4 pt-2">
                    {/* Title */}
                    <div className="flex px-2 py-4 gap-x-2 items-center divider-bottom">
                        <Icon icon="fa-solid:truck" className={`text-xl text-gold `} />
                        <span className="text-lg text-dark-green font-medium">Armada</span>
                    </div>
                    {/* Search searchFunct={customSearch} */}
                    <SearchTable setData={setDataShow} dataBody={dataBody} customSearchFunction={customSearch} />
                    {/* Table */}
                    <Table dataBody={dataShow} dataHead={headTable.current} id="policenumber" loading={loading} />
                    {/* <table className='table-auto w-full'>
                        <thead>
                            <tr>
                                <th className='p-4 bg-dark-green text-white font-semibold 
                            text-sm text-center border border-l-[1px] border-white w-16'>#</th>
                                <th className={`p-4 bg-dark-green text-white font-semibold 
                            text-sm text-center border border-l-[1px] border-white w-14`}>No</th>
                                {headTable.current.map((data, index) => <th key={index} className={`p-2 bg-dark-green text-white font-semibold text-sm text-center
                                border border-l-[1px] border-white`}>{data}</th>)}
                            </tr>
                        </thead>
                        <tbody>
                            {!loading ?
                                dataShow.length !== 0 ?
                                    dataShow.map((data, index) => <tr key={index} className=" even:bg-dark-green even:bg-opacity-10">
                                        <td>
                                            <Action>
                                                <button className={`text-yellow-500 hover:text-yellow-400`}>
                                                    <div className='flex gap-x-3 items-center' >
                                                        <Icon icon={`clarity:note-edit-solid`} className='text-xl' />
                                                        <span className='text-base'>Edit</span>
                                                    </div>
                                                </button>
                                            </Action>
                                        </td>
                                        <td className="p-4 text-sm text-slate-700 text-center w-14  selection:bg-light-green selection:text-white">{index + 1}</td>
                                        {Object.values(data).map((dataCell, indexCell) => <td key={`cell-${indexCell}`} className="p-4 text-sm text-slate-700
                                             selection:bg-light-green selection:text-white">{dataCell}</td>)}
                                    </tr>) : <tr>
                                        <td colSpan={`100%`} className='text-center text-sm p-4 bg-slate-100 text-slate-500'>
                                            No Data Matches
                                        </td>
                                    </tr>
                                : <LoadingTable />}
                        </tbody>
                    </table> */}
                </div>
            </div>
            <Modal isOpen={openModalCreate} setIsOpen={setOpenModalCreate} title={"New Vehicle Unit"} size={1000}>
                <ArmadaCreate setIsOpen={setOpenModalCreate} alert={alert} setAlert={setAlert} options={{
                    optionsBranch, optionsType, optionsModel, optionsBrand
                }} setLoadingPage={setLoadingPage} fetchArmada={fetchArmada} />
            </Modal>
            <ErrorNetwork isOpen={isErrorNetwork} setIsOpen={setIsErrorNetwork}
                title="Network Error!" message="Please check your network and Reload your browser" />
            <Alert isOpen={alert.isActived} setIsOpen={setAlertActive} codeAlert={alert.code} title={alert.title}>
                {alert.message}
            </Alert>
            <Loading isLoading={loadingPage} />
        </>
    );
}

