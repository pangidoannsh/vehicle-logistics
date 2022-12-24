import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import FormInput from "../../../../../components/inputs/FormInput";
import Modal from "../../../../../components/Modal";
import Select from "../../../../../components/inputs/Select";
import Table from "../../../../../components/tables/Table";
import { api } from "../../../../../config";
import TableSelect from "../../../../../components/inputs/TableSelect";
import { UserContext } from "../../../../../config/User";
import { useRef } from "react";
import { useCallback } from "react";
import Alert from "../../../../../components/Alert";
import Loading from "../../../../../components/Loading";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { fetchOption } from "../../../../../utils";

const columnTableModal = [
    { field: "enginenumber", header: "Engine Number" },
    { field: "framenumber", header: "Frame Number" },
    { field: "type", header: "Type" },
    { field: "color", header: "Color" },
    { field: "year", header: "Year" },
    { field: "amount", header: "Amount" },
    { field: "action", header: "#" }
]
const columnSelectUnit = [
    { field: "enginenumber", header: "Engine Number" },
    { field: "framenumber", header: "Frame Number" },
    { field: "type", header: "Type" },
    { field: "color", header: "Color" },
    { field: "year", header: "Year" },
    { field: "amount", header: "Amount" }
]

const ManifestCreate = () => {
    let navigate = useNavigate();
    const user = useContext(UserContext);
    // ====================== Template Object ==============================
    //  Plan Armada
    const planArmadaObject = useCallback(data => {
        const { oid, policenumber, hullnumber } = data;
        return {
            oid, planarmada: (
                <div className="grid grid-cols-2">
                    <span>{policenumber}</span>
                    <span >{hullnumber}</span>
                </div>
            )
        };
    })
    //  Data Unit
    const dataUnitObject = useCallback(data => {
        const { oid, enginenumber, framenumber, type, color, year, amount } = data;
        return { oid, enginenumber, framenumber, type, color, year, amount };
    })
    // ========================== END Template Object =======================
    const templateUnitSelect = useCallback(data => {
        const action = (
            <div className="text-center w-6">
                <button className="px-2 py-1 bg-light-green rounded-sm hover:bg-green-800
                                 active:bg-green-700 text-white"
                    onClick={() => handleSelectUnit(data.oid)}>
                    Select
                </button>
            </div>
        )
        return { ...data, action };
    });
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState({
        isActived: false,
        code: 0,
        title: "",
        message: ""
    });
    // data unit selected
    const sourceDataUnit = useRef([])
    const [unitSelect, setUnitSelect] = useState([]);
    const idUnitSelected = useRef([]);

    // options input
    const [optionsOrigin, setOptionsOrigin] = useState([]);
    const [optionsDestination, setOptionsDestination] = useState([]);
    const [optionsPlanArmada, setOptionsPlanArmada] = useState([]);
    const [optionsDataUnit, setOptionsDataUnit] = useState([]);
    const [openModalSelectUnit, setOpenModalSelectUnit] = useState(false);
    const [optionsDriver, setOptionsDriver] = useState([]);
    const [optionsPoCustomer, setOptionsPoCustomer] = useState([]);

    // =================== value input variables ========================
    const [value, setValue] = useState({
        driver: { oid: null, drivername: "nothing selected" },
        pocustomer: { oid: null, ponumber: "nothing selected" },
        origin: { key: null, name: "nothing selected" },
        destination: { key: null, name: "nothing selected" },
        deliverydate: "",
        planarmada: { oid: null, planarmada: "nothing selected" }
    })
    const setValuePlanArmada = newValue => setValue({ ...value, planarmada: newValue });
    const setValueDriver = newValue => setValue({ ...value, driver: newValue });
    const setValuePoCustomer = newValue => setValue({ ...value, pocustomer: newValue });
    const setValueOrigin = newValue => setValue({ ...value, origin: newValue });
    const setValueDestinantion = newValue => setValue({ ...value, destination: newValue });
    const setValueDeliveryDate = newValue => setValue({ ...value, deliverydate: newValue });
    // ================== end value input variable declare ====================


    // handle function
    const handleCreate = e => {
        e.preventDefault();
        const dataCreate = {
            user: user.id,
            branch: user.branch,
            origin: value.origin.key,
            destination: value.destination.key,
            deliverydate: value.deliverydate,
            driveroid: value.driver.oid,
            planoid: value.planarmada.oid,
            pocustomeroid: value.pocustomer.oid,
            vehiclepooid: idUnitSelected.current
        }
        // console.log(dataCreate);
        if (Object.values(dataCreate).findIndex(data => (data === "" || data === null)) !== -1) {
            setAlert({
                isActived: true,
                code: 0,
                title: "Can't Create",
                message: "There is an empty field input"
            })
            return;
        }
        setLoading(true);
        api.post('/manifest', dataCreate).then(res => {
            console.log(res);
            setLoading(false);
            setAlert({
                isActived: true,
                code: 1,
                title: "Success",
                message: "Success Create Manifest"
            })
            setTimeout(() => {
                navigate('/manifest');
            }, 2000);
        }).catch(err => {
            setLoading(false);
            setAlert({
                isActived: true,
                code: 0,
                title: "Error",
                message: "Failed Create Manifest"
            })
            console.log(err.response);
        })
    }

    const handleOpenModalSelectUnit = e => {
        e.preventDefault();
        setOpenModalSelectUnit(true);
    }

    const handlePoCustomerInput = id => {
        if (id !== null) {
            // sourceDataUnit.current = [];
            idUnitSelected.current = [];
            setUnitSelect([]);
            setOptionsDataUnit([]);
            api.get(`/vehiclepo/${id}`).then(res => {
                sourceDataUnit.current = res.data.map(data => {
                    return dataUnitObject(data);
                })
                setOptionsDataUnit(res.data.map(data => {
                    return dataUnitObject(data);
                }))
            }).catch(error => {
                console.log(error.response);
            })
        }
    }
    const handleSelectUnit = useCallback(oidunit => {
        // memasukan oidunit terpilih ke dalam list unit terpilih
        idUnitSelected.current = [...idUnitSelected.current, oidunit];
        // menambahkan data terpilih ke list unit select
        setUnitSelect([...unitSelect, sourceDataUnit.current.filter(data => data.oid === oidunit).map(filter => filter)[0]])
        // mengurangi data terpilih dari list option data unit
        setOptionsDataUnit(optionsDataUnit.filter(data => data.oid !== oidunit).map(filter => filter));
    })

    const handleDeleteUnit = useCallback(oidunit => {
        // console.log(oidunit);
        idUnitSelected.current = idUnitSelected.current.filter(id => id !== oidunit).map(filter => filter)
        // mengurangi data terpilih dari list unit select
        setOptionsDataUnit([...optionsDataUnit, sourceDataUnit.current.filter(data => data.oid === oidunit).map(filter => filter)[0]])
        setUnitSelect(unitSelect.filter(data => data.oid !== oidunit).map(filter => filter))
    })

    const loadData = async () => {
        await api.get('/planarmadalist').then(res => {
            setOptionsPlanArmada(res.data.map(data => {
                return planArmadaObject(data);
            }))

        }).catch(error => {
            console.log(error.response);
        });
        fetchOption('/driver', setOptionsDriver);
        fetchOption('/pocustomerlist', setOptionsPoCustomer);
        api.get('/origin').then(res => {
            setOptionsOrigin(res.data.map(data => {
                return { key: data.origin, name: data.origin };
            }))
        }).catch(error => {
            console.log(error.response);
            alert(error);
        })
        api.get('/destination').then(res => {
            setOptionsDestination(res.data.map(data => {
                return { key: data.destination, name: data.destination };
            }))
        }).catch(error => {
            console.log(error.response);
            alert(error);
        })
    }
    // get all data
    useEffect(() => {
        loadData()
    }, []);
    // render JSX
    return (
        <>
            <div className="p-4">
                <div className="card drop-shadow-lg bg-white p-6">
                    {/* Title */}
                    <div className="flex justify-between items-center divider-bottom mb-12">
                        <div className="flex px-2 py-4 gap-x-2 items-center">
                            <Icon icon="fa-solid:truck-loading" className={`text-xl text-gold `} />
                            <span className="text-lg text-dark-green font-medium">Manifest Create</span>
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

                    <div className="grid grid-cols-3 gap-6 mb-6">
                        <Select label="Origin" useSelect={[value.origin, setValueOrigin]} keyId="key" keyName="name"
                            options={optionsOrigin} />
                        <Select label="Destination" useSelect={[value.destination, setValueDestinantion]} keyId="key" keyName="name"
                            options={optionsDestination} />
                        <FormInput label="Delivery Date" setValue={setValueDeliveryDate} tagId={"deliverydate"} type="date" />
                        <Select label="Driver" useSelect={[value.driver, setValueDriver]} keyId="oid" keyName="drivername"
                            options={optionsDriver} className="capitalize" />
                        <Select label="Plan Armada" useSelect={[value.planarmada, setValuePlanArmada]} keyId="oid" keyName="planarmada"
                            options={optionsPlanArmada} className="capitalize" />
                        <Select label="PO Customer" useSelect={[value.pocustomer, setValuePoCustomer]} keyId="oid" keyName="ponumber"
                            options={optionsPoCustomer.map(option => {
                                return {
                                    oid: option.oid, ponumber: (
                                        <div className="grid grid-cols-2 text-start">
                                            <span>{option.oid}</span>
                                            <span>{option.ponumber}</span>
                                        </div>
                                    )
                                }
                            })} catchSelect={handlePoCustomerInput} />
                    </div>

                    {/* Data Unit */}
                    <div className="flex justify-between px-2 py-4 items-center divider-bottom mb-6 mt-8">
                        <div className="flex gap-x-2 items-center">
                            <Icon icon="fa6-solid:car-side" className={`text-xl text-gold `} />
                            <span className='text-lg text-dark-green font-medium'>Data Unit</span>
                        </div>
                    </div>
                    <TableSelect dataBody={unitSelect} handleAdd={handleOpenModalSelectUnit}
                        handleDelete={handleDeleteUnit} column={columnSelectUnit} />
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
            <Alert isOpen={alert.isActived} setIsOpen={isActived => setAlert({ ...alert, isActived })}
                title={alert.title} codeAlert={alert.code}>
                {alert.message}
            </Alert>
            <Loading isLoading={loading} />
        </>
    )
}

export default ManifestCreate;