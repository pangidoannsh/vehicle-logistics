import { Icon } from '@iconify/react'
import React, { useCallback, useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Alert from '../../../../components/Alert';
import FormInput from '../../../../components/inputs/FormInput';
import Select from '../../../../components/inputs/Select'
import TableSelect from '../../../../components/inputs/TableSelect';
import Loading from '../../../../components/Loading';
import Modal from '../../../../components/Modal';
import Table from '../../../../components/tables/Table';
import { api } from '../../../../config';
import { moneyFormat } from '../../../../utils';

const columnSelectUnitTable = [
    { field: "enginenumber", header: "Engine Number" },
    { field: "framenumber", header: "Frame Number" },
    { field: "type", header: "Type" },
    { field: "color", header: "Color" },
    { field: "year", header: "Year" },
    { field: "amount", header: "Amount (Rp)" }
]
const columnTableModal = [
    { field: "enginenumber", header: "Engine Number" },
    { field: "framenumber", header: "Frame Number" },
    { field: "type", header: "Type" },
    { field: "color", header: "Color" },
    { field: "year", header: "Year" },
    { field: "amount", header: "Amount (Rp)" },
    { field: "action", header: "#" }
]
const displayData = data => {
    return { ...data, amount: moneyFormat(data.amount) }
}
const BastCreate = () => {
    let navigate = useNavigate();
    // =========== Template Tampilan pada Table ketika memilih Unit ==================
    const templateUnitSelect = useCallback(data => {
        const action = (
            <div className="text-center w-6">
                <button className="px-2 py-1 bg-light-green rounded-sm hover:bg-green-800
                                 active:bg-green-700 text-white"
                    onClick={() => handleSelectUnit(data.oidunitpo)}>
                    Select
                </button>
            </div>
        )
        return { ...data, action };
    });
    // ===================================================================================

    // ================================= Use Ref =======================================
    const loadingInput = useRef();
    const bopTotal = useRef();
    const bopSubmission = useRef();
    const oracleNumber = useRef();
    // ================================= State =======================================

    const [loading, setLoading] = useState(true);
    // =========== State Unit ter-Select (Selected) ==========
    const [unitSelected, setUnitSelected] = useState([]);
    // =============== options input =================
    const [optionsManifestNumber, setOptionsManifestNumber] = useState([]);
    const [optionsDataUnit, setOptionsDataUnit] = useState([])
    const [optionsOrigin, setOptionsOrigin] = useState([])
    const [optionsDestination, setOptionsDestination] = useState([])
    // =============== value input variables ===============
    const [value, setValue] = useState({
        maifestnumber: { oid: null, name: "nothing selected" }
    });
    const [alert, setAlert] = useState({
        isActived: false,
        code: 0,
        title: "",
        message: "",
    });
    // ================ Function Set State ===================
    const setIsActivedAlert = isActived => setAlert({ ...alert, isActived });
    const setValueManifestNumber = newValue => setValue({ ...value, maifestnumber: newValue });
    // =================== Modal State ========================
    const [openModalSelectUnit, setOpenModalSelectUnit] = useState(false);

    // ===================== END STATE ========================================================

    // ====================== Use Ref ===============================================
    const idUnitSelected = useRef([]);
    const sourceDataUnit = useRef([]);
    // ====================== Function Handle untuk Button =====================================

    // open modal untuk memilih unit
    const handleOpenModalSelectUnit = e => {
        e.preventDefault();
        setOpenModalSelectUnit(true);
    }

    // get data unit ketika selesai memilih manifest number
    const handleManifestNumberInput = id => {
        if (id !== null) {
            api.get(`/manifestdetail/${id}`).then(res => {
                console.log(res.data);
                sourceDataUnit.current = res.data.map(data => {
                    return displayData(data);
                })
                setOptionsDataUnit(res.data.map(data => {
                    return displayData(data);
                }))
            }).catch(err => {
                console.log(err);
            })
        }
    }

    // funtion ketika mengklik SELECT pada saat memilih unit 
    const handleSelectUnit = useCallback(oidunit => {
        // memasukan oidunit terpilih ke dalam list unit terpilih
        idUnitSelected.current = [...idUnitSelected.current, oidunit];
        // menambahkan data terpilih ke list unit select
        setUnitSelected([...unitSelected, sourceDataUnit.current.filter(data => data.oidunitpo === oidunit).map(filter => filter)[0]])
        // mengurangi data terpilih dari list option data unit
        setOptionsDataUnit(optionsDataUnit.filter(data => data.oidunitpo !== oidunit).map(filter => filter));
    })

    // funtion ketika mengklik icon HAPUS pada saat memilih unit 
    const handleDeleteUnit = useCallback(oidunit => {
        idUnitSelected.current = idUnitSelected.current.filter(id => id !== oidunit).map(filter => filter)
        // mengurangi data terpilih dari list unit select
        setOptionsDataUnit([...optionsDataUnit, sourceDataUnit.current.filter(data => data.oidunitpo === oidunit).map(filter => filter)[0]])
        setUnitSelected(unitSelected.filter(data => data.oidunitpo !== oidunit).map(filter => filter))
    })

    // Function Handle ketika mengklik button SAVE

    const handleCreate = () => {
        setLoading(true);
        const dataPost = {
            manifestoid: value.maifestnumber.oid,
            bastdate: value.bastdate,
            vehiclepooid: idUnitSelected.current
        }
        console.log(dataPost);
        // post method
        api.post('/beritaacara', dataPost).then(res => {
            setAlert({
                isActived: true,
                code: 1,
                title: "Success",
                message: "Success Create B.A.S.T"
            })
            setTimeout(() => {
                navigate('/bast');
            }, 2000);
            console.log(res.data);
        }).catch(err => {
            setAlert({
                isActived: true,
                code: 1,
                title: "Failed",
                message: "Fail Create B.A.S.T"
            })
            console.log(err.response);
        }).finally(() => setLoading(false))
    }

    // ========================== END FUNCTION HANDLE ===========================================

    // ================================== Call Function ==================================

    const loadData = async () => {
        try {
            await api.get('/manifestlist').then(res => {
                setOptionsManifestNumber(res.data.map(data => {
                    return {
                        oid: data.oid,
                        name: (<div className='grid grid-cols-3'>
                            <span>{data.oid}</span>
                            <span className='text-center'>{data.manifestdate}</span>
                            <span>{data.origin} - {data.destination}</span>
                        </div>)
                    }
                }))
            })
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false)
        }
    }

    // ======================================= END CALL FUNCTION ======================================

    // ============================= Use Effect ===============================

    useEffect(() => {
        loadData()
    }, []);

    // ============================ END USE EFFECT ============================
    return (
        <>
            <div className="p-4">
                <div className="card drop-shadow-lg bg-white p-6">
                    {/* Title */}
                    <div className="flex justify-between items-center divider-bottom mb-12">
                        <div className="flex px-2 py-4 gap-x-2 items-center">
                            <Icon icon="fa-solid:truck-loading" className={`text-xl text-gold `} />
                            <span className="text-lg text-dark-green font-medium">B.A.S.T Create</span>
                        </div>
                        <div>
                            <button onClick={() => navigate(-1)} className="bg-slate-400 shadow-inner hover:bg-slate-500
                             text-white rounded flex 
                                items-center gap-x-1 py-[2px] px-4" >
                                <Icon icon="ph:skip-back-fill" className="text-base" />
                                <span className='text-base'>Back</span>
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6 mb-6">
                        <Select label="Manifest Number" useSelect={[value.maifestnumber, setValueManifestNumber]}
                            keyId="oid" keyName="name" options={optionsManifestNumber} className="capitalize"
                            catchSelect={handleManifestNumberInput} />
                        <FormInput label="Loading" refrence={loadingInput} tagId={"loading"} />
                    </div>
                    <div className="grid grid-cols-3 gap-6 mb-6">
                        <FormInput label="BOP Total" refrence={bopTotal} tagId={"boptotal"} />
                        <FormInput label="BOP Submission" refrence={bopSubmission} tagId={"bopsubmission"} />
                        <FormInput label="Oracle Number" refrence={oracleNumber} tagId={"oraclenumber"} />
                    </div>
                    {/* Data Unit */}
                    <div className="flex justify-between px-2 py-4 items-center divider-bottom mb-6 mt-8">
                        <div className="flex gap-x-2 items-center">
                            <Icon icon="fa6-solid:car-side" className={`text-xl text-gold `} />
                            <span className='text-lg text-dark-green font-medium'>Data Unit</span>
                        </div>
                    </div>
                    <TableSelect dataBody={unitSelected} handleAdd={handleOpenModalSelectUnit}
                        handleDelete={handleDeleteUnit} column={columnSelectUnitTable} keyId="oidunitpo" />
                    <div className="flex justify-end pr-6 mx-auto mt-10">
                        <button className={`bg-light-green hover:bg-green-700 text-white flex active:ring active:ring-green-300
                               focus:ring focus:ring-green-300 items-center gap-x-1 py-2 px-8 font-medium rounded`}
                            onClick={handleCreate}>
                            Save
                        </button>
                    </div>
                </div>
            </div>
            {/* Modal Sleect Data Unit*/}
            <Modal isOpen={openModalSelectUnit} setIsOpen={setOpenModalSelectUnit} title="Select Data Unit" >
                <Table dataBody={optionsDataUnit.map(option => {
                    return templateUnitSelect(option);
                })} column={columnTableModal} />
            </Modal>
            {/* Loading Page */}
            <Loading isLoading={loading} />
            <Alert isOpen={alert.isActived} codeAlert={alert.code} setIsOpen={setIsActivedAlert} title={alert.title}>
                {alert.message}
            </Alert>
        </>
    )
}

export default BastCreate