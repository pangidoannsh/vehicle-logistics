import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import FormInput from "../../../../../components/inputs/FormInput";
import Modal from "../../../../../components/Modal";
import Select from "../../../../../components/inputs/Select";
import Table from "../../../../../components/tables/Table";
import { api } from "../../../../../config";
import Main from "../../../../../layouts/Main";
import TableSelect from "../../../../../components/inputs/TableSelect";
import { fetchOption } from "../../../../../Store";
import { useRef } from "react";
import { useCallback } from "react";


const ManifestCreate = () => {
    // ====================== Template Object ==============================
    //  Plan Armada
    const planArmadaObject = useCallback(data => {
        const { oid, branch, destination, plandate, payloadcomposition, policenumber, status } = data;
        return { oid, branch, destination, plandate, payloadcomposition, policenumber, status };
    })
    //  Data Unit
    const dataUnitObject = useCallback(data => {
        const { oid, enginenumber, framenumber, type, color, year, amount } = data;
        return { oid, enginenumber, framenumber, type, color, year, amount };
    })
    // ========================== END Template Object =======================

    // data unit selected
    const sourceDataUnit = useRef([])
    const [unitSelect, setUnitSelect] = useState([]);
    const idUnitSelected = useRef([]);

    // data plan armada
    const sourcePlanArmada = useRef([]);
    const [planSelect, setPlanSelect] = useState([]);
    const idPlanArmadaSelected = useRef("");

    // options input
    const [optionsPlanArmada, setOptionsPlanArmada] = useState([]);
    const [optionsDataUnit, setOptionsDataUnit] = useState([]);
    const [openModalSelectUnit, setOpenModalSelectUnit] = useState(false);
    const [openModalSelectPlanArmada, setOpenModalSelectPlanArmada] = useState(false);
    const [optionsDriver, setOptionsDriver] = useState([]);
    const [optionsPoCustomer, setOptionsPoCustomer] = useState([]);

    // =================== value input variables ========================
    const [value, setValue] = useState({
        driver: "",
        pocustomer: "",
        origin: "",
        destination: "",
        deliverydate: ""
    })
    const setValueDriver = newValue => setValue({ ...value, driver: newValue });
    const setValuePoCustomer = newValue => setValue({ ...value, pocustomer: newValue });
    const setValueOrigin = newValue => setValue({ ...value, origin: newValue });
    const setValueDestinantion = newValue => setValue({ ...value, destination: newValue });
    const setValueDeliveryDate = newValue => setValue({ ...value, deliverydate: newValue });
    // ================== end value input variable declare ====================

    const dataHeadUnit = useRef([
        "Engine Number", "Frame Number", "Type", "Color", "Year", "Amount", "#"
    ])
    const dataHeadPlanArmada = useRef([
        "Branch", "Destination", "Plan Date", "Payload Composition", "Police Number", "Status", "#"
    ])
    const dataHeadPlanArmadaSelect = useRef([
        "Branch", "Destination", "Plan Date", "Payload Composition", "Police Number", "Status"
    ])
    // handle function
    const handleCreate = e => {
        e.preventDefault();
        const dataCreate = {
            origin: value.origin,
            destination: value.destination,
            deliverydate: value.deliverydate,
            driver: value.driver,
            pocustomer: value.pocustomer,
            dataunit: idUnitSelected
        }
        console.log(dataCreate);
    }

    const handleOpenModalSelectUnit = e => {
        e.preventDefault();
        setOpenModalSelectUnit(true);
    }

    const handleOpenModalSelectPlanArmada = e => {
        e.preventDefault();
        setOpenModalSelectPlanArmada(true);
    }

    const handleSelectPlan = useCallback(oidplan => {
        idPlanArmadaSelected.current = oidplan;
        setPlanSelect(optionsPlanArmada.filter(data => data.oid === oidplan).map(dataFiltered => {
            return {
                ...dataFiltered, branch: (
                    <div className="flex justify-between w-full">
                        <span>{dataFiltered.branch}</span>
                        <button className="p-1 rounded border border-light-green"
                            onClick={handleOpenModalSelectPlanArmada}>
                            <Icon icon="akar-icons:more-horizontal" className=" text-light-green" />
                        </button>
                    </div>
                )
            };
        }));
        setOpenModalSelectPlanArmada(false);
    })

    const handlePoCustomerInput = id => {
        if (id !== null) {
            // sourceDataUnit.current = [];
            setUnitSelect([]);
            setOptionsDataUnit([]);
            // setOptionsDataUnit([]);
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
        await api.get('/planarmada').then(res => {
            // console.log('planarmada');
            setOptionsPlanArmada(res.data.map(data => {
                return planArmadaObject(data);
            }))

        }).catch(error => {
            console.log(error.response);
        });

        fetchOption('/driver', setOptionsDriver);
        fetchOption('/pocustomerlist', setOptionsPoCustomer);
        // await api.get("pocustomerlist").then(res => {
        //     setOptionsPoCustomer(res.data)
        //     // console.log('pocustomer');
        // }).catch(error => {
        //     if (error.code === "ERR_NETWORK") {
        //         alert('Periksa jaringan anda dan Reload Browser')
        //     }
        // })
        // console.log('test');
    }
    // get all data
    useEffect(() => {
        loadData()
    }, []);
    // render JSX
    return (
        <>
            <Main>
                <div className="p-4">
                    <div className="card drop-shadow-lg bg-white p-6">
                        {/* Title */}
                        <div className="flex px-2 pb-4 gap-x-2 items-center divider-bottom mb-12">
                            <Icon icon="eos-icons:init-container" className={`text-2xl text-gold `} />
                            <span className="text-lg text-dark-green font-medium">Manifest Create</span>
                        </div>

                        <div className="grid grid-cols-3 gap-6 mb-6">
                            <FormInput label="Origin" tagId="origin" setValue={setValueOrigin} value={value.origin} />
                            <FormInput label="Destination" tagId="destination" setValue={setValueDestinantion} value={value.destination} />
                            <FormInput label="Delivery Date" setValue={setValueDeliveryDate} tagId={"deliverydate"} type="date" />
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <Select label="Driver" setValue={setValueDriver} keyId="oid" keyName="drivername"
                                options={optionsDriver} className="capitalize" />
                            <Select label="PO Customer" setValue={setValuePoCustomer} keyId="oid" keyName="ponumber"
                                options={optionsPoCustomer.map(option => {
                                    return {
                                        oid: option.oid, ponumber: (
                                            <div className="flex justify-between w-[60%] text-start">
                                                <span>{option.oid}</span> |
                                                <span>{option.ponumber}</span>
                                            </div>
                                        )
                                    }
                                })} catchSelect={handlePoCustomerInput} />
                        </div>
                        {/* Plan Armada */}
                        <div className="flex justify-between px-2 py-4 items-center divider-bottom mb-6 mt-8">
                            <div className="flex gap-x-2 items-center">
                                <Icon icon="fa-solid:truck" className={`text-xl text-gold `} />
                                <span className='text-lg text-dark-green font-medium'>Data Plan Armada</span>
                            </div>
                        </div>
                        <TableSelect dataBody={planSelect} handleAdd={handleOpenModalSelectPlanArmada} singleData={true}
                            dataHead={dataHeadPlanArmadaSelect.current} dataHide={0} handleDelete={handleDeleteUnit}
                            noAction={true} />

                        {/* Data Unit */}
                        <div className="flex justify-between px-2 py-4 items-center divider-bottom mb-6 mt-8">
                            <div className="flex gap-x-2 items-center">
                                <Icon icon="fa6-solid:car-side" className={`text-xl text-gold `} />
                                <span className='text-lg text-dark-green font-medium'>Data Unit</span>
                            </div>
                        </div>
                        <TableSelect dataBody={unitSelect} handleAdd={handleOpenModalSelectUnit} dataHead={dataHeadUnit.current}
                            dataHide={0} handleDelete={handleDeleteUnit} />
                        <div className="flex justify-center mx-auto mt-10">
                            <button className={`bg-light-green hover:bg-green-700 text-white flex
                                items-center gap-x-1 py-2 px-8 font-medium rounded-sm`} onClick={handleCreate}>
                                <span className="text-base">Create</span>
                            </button>
                        </div>
                    </div>
                </div>
                {/* Modal Sleect Plan Armada*/}
                <Modal isOpen={openModalSelectPlanArmada} setIsOpen={setOpenModalSelectPlanArmada} title="Select Data Plan Armada" >
                    <Table dataBody={optionsPlanArmada.map(option => {
                        const action = (
                            <div className="text-center w-8">
                                <button className="px-2 py-1 bg-light-green rounded-sm hover:bg-green-800
                                 active:bg-green-700 text-white"
                                    onClick={() => handleSelectPlan(option.oid)}>
                                    Select
                                </button>
                            </div>
                        )
                        return { ...option, action };
                    })} noAction={true} dataHead={dataHeadPlanArmada.current} dataHide={0} />
                </Modal>

                {/* Modal Sleect Data Unit*/}
                <Modal isOpen={openModalSelectUnit} setIsOpen={setOpenModalSelectUnit} title="Select Data Unit" >
                    <Table dataBody={optionsDataUnit.map(option => {
                        const action = (
                            <div className="text-center w-3">
                                <button className="px-2 py-1 bg-light-green rounded-sm hover:bg-green-800
                                 active:bg-green-700 text-white"
                                    onClick={() => handleSelectUnit(option.oid)}>
                                    Select
                                </button>
                            </div>
                        )
                        return { ...option, action };
                    })} noAction={true} dataHead={dataHeadUnit.current} dataHide={0} />
                </Modal>
            </Main>
        </>
    )
}

export default ManifestCreate;