import { Icon } from "@iconify/react";
import { useCallback } from "react";
import { useState, useRef, useContext } from "react";
import FormInput from "../../../../../components/inputs/FormInput";
import Select from "../../../../../components/inputs/Select";
import Table from "../../../../../components/tables/Table";
import { api } from "../../../../../config";
import { UserContext } from "../../../../../config/User";
import { moneyFormat } from "../../../../../utils";

const columnTable = [
    { field: 'enginenumber', header: 'Engine Number' },
    { field: 'framenumber', header: 'Frame Number' },
    { field: 'unitbrand', header: 'Brand' },
    { field: 'type', header: 'Type' },
    { field: 'color', header: 'Color' },
    { field: 'year', header: 'Year' },
    { field: 'amount', header: 'Amount (Rp)' },
]

const POCustomerDetail = (props) => {
    const user = useContext(UserContext);
    const { dataUnitPo, setDataUnitPo, setSuccessCreate, setFailCreate, setMsgAlert, setLoadingPage, optionsBrand } = props
    const [valueBrand, setValueBrand] = useState("");
    // const [valueEngineNumber, setValueEngineNumber] = useState("");
    // const [valueFrameNumber, setValueFrameNumber] = useState("");
    // const [valueType, setValueType] = useState("");
    // const [valueColor, setValueColor] = useState("");
    // const [valueYear, setValueYear] = useState("");
    // const [valueAmount, setValueAmount] = useState("");
    const [totalPrice, setTotalPrice] = useState(props.data.value);

    const refEngineNumber = useRef();
    const refFrameNumber = useRef();
    const refType = useRef();
    const refColor = useRef();
    const refYear = useRef();
    const refAmount = useRef();

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
        refAmount.current.value = "";
    }, []);

    const handleCreateUnit = e => {
        e.preventDefault()
        // refresh alert dan loading
        setLoadingPage(true);
        setFailCreate(false);
        setSuccessCreate(false);
        // menampung data baru
        const newData = {
            user: user.id,
            pocustomeroid: oid,
            enginenumber: refEngineNumber.current.value.toUpperCase(),
            framenumber: refFrameNumber.current.value.toUpperCase(),
            unitbrand: valueBrand,
            type: refType.current.value.toUpperCase(),
            color: refColor.current.value.toUpperCase(),
            year: refYear.current.value.toUpperCase(),
            amount: refAmount.current.value,
        };
        api.post("/vehiclepo", newData).then(response => {
            if (response.status === 201) {
                console.log(response);
                setTotalPrice(Number(totalPrice) + Number(refAmount.current.value));
                setLoadingPage(false)
                setSuccessCreate(true);
                resetInput();
                setMsgAlert(["Success", "Data Unit PO Created"]);
                setDataUnitPo([...dataUnitPo, newData]);
                setTimeout(() => {
                    setSuccessCreate(false)
                }, 3000);
            }
        }).catch(error => {
            setLoadingPage(false);
            setFailCreate(true);
            const message = Object.values(error.response.data)[0][0];
            setMsgAlert([`Error ${error.response.status}`, message]);
            if (error.response.status !== 422) {
                console.log(error.response);
            }
        })
    }

    const handleEditUnit = oid => {
        console.log(oid);
    }
    const handleDeleteUnit = oid => {
        console.log(oid);
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
                            {/* <tr >
                                <td className='py-4'>Quantity</td>
                                <td className='pr-2 py-4'>{dataUnitPo.length}</td>
                            </tr> */}
                        </tbody>
                    </table>
                </div>
                <div className="col-span-5 col-start-8 pt-4">
                    <form >
                        <div className="flex flex-col gap-y-4">
                            <FormInput sizeLabel="text-base" label="Engine Number" tagId="enginenumber" refrence={refEngineNumber} />
                            <FormInput sizeLabel="text-base" label="Frame Number" tagId="framenumber" refrence={refFrameNumber} />
                            <div className="grid grid-cols-2 gap-x-2">
                                <Select label="Brand" setValue={setValueBrand} keyId="oid" keyName="name" options={optionsBrand} />
                                <FormInput sizeLabel="text-base" label="Type" tagId="type" refrence={refType} />
                            </div>
                            <div className="grid grid-cols-3 gap-x-2">
                                <FormInput sizeLabel="text-base" label="Color" tagId="color" refrence={refColor} />
                                <FormInput sizeLabel="text-base" label="Year" tagId="year" refrence={refYear} />
                                <FormInput sizeLabel="text-base" label="Amount" tagId="amount" refrence={refAmount} />
                            </div>
                        </div>
                        <button className={`bg-light-green hover:bg-green-700 text-white rounded flex active:ring active:ring-green-200
                        focus:ring focus:ring-green-200 items-center gap-x-1 py-1 px-4 mt-6`} onClick={handleCreateUnit}>Save</button>
                    </form>
                </div>
            </div>
            {/* Title */}
            <div className="flex justify-between px-2 py-4 items-center divider-bottom mb-6">
                <div className="flex gap-x-2 items-center">
                    <Icon icon="fa6-solid:car-side" className={`text-2xl text-gold `} />
                    <span className='text-lg text-dark-green font-medium'>Data Unit</span>
                </div>
                <button className={`bg-custom-blue hover:bg-blue-700 text-white rounded flex
                                items-center gap-x-1 py-1 px-4 `}>
                    <Icon icon="file-icons:microsoft-excel" className="text-base" />
                    <span className='text-base'>Upload</span>
                </button>
            </div>
            <Table dataBody={dataUnitPo.map(data => { return { ...data, amount: moneyFormat(data.amount) } })}
                column={columnTable} id="oid" loading={false} handleActionEdit={handleEditUnit}
                handleActionDelete={handleDeleteUnit} />
        </>
    )
}

export default POCustomerDetail;