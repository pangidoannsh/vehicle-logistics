import { Icon } from "@iconify/react";
import { useEffect, useState, useRef, useContext } from "react";
import FormInput from "../../../../components/inputs/FormInput";
import Select from "../../../../components/inputs/Select";
import { api } from "../../../../config";
import TableSelect from "../../../../components/inputs/TableSelect";
import { UserContext } from "../../../../config/User";
import Loading from "../../../../components/Loading";
import { useNavigate } from "react-router-dom";
import { fetchOption } from "../../../../utils";
import { AlertContext } from "../../../../layouts/Main";

const columnSelectUnit = [
    { field: "enginenumber", header: "Engine Number" },
    { field: "framenumber", header: "Frame Number" },
    { field: "type", header: "Type" },
    { field: "color", header: "Color" },
    { field: "year", header: "Year" },
    { field: "amount", header: "Amount (Rp)" }
]
const planArmadaObject = data => {
    const { oid, policenumber, hullnumber, moda } = data;
    return {
        oid, planarmada: (
            <div className="grid grid-cols-3 text-sm">
                <span>{hullnumber}</span>
                <span>{policenumber}</span>
                <span>{moda}</span>
            </div>
        )
    };
};
const dataUnitObject = data => {
    const { oid, enginenumber, framenumber, type, color, year, amount } = data;
    return { oid, enginenumber, framenumber, type, color, year, amount };
}
const ManifestCreate = () => {
    let navigate = useNavigate();
    const user = useContext(UserContext);
    const [btnDisable, setBtnDisable] = useState(false);
    const [loading, setLoading] = useState(false);
    const [loadingTableUnit, setLoadingTableUnit] = useState(false);
    const [alert, setAlert] = useContext(AlertContext);
    // data unit selected
    const [sourceDataUnit, setSourceDataUnit] = useState([]);
    const idUnitSelected = useRef([]);

    // options input
    const [optionsOrigin, setOptionsOrigin] = useState([]);
    const [optionsDestination, setOptionsDestination] = useState([]);
    const [optionsPlanArmada, setOptionsPlanArmada] = useState([]);
    const [optionsDriver, setOptionsDriver] = useState([]);
    const [optionsPoCustomer, setOptionsPoCustomer] = useState([]);

    // =================== value input variables ========================
    const [value, setValue] = useState({
        plandriver: { oid: null, plandriver: "nothing selected" },
        pocustomer: { oid: null, ponumber: "nothing selected" },
        origin: { key: null, name: "nothing selected" },
        destination: { key: null, name: "nothing selected" },
        deliverydate: "",
        planarmada: { oid: null, planarmada: "nothing selected" }
    })
    const setValuePlanArmada = newValue => setValue({ ...value, planarmada: newValue });
    const setValueDriver = newValue => setValue({ ...value, plandriver: newValue });
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
            plandriveroid: value.plandriver.oid,
            planoid: value.planarmada.oid,
            pocustomeroid: value.pocustomer.oid,
            vehiclepooid: idUnitSelected.current
        }
        // console.log(dataCreate.vehiclepooid);
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
            // console.log(res);
            setBtnDisable(true);
            setLoading(false);
            setAlert({
                isActived: true,
                code: 1,
                title: "Success",
                message: "Success Create Manifest"
            })

            setTimeout(() => {
                navigate('/manifest');
                setAlert(prev => ({ ...prev, isActived: false }))
            }, 2000);
        }).catch(err => {
            setLoading(false);
            setAlert({
                isActived: true,
                code: 0,
                title: "Error " + err.response.status,
                message: "Failed Create Manifest"
            })
            console.log(err.response);
        })
    }

    const handlePoCustomerInput = id => {
        if (id !== null) {
            setSourceDataUnit([]);
            idUnitSelected.current = [];
            setLoadingTableUnit(true);
            api.get(`/vehiclepo/${id}?filter=po`).then(res => {
                setSourceDataUnit(res.data.map(data => {
                    return dataUnitObject(data);
                }))
            }).catch(error => {
                console.log(error.response);
            }).finally(() => setLoadingTableUnit(false))
        }
    }

    const loadData = async () => {
        setLoading(true);
        await api.get('/planarmadalist').then(res => {
            setOptionsPlanArmada(res.data.map(data => {
                return planArmadaObject(data);
            }))

        }).catch(error => {
            console.log(error.response);
        });
        await api.get('/plandriver').then(res => {
            setOptionsDriver(res.data.map(data => ({
                oid: data.oid, plandriver: (
                    <div className="grid grid-cols-2">
                        <span>{data.drivername}</span>
                        <span>{data.plandate.split(" ")[0] ?? data.plandate}</span>
                    </div>
                )
            })))
        }).catch(err => {
            console.log('error plandriver fetch', err.response);
        })
        fetchOption('/pocustomerlist', setOptionsPoCustomer);
        await api.get('/origin').then(res => {
            setOptionsOrigin(res.data.map(data => {
                return { key: data.origin, name: data.origin };
            }))
        }).catch(error => {
            console.log(error.response);
            // window.alert(error);
        })
        await api.get('/destination').then(res => {
            setOptionsDestination(res.data.map(data => {
                return { key: data.destination, name: data.destination };
            }))
        }).catch(error => {
            console.log(error.response);
            alert(error);
        }).finally(() => setLoading(false))
    }
    // get all data
    let mount = true;
    useEffect(() => {
        if (mount) {
            loadData()
        }
        return () => {
            mount = false;
        }
    }, []);
    // render JSX

    return (
        <>
            <div className="p-4">
                <div className="card drop-shadow-lg bg-white p-6">
                    {/* Title */}
                    <div className="flex justify-between items-center divider-bottom mb-12">
                        <div className="flex px-2 py-4 gap-x-2 items-center">
                            <Icon icon="bi:stack" className={`text-xl text-gold `} />
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
                        <Select label="Plan Driver" useSelect={[value.plandriver, setValueDriver]} keyId="oid" keyName="plandriver"
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
                    <TableSelect sourceDataOptions={sourceDataUnit} selectedData={idUnitSelected}
                        loading={loadingTableUnit} column={columnSelectUnit} keyId="oid" />
                    <div className="flex justify-end pr-6 mx-auto mt-10">
                        <button className={`bg-light-green hover:bg-green-700 text-white flex active:ring active:ring-green-300
                               focus:ring focus:ring-green-300 items-center gap-x-1 py-2 px-8 font-medium rounded`}
                            onClick={handleCreate} disabled={btnDisable}>
                            Save
                        </button>
                    </div>
                </div>
            </div>
            <Loading isLoading={loading} />
        </>
    )
}

export default ManifestCreate;