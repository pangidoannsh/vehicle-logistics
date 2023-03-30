import { Icon } from '@iconify/react';
import React, { useEffect, useState } from 'react';
import Table from '../../../../components/tables/Table';
import { api } from '../../../../config';
import { moneyFormat } from '../../../../utils';

const headerDisplay = [
    { field: "invoicenumber", header: "Invoice Number" },
    { field: "customer", header: "Customer" },
    { field: "salestax", header: "Sales Tax" },
    { field: "linetotal", header: "Line Total" },
    { field: "total", header: "Total" }
]
const columnTable = [
    { field: 'enginenumber', header: 'Engine Number' },
    { field: 'framenumber', header: 'Frame Number' },
    { field: 'unitbrand', header: 'Brand' },
    { field: 'type', header: 'Type' },
    { field: 'color', header: 'Color' },
    { field: 'year', header: 'Year' },
    { field: 'amount', header: 'Amount (Rp)' },
]
const amountDisplay = data => {
    return `Rp ${moneyFormat(data)}`;
}
const Invoice = ({ dataDetail, dataUnitInvoice }) => {

    return (
        <>
            {headerDisplay.map(data => (
                <div className='grid grid-cols-8 px-2 py-4 gap-x-2' key={data.field}>
                    <div className="col-span-1">{data.header}</div>
                    <div className="col-span-7">
                        {data.field === "total" || data.field === "salestax" || data.field === "linetotal" ?
                            amountDisplay(dataDetail[data.field]) : dataDetail[data.field]}
                    </div>
                </div>
            ))}
            <div className="flex justify-between px-2 py-4 items-center divider-bottom my-6">
                <div className="flex gap-x-2 items-center">
                    <Icon icon="fa6-solid:car-side" className={`text-2xl text-gold `} />
                    <span className='text-lg text-dark-green font-medium'>Data Unit Invoice</span>
                </div>
            </div>
            <Table dataBody={dataUnitInvoice.map(data => ({ ...data, amount: moneyFormat(data.amount) }))}
                column={columnTable} id="oidunitpo" loading={false} />
            <span className='text-slate-500'>Quantity : {dataUnitInvoice.length}</span>
        </>
    );
}

export default Invoice;
