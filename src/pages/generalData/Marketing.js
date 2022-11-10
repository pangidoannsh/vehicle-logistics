import { Icon } from '@iconify/react'
import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import Navbar from '../../components/Navbar'
import Table from '../../components/tables/Table'
import SearchTable from '../../components/tables/SearchTable'
import Modal from '../../components/Modal'
import { api } from '../../config'
import ErrorNetwork from '../../components/ErrorNetwork'
import Select from '../../components/Select'
import FormInput from '../../components/FormInput'


const Marketing = () => {
    const [loading, setLoading] = useState(true);
    // dataBody meruoakan data asli yang didapatkan dari consume API dan tidak diganggu gugat
    const [dataBody, setDataBody] = useState([]);
    // dataShow berfungsi sebagai data yang akan ditampilkan pada table, dapat berubah seperti untuk searcing dll
    const [dataShow, setDataShow] = useState([]);

    // untuk membuka dan menutup modal detail
    const [openModalDetail, setOpenModalDetail] = useState(false)
    // untuk membuka dan menutup modal detail
    const [openModalCreate, setOpenModalCreate] = useState(false)
    // untuk data yang akan ditampilkan Modal -> ModalContent
    const [dataModal, setDataModal] = useState({});
    const [isErrorNetwork, setIsErrorNetwork] = useState(false);
    // data untuk table head
    const headTable = [
        "Branch", "PO Number", "Customers", "Contract No", "Contract Name", "Contract Type", "Value"
    ]

    // penentuan id dari data yang ada di table
    const data_id = 'po_number'

    // untuk handle Open dari Modal PO Customer Detail
    const handleOpenModalDetail = e => {
        // console.log(e.target.name);
        setDataModal(dataBody.filter(data => data.po_number === e.target.name).map(filter => filter)[0]);
        setOpenModalDetail(true)
    }

    // use effect untuk consume API
    useEffect(() => {
        api.get('/pocustomer').then(res => {
            setDataBody(res.data)
            setLoading(false)
        }).catch(error => {
            // console.log(error);
            if (error.code === "ERR_NETWORK") {
                setIsErrorNetwork(true)
            }
        })
    }, []);

    // pemberian isi dari data show
    useEffect(() => {
        setDataShow(dataBody)
    }, [dataBody])

    return (
        <div id='container'>
            <Navbar />
            <div className="flex-1">
                <Header />
                <div className="content">
                    {/* After Header */}
                    <div className="flex justify-end items-center px-4 py-3 divider-top bg-white">
                        <button className={`bg-light-green hover:bg-green-700 text-white rounded flex
                                items-center gap-x-1 py-[2px] px-4 `} onClick={() => setOpenModalCreate(true)}>
                            <Icon icon="fluent:add-12-filled" className="text-base" />
                            <span className='text-base'>Create</span>
                        </button>
                    </div>

                    {/* Content */}
                    <div className="p-4 pb-14">
                        <div className="card bg-white p-6">
                            {/* Title */}
                            <div className="flex px-2 py-4 gap-x-2 items-center divider-bottom">
                                <Icon icon="fluent-mdl2:market" className={`text-2xl text-gold `} />
                                <span className='text-lg text-dark-green font-medium'>PO Customer</span>
                            </div>
                            {/* Search */}
                            <SearchTable setData={setDataShow} dataBody={dataBody} />
                            {/* Table */}
                            <Table dataBody={dataShow} dataHead={headTable} id={data_id}
                                loading={loading} handleClick={handleOpenModalDetail} actionInData={1}
                            />
                        </div>
                    </div>
                    {/* Modal Detail */}
                    <Modal isOpen={openModalDetail} setIsOpen={setOpenModalDetail} ModalContent={<ModalContentDetail data={dataModal} />}
                        title={"PO Customer Detail"} iconTitle={"ooui:view-details-ltr"}
                    />
                    {/* Modal Create */}
                    <Modal isOpen={openModalCreate} setIsOpen={setOpenModalCreate}
                        ModalContent={<ModalContentCreate setIsOpen={setOpenModalCreate} />} title={'New PO Customer'} size={700} />
                    <ErrorNetwork isOpen={isErrorNetwork} setIsOpen={setIsErrorNetwork} />
                </div>
            </div>
        </div>
    )
}
const ModalContentCreate = (props) => {
    const [valueBranch, setValueBranch] = useState(null);
    const [valuePoNumber, setValuePoNumber] = useState(null);
    const [valuePoValue, setValuePoValue] = useState(null);
    const handleClickCreate = e => {
        e.preventDefault()
    }
    return <>
        <div className="flex flex-col gap-y-6 pb-2">
            <FormInput label="PO Number" tagId="ponumber" setValue={setValuePoNumber} />
            <FormInput label="PO Value" tagId="povalue" setValue={setValuePoValue} />
            <Select label={"Branch"} setValue={setValueBranch} keyId={"branchid"} keyName={"branchname"} urlPath={'/branch'} />
            <Select label={"Contract Name"} setValue={setValueBranch} keyId={"contractid"} keyName={"contractname"} urlPath={'/contract'} />
            <div className="flex flex-col gap-2">
                <label htmlFor="remarks" className='text-slate-600 text-sm'>Remarks (Optional)</label>
                <textarea id="remarks" className="border px-4 py-2 border-template-input text-sm text-slate-700" rows="4"></textarea>
            </div>
        </div>
        <div className="flex justify-end gap-4 px-4 pt-6">
            <button className="text-green-600 py-2 px-4" onClick={() => props.setIsOpen(false)}>Close</button>
            <button type="Submit" onClick={handleClickCreate}
                className={`bg-light-green hover:bg-green-700 text-white rounded flex items-center gap-x-1 py-2 px-4 `}>
                Create New
            </button>
        </div>
    </>
}
const ModalContentDetail = (props) => {
    const [dataUnit, setDataUnit] = useState([]);
    const {
        branch,
        po_number,
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
                                <td className='pr-2 py-4'>{po_number}</td>
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

export default Marketing