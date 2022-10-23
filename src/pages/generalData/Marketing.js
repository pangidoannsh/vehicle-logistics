import { Icon } from '@iconify/react'
import React, { useState } from 'react'
import Header from '../../components/Header'
import Navbar from '../../components/Navbar'
import Table from '../../components/Table'

const Marketing = () => {
    const headTable = [
        "Branch", "PO Number", "Customers", "Contract No", "Contract Name", "Contract Type", "Value"
    ]
    const dataRow = [
        {
            branch: 'Kalla Branch',
            po_number: '23',
            customers: 'customer customer',
            contract_no: '1234XXX',
            contract_name: 'the contract 123',
            contract_type: 'type type',
            value: '25'
        },
        {
            branch: 'Kalla Branch',
            po_number: '23',
            customers: 'customer customer',
            contract_no: '1234XXX',
            contract_name: 'the contract 123',
            contract_type: 'type type',
            value: '25'
        },
        {
            branch: 'Kalla Branch',
            po_number: '23',
            customers: 'customer customer',
            contract_no: '1234XXX',
            contract_name: 'the contract 123',
            contract_type: 'type type',
            value: '25'
        },
        {
            branch: 'Kalla Branch',
            po_number: '23',
            customers: 'customer customer',
            contract_no: '1234XXX',
            contract_name: 'the contract 123',
            contract_type: 'type type',
            value: '25'
        },
        {
            branch: 'Kalla Branch',
            po_number: '23',
            customers: 'customer customer',
            contract_no: '1234XXX',
            contract_name: 'the contract 123',
            contract_type: 'type type',
            value: '25'
        },
        {
            branch: 'Kalla Branch',
            po_number: '23',
            customers: 'customer customer',
            contract_no: '1234XXX',
            contract_name: 'the contract 123',
            contract_type: 'type type',
            value: '25'
        },
        {
            branch: 'Kalla Branch',
            po_number: '23',
            customers: 'customer customer',
            contract_no: '1234XXX',
            contract_name: 'the contract 123',
            contract_type: 'type type',
            value: '25'
        },
        {
            branch: 'Kalla Branch',
            po_number: '23',
            customers: 'customer customer',
            contract_no: '1234XXX',
            contract_name: 'the contract 123',
            contract_type: 'type type',
            value: '25'
        },
        {
            branch: 'Kalla Branch',
            po_number: '23',
            customers: 'customer customer',
            contract_no: '1234XXX',
            contract_name: 'the contract 123',
            contract_type: 'type type',
            value: '25'
        },
        {
            branch: 'Kalla Branch',
            po_number: '23',
            customers: 'customer customer',
            contract_no: '1234XXX',
            contract_name: 'the contract 123',
            contract_type: 'type type',
            value: '25'
        },
        {
            branch: 'Kalla Branch',
            po_number: '23',
            customers: 'customer customer',
            contract_no: '1234XXX',
            contract_name: 'the contract 123',
            contract_type: 'type type',
            value: '25'
        },
        {
            branch: 'Kalla Branch',
            po_number: '23',
            customers: 'customer customer',
            contract_no: '1234XXX',
            contract_name: 'the contract 123',
            contract_type: 'type type',
            value: '25'
        },
        {
            branch: 'Kalla Branch',
            po_number: '23',
            customers: 'customer customer',
            contract_no: '1234XXX',
            contract_name: 'the contract 123',
            contract_type: 'type type',
            value: '25'
        },
        {
            branch: 'Kalla Branch',
            po_number: '23',
            customers: 'customer customer',
            contract_no: '1234XXX',
            contract_name: 'the contract 123',
            contract_type: 'type type',
            value: '25'
        },
        {
            branch: 'Kalla Branch',
            po_number: '23',
            customers: 'customer customer',
            contract_no: '1234XXX',
            contract_name: 'the contract 123',
            contract_type: 'type type',
            value: '25'
        },
        {
            branch: 'Kalla Branch',
            po_number: '23',
            customers: 'customer customer',
            contract_no: '1234XXX',
            contract_name: 'the contract 123',
            contract_type: 'type type',
            value: '25'
        },
        {
            branch: 'Kalla Branch',
            po_number: '23',
            customers: 'customer customer',
            contract_no: '1234XXX',
            contract_name: 'the contract 123',
            contract_type: 'type type',
            value: '25'
        },

    ]

    const [loading, setLoading] = useState(false);
    setTimeout(() => {
        setLoading(true)
    }, 1000);
    return (
        <div className="flex bg-body h-screen overflow-hidden">
            <Navbar />
            <div className="flex-1">
                <Header />
                <div id='content' className="max-h-[90vh] overflow-y-scroll">
                    {/* After Header */}
                    <div className="flex justify-end items-center px-4 py-3 divider-top bg-white">
                        <button className={`bg-light-green hover:bg-green-700 text-white rounded flex
                                items-center gap-x-1 py-[2px] px-4 `}>
                            <Icon icon="fluent:add-12-filled" className="text-base" />
                            <span className='text-base'>Create</span>
                        </button>
                    </div>

                    {/* Content */}
                    <div className="p-4 ">
                        <div className="card bg-white px-4 pb-4 pt-2">
                            {loading ?
                                <>
                                    {/* Title */}
                                    <div className="flex px-2 py-4 gap-x-2 items-center divider-bottom">
                                        <Icon icon="fluent-mdl2:market" className={`text-2xl text-gold `} />
                                        <span className='text-lg text-dark-green font-medium'>Marketing</span>
                                    </div>
                                    {/* Filter */}
                                    <div className="flex pt-6 pb-4">
                                        <input type="text" className={`text-base py-2 px-4 border-template text-slate-600`}
                                            placeholder='entry a search...' />
                                    </div>
                                    {/* Table */}
                                    <Table dataRow={dataRow} head={headTable} />
                                </>
                                : <Skeleton />}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
const Skeleton = () => {
    return (
        <>
            {/* Title */}
            <div className="flex px-2 py-4 gap-x-2 items-center divider-bottom">
                <div className={`w-6 h-6 rounded bg-slate-400 `} />
                <div className='flex font-medium'>
                    <div className='h-4 w-40 rounded bg-slate-400'></div>
                </div>
            </div>
            {/* Filter */}
            <div className="flex pt-6 pb-4">
                <div className='flex py-2 px-4 border-template '>
                    <div className='h-5'></div>
                </div>
            </div>
            {/* Table */}
            <table className='table-auto w-[100%]'>
                <thead>
                    <tr >
                        <th className='h-[53px] bg-slate-400'></th>
                        <th className='h-[53px] bg-slate-400'></th>
                        <th className='h-[53px] bg-slate-400'></th>
                        <th className='h-[53px] bg-slate-400'></th>
                        <th className='h-[53px] bg-slate-400'></th>
                        <th className='h-[53px] bg-slate-400'></th>
                    </tr>
                </thead>
                <tbody>
                    {[{}, {}, {}, {}, {}, {}, {}, {}, {}, {}].map((x, index) => (
                        <tr key={index}>
                            <td className='p-4 divider-bottom'>
                                <div className='bg-slate-400 rounded h-3 w-32'></div>
                            </td>
                            <td className='p-4 divider-bottom'>
                                <div className='bg-slate-400 rounded h-3 w-32'></div>
                            </td>
                            <td className='p-4 divider-bottom'>
                                <div className='bg-slate-400 rounded h-3 w-32'></div>
                            </td>
                            <td className='p-4 divider-bottom'>
                                <div className='bg-slate-400 rounded h-3 w-32'></div>
                            </td>
                            <td className='p-4 divider-bottom'>
                                <div className='bg-slate-400 rounded h-3 w-32'></div>
                            </td>
                            <td className='p-4 divider-bottom'>
                                <div className='bg-slate-400 rounded h-3 w-32'></div>
                            </td>
                        </tr>
                    ))}

                </tbody>
            </table>
        </>
    )
}

export default Marketing