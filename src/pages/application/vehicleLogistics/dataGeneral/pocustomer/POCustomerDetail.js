import { useCallback } from "react";
import { useState, useRef, useContext } from "react";
import FormInput from "../../../../../components/inputs/FormInput";
import MoneyInput from "../../../../../components/inputs/MoneyInput";
import Select from "../../../../../components/inputs/Select";
import { api } from "../../../../../config";
import { UserContext } from "../../../../../config/User";
import { moneyFormat } from "../../../../../utils";
import UnitPO from "./UnitPO";

const POCustomerDetail = (props) => {
    const user = useContext(UserContext);
    const { dataUnitPo, setDataUnitPo, setAlert, setLoadingPage, optionsBrand, fetchPoCustomer } = props
    const [totalPrice, setTotalPrice] = useState(props.data.value);
    const [valueBrand, setValueBrand] = useState({ oid: null, name: "nothing selected" });
    const [valueAmount, setValueAmount] = useState("");
    const refEngineNumber = useRef();
    const refFrameNumber = useRef();
    const refType = useRef();
    const refColor = useRef();
    const refYear = useRef();

    const dataEditOid = useRef("");
    const framenumberEdit = useRef("");
    const [isCreate, setIsCreate] = useState(true);

    const {
        oid,
        branch,
        ponumber,
        customer,
        contractno,
        contractname,
        contracttype
    } = props.data

    const resetInput = useCallback(() => {
        refEngineNumber.current.value = "";
        refFrameNumber.current.value = "";
        refType.current.value = "";
        refColor.current.value = "";
        refYear.current.value = "";
        setValueAmount("");
        setValueBrand({ oid: null, name: "nothing selected" });
    }, []);

    const setFieldInput = useCallback(({ enginenumber, framenumber, type, color, year, amount, unitbrand }, oid) => {
        framenumberEdit.current = framenumber;
        dataEditOid.current = oid;
        refEngineNumber.current.value = enginenumber;
        refFrameNumber.current.value = framenumber;
        refType.current.value = type;
        refColor.current.value = color;
        refYear.current.value = year;
        setValueBrand({ oid: -1, name: unitbrand })
        setValueAmount(amount);
    }, []);

    const handleCreateUnit = e => {
        e.preventDefault()
        // refresh alert dan loading
        setLoadingPage(true);
        setAlert(prev => ({ ...prev, isActive: false }));
        // menampung data baru
        const newData = {
            oidpocustomer: oid,
            enginenumber: refEngineNumber.current.value.toUpperCase(),
            framenumber: refFrameNumber.current.value.toUpperCase(),
            unitbrand: valueBrand.oid,
            type: refType.current.value.toUpperCase(),
            color: refColor.current.value.toUpperCase(),
            year: refYear.current.value.toUpperCase(),
            amount: Number(valueAmount),
        };
        api.post("/vehiclepo", newData).then(response => {
            if (response.status === 201) {
                console.log(response);
                setTotalPrice(Number(totalPrice) + Number(valueAmount));
                setLoadingPage(false)
                resetInput();
                setAlert({
                    isActive: true,
                    code: 1,
                    title: "Success",
                    message: "Data Unit PO Created"
                })
                fetchPoCustomer();
                setDataUnitPo([...dataUnitPo, response.data]);
                setTimeout(() => {
                    setAlert(prev => ({ ...prev, isActive: false }))
                }, 3000);
            }
        }).catch(error => {
            setLoadingPage(false);
            if (error.response.status !== 422) {
                if (error.response.status >= 500) {
                    setAlert({
                        isActive: true,
                        code: 0,
                        title: `Error ${error.response.status}`,
                        message: "Server Error"
                    })
                }
                console.log(error.response);
            } else {
                const message = Object.values(error.response.data)[0][0];
                setAlert({
                    isActive: true,
                    code: 0,
                    title: `Error ${error.response.status}`,
                    message: message
                })
            }
        })
    }

    const handleEditUnit = e => {
        e.preventDefault();
        setLoadingPage(true);
        setAlert(prev => ({ ...prev, isActive: false }));
        // menampung data baru
        const dataUpdate = {
            old_framenumber: framenumberEdit.current,
            enginenumber: refEngineNumber.current.value.toUpperCase(),
            framenumber: refFrameNumber.current.value.toUpperCase(),
            unitbrand: valueBrand.oid,
            type: refType.current.value.toUpperCase(),
            color: refColor.current.value.toUpperCase(),
            year: refYear.current.value.toUpperCase(),
            amount: Number(valueAmount),
        };

        api.put(`/vehiclepo/${dataEditOid.current}`, dataUpdate).then(response => {
            setAlert({
                isActive: true,
                code: 1,
                title: "Success",
                message: "Update Data Unit Success"
            });
            fetchPoCustomer();
            const indexDataEdit = dataUnitPo.findIndex(data => data.oid === dataEditOid.current);
            const updatedData = { ...dataUnitPo[indexDataEdit], ...dataUpdate, unitbrand: valueBrand.name };

            if (indexDataEdit === 0) {
                setDataUnitPo([updatedData, ...dataUnitPo.slice(1)]);
            } else {
                setDataUnitPo([...dataUnitPo.slice(0, indexDataEdit), updatedData, ...dataUnitPo.slice(indexDataEdit + 1)])
            }
            // set po value
            setTotalPrice(dataUnitPo.filter(data => data.oid !== dataEditOid.current)
                .reduce((total, unit) => total + unit.amount, 0) + dataUpdate.amount)
            setTimeout(() => {
                setAlert(prev => ({ ...prev, isActive: false }))
            }, 3000);
            setIsCreate(true);
            resetInput();
        }).catch(error => {
            console.log(error.response);
            if (error.response.status < 500) {
                setAlert({
                    isActive: true,
                    code: 0,
                    title: `Error ${error.response.status}`,
                    message: "Error User"
                })
            } else {
                setAlert({
                    isActive: true,
                    code: 0,
                    title: `Error ${error.response.status}`,
                    message: "Server Error"
                })
            }
        }).finally(() => {
            setLoadingPage(false);
        })
    }

    const cancelEdit = e => {
        e.preventDefault();
        setIsCreate(true);
        resetInput();
    }
    return (
        <>
            <div className='grid grid-cols-12 px-2 mb-4'>
                <div className="col-span-4 col-start-1">
                    <table className='w-full table-auto text-slate-700'>
                        <tbody>
                            <tr>
                                <td className='py-4'>Branch</td>
                                <td className='pr-2 py-4'>{branch}</td>
                            </tr>
                            <tr >
                                <td className='py-4'>PO Number</td>
                                <td className='pr-2 py-4'>{ponumber}</td>
                            </tr>
                            <tr >
                                <td className='py-4'>Customer</td>
                                <td className='pr-2 py-4'>{customer}</td>
                            </tr>
                            <tr >
                                <td className='py-4'>Contract No</td>
                                <td className='pr-2 py-4'>{contractno}</td>
                            </tr>
                            <tr >
                                <td className='py-4'>Contract Name</td>
                                <td className='pr-2 py-4'>{contractname}</td>
                            </tr>
                            <tr >
                                <td className='py-4'>Contract Type</td>
                                <td className='pr-2 py-4'>{contracttype}</td>
                            </tr>
                            <tr >
                                <td className='py-4'>Value</td>
                                <td className='pr-2 py-4'>Rp {moneyFormat(totalPrice)}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="col-span-5 col-start-8 pt-4">
                    <form >
                        <div className="flex flex-col gap-y-4">
                            <FormInput sizeLabel="text-base" label="Engine Number" tagId="enginenumber" refrence={refEngineNumber} />
                            <FormInput sizeLabel="text-base" label="Frame Number" tagId="framenumber" refrence={refFrameNumber} />
                            <div className="grid grid-cols-2 gap-x-2">
                                <Select label="Brand" useSelect={[valueBrand, setValueBrand]} keyId="oid" keyName="name" options={optionsBrand} />
                                <FormInput sizeLabel="text-base" label="Type" tagId="type" refrence={refType} />
                            </div>
                            <div className="grid grid-cols-3 gap-x-2">
                                <FormInput sizeLabel="text-base" label="Color" tagId="color" refrence={refColor} />
                                <FormInput sizeLabel="text-base" label="Year" tagId="year" refrence={refYear} />
                                <MoneyInput sizeLabel="text-base" label="Amount" tagId="amount"
                                    value={valueAmount} setValue={setValueAmount} />
                            </div>
                        </div>
                        {isCreate ?
                            <button className={`bg-light-green hover:bg-green-700 text-white rounded 
                                flex active:ring active:ring-green-200 focus:ring focus:ring-green-200 items-center 
                                gap-x-1 py-1 px-4 mt-6`} onClick={handleCreateUnit}>
                                Save
                            </button> :
                            <div className="flex gap-x-4 mt-6">
                                <button className={`bg-gold hover:bg-yellow-600 text-white rounded 
                                active:ring active:ring-yellow-200 focus:ring focus:ring-yellow-200
                                gap-x-1 py-1 px-4`} onClick={handleEditUnit}>
                                    Update
                                </button>
                                <span className={`text-gold hover:text-yellow-600 rounded py-1 px-4 cursor-pointer`}
                                    onClick={cancelEdit}>
                                    Cancel
                                </span>
                            </div>
                        }
                    </form>
                </div>
            </div>
            {/* Title */}
            <UnitPO data={dataUnitPo} setData={setDataUnitPo} setTotalPrice={setTotalPrice} setForm={setIsCreate}
                fetchPoCustomer={fetchPoCustomer} setLoadingPage={setLoadingPage} setFieldInput={setFieldInput} setAlert={setAlert} />
        </>
    )
}

export default POCustomerDetail;