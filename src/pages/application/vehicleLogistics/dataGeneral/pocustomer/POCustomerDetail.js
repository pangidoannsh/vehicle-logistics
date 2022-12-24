import { useCallback } from "react";
import { useState, useRef, useContext } from "react";
import FormInput from "../../../../../components/inputs/FormInput";
import MoneyInput from "../../../../../components/inputs/MoneyInput";
import Select from "../../../../../components/inputs/Select";
import { api } from "../../../../../config";
import { UserContext } from "../../../../../config/User";
import { moneyFormat } from "../../../../../utils";
import DataUnitPO from "./DataUnitPO";

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
    // const refAmount = useRef();

    const {
        oid,
        branch,
        ponumber,
        customer,
        contractno,
        contractname,
        contracttype,
        value
    } = props.data

    const resetInput = useCallback(() => {
        refEngineNumber.current.value = "";
        refFrameNumber.current.value = "";
        refType.current.value = "";
        refColor.current.value = "";
        refYear.current.value = "";
        // refAmount.current.value = "";
        setValueAmount("");
    }, []);

    const handleCreateUnit = e => {
        e.preventDefault()
        // refresh alert dan loading
        setLoadingPage(true);
        setAlert(prev => ({ ...prev, isActive: false }));
        // menampung data baru
        const newData = {
            user: user.id,
            pocustomeroid: oid,
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
                setDataUnitPo([...dataUnitPo, newData]);
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

    return (
        <>
            <div className='grid grid-cols-12 px-2'>
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
                        <button className={`bg-light-green hover:bg-green-700 text-white rounded 
                        flex active:ring active:ring-green-200 focus:ring focus:ring-green-200 items-center 
                        gap-x-1 py-1 px-4 mt-6`} onClick={handleCreateUnit}>
                            Save
                        </button>
                    </form>
                </div>
            </div>
            {/* Title */}
            <DataUnitPO data={dataUnitPo} setData={setDataUnitPo} setTotalPrice={setTotalPrice}
                fetchPoCustomer={fetchPoCustomer} setLoadingPage={setLoadingPage} />
        </>
    )
}

export default POCustomerDetail;