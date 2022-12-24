import { Icon } from '@iconify/react';
import React from 'react';
import Table from '../../../../../components/tables/Table';
import { api } from '../../../../../config';
import { moneyFormat } from '../../../../../utils';

const columnTable = [
    { field: 'enginenumber', header: 'Engine Number' },
    { field: 'framenumber', header: 'Frame Number' },
    { field: 'unitbrand', header: 'Brand' },
    { field: 'type', header: 'Type' },
    { field: 'color', header: 'Color' },
    { field: 'year', header: 'Year' },
    { field: 'amount', header: 'Amount (Rp)' },
]

const DataUnitPO = ({ data, setData, setTotalPrice, fetchPoCustomer, setLoadingPage }) => {
    const handleEditUnit = oid => {
        console.log(oid);
    }

    const handleDeleteUnit = oid => {
        setLoadingPage(true);
        api.delete(`/vehiclepo/${oid}`).then(res => {
            console.log(res);
            setData(data.filter(unit => unit.oid !== oid).map(filter => filter));
            setTotalPrice(prev => Number(prev) - Number(data.filter(unit => unit.oid === oid).map(filter => filter.amount)[0]))
            fetchPoCustomer();
        }).catch(err => {
            console.log(err.response);
        }).finally(() => setLoadingPage(false))
    }
    return (
        <>
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
            <Table dataBody={data.map(data => { return { ...data, amount: moneyFormat(data.amount) } })}
                column={columnTable} id="oid" loading={false} handleActionEdit={handleEditUnit}
                handleActionDelete={handleDeleteUnit} />
        </>
    );
}

export default DataUnitPO;
