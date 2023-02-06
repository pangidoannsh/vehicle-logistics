import { Icon } from '@iconify/react';
import React from 'react';
import Table from '../../../../components/tables/Table';
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

const UnitBast = ({ data }) => {
    return (
        <>
            <div className="flex justify-between px-2 py-4 items-center divider-bottom my-6">
                <div className="flex gap-x-2 items-center">
                    <Icon icon="fa6-solid:car-side" className={`text-2xl text-gold `} />
                    <span className='text-lg text-dark-green font-medium'>Data Unit B.A.S.T</span>
                </div>
            </div>
            <Table dataBody={data.map(unit => ({
                ...unit, amount: moneyFormat(unit.amount)
            }))} column={columnTable} />
        </>
    );
}

export default UnitBast;
