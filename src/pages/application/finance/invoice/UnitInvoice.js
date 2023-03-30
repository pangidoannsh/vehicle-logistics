import { Icon } from '@iconify/react';
import React, { useState } from 'react';
import { useRef } from 'react';
import TableSelect from '../../../../components/inputs/TableSelect';
import Modal from '../../../../components/Modal';
import Table from '../../../../components/tables/Table';
import { api } from '../../../../config';
import { moneyFormat } from '../../../../utils';

const columnTable = [
    { field: 'enginenumber', header: 'Engine Number' },
    { field: 'framenumber', header: 'Frame Number' },
    { field: 'unitbrand', header: 'Brand' },
    { field: 'type', header: 'Type' },
    { field: 'color', header: 'Color' },
    { field: 'year', header: 'Year' },
    { field: 'amount', header: 'Amount (Rp)' },
]
const displayData = datas => {
    return datas.map(data => {
        return { ...data, amount: moneyFormat(data.amount) };
    });
}

const UnitInvoice = ({ data, setData, setAlert, oidPo, oidManifest, setTotalAmount }) => {
    const [loading, setLoading] = useState(false);

    return (
        <>
            <div className="flex justify-between px-2 py-4 items-center divider-bottom my-6">
                <div className="flex gap-x-2 items-center">
                    <Icon icon="fa6-solid:car-side" className={`text-2xl text-gold `} />
                    <span className='text-lg text-dark-green font-medium'>Data Unit Invoice</span>
                </div>
            </div>
        </>
    );
}

export default UnitInvoice;
