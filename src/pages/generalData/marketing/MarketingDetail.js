import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import Table from "../../../components/tables/Table";
import { api } from "../../../config";

const MarketingDetail = (props) => {
    const [dataUnit, setDataUnit] = useState([]);
    const {
        branch,
        ponumber,
        customer,
        contractno,
        contractname,
        contracttype,
        povalue
    } = props.data

    const headTable = [
        "Engine Number", "Frame Number", "Type", "Color", "Year", "Amount"
    ]
    const handleSave = e => {
        e.preventDefault()
    }

    useEffect(() => {
        api.get('/dataunit').then(res => {
            setDataUnit(res.data)
        }).catch(err => console.log(err.message))

    }, []);
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
                                <td className='pr-2 py-4'>{povalue}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="col-span-5 col-start-8">
                    <form >
                        <div className="flex flex-col gap-y-2">
                            <label htmlFor="engine_number" className='text-slate-600'>Engine Number</label>
                            <input type="text" id='engine_number' className='form-input text-sm p-2 w-full text-slate-600' />
                        </div>
                        <div className="flex flex-col gap-y-2 mt-4">
                            <label htmlFor="frame_number" className='text-slate-600'>Frame Number</label>
                            <input type="text" id='frame_number' className='form-input text-sm p-2 w-full text-slate-600' />
                        </div>
                        <div className="flex flex-col gap-y-2 mt-4">
                            <label htmlFor="type" className='text-slate-600'>Type</label>
                            <input type="text" id='type' className='form-input text-sm p-2 w-full text-slate-600' />
                        </div>
                        <div className="flex flex-col gap-y-2 mt-4">
                            <label htmlFor="color" className='text-slate-600'>Color</label>
                            <input type="text" id='color' className='form-input text-sm p-2 w-full text-slate-600' />
                        </div>
                        <div className="flex flex-col gap-y-2 mt-4">
                            <label htmlFor="year" className='text-slate-600'>Year</label>
                            <input type="text" id='year' className='form-input text-sm p-2 w-full text-slate-600' />
                        </div>
                        <div className="flex flex-col gap-y-2 mt-4">
                            <label htmlFor="amount" className='text-slate-600'>Amount</label>
                            <input type="text" id='amount' className='form-input text-sm p-2 w-full text-slate-600' />
                        </div>
                        <button className={`bg-light-green hover:bg-green-700 text-white rounded flex
                        items-center gap-x-1 py-1 px-4 mt-6`} onClick={handleSave}>Save</button>
                    </form>
                </div>
            </div>
            {/* Title */}
            <div className="flex justify-between px-2 py-4 items-center divider-bottom mb-6">
                <div className="flex gap-x-2 items-center">
                    <Icon icon="fa-solid:truck" className={`text-2xl text-gold `} />
                    <span className='text-lg text-dark-green font-medium'>Data Unit</span>
                </div>
                <button className={`bg-[#015796] hover:bg-blue-700 text-white rounded flex
                                items-center gap-x-1 py-1 px-4 `}>
                    <Icon icon="file-icons:microsoft-excel" className="text-base" />
                    <span className='text-base'>Upload</span>
                </button>
            </div>
            <Table dataBody={dataUnit} dataHead={headTable} id={null}
                loading={false} noAction={true} />
        </>
    )
}

export default MarketingDetail;