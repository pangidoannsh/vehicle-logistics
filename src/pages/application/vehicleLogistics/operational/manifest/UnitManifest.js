import { Icon } from '@iconify/react';
import React, { useState } from 'react';
import { useRef } from 'react';
import Modal from '../../../../../components/Modal';
import Table from '../../../../../components/tables/Table';
import { api } from '../../../../../config';
import { moneyFormat } from '../../../../../utils';
import UnitManfestEdit from './UnitManfestEdit';

const columnTable = [
    { field: 'enginenumber', header: 'Engine Number' },
    { field: 'framenumber', header: 'Frame Number' },
    { field: 'unitbrand', header: 'Brand' },
    { field: 'type', header: 'Type' },
    { field: 'color', header: 'Color' },
    { field: 'year', header: 'Year' },
    { field: 'amount', header: 'Amount (Rp)' },
]

const UnitManifest = ({ data, setData, setAlert }) => {
    const oidDelete = useRef(null);
    const [isUpdate, setIsUpdate] = useState(false);
    const [openModalDelete, setOpenModalDelete] = useState(false);
    const handleDeleteUnit = oid => {
        if (oid) {
            oidDelete.current = oid;
            setOpenModalDelete(true);
        }
    }
    const handleDelete = () => {
        if (oidDelete.current) {
            setAlert(current => ({ ...current, isActived: false }))
            api.delete(`manifestdetail/${oidDelete.current}`).then(res => {
                // console.log(res.data);
                setAlert({
                    isActived: true,
                    code: 1,
                    title: "Success",
                    message: "Data Unit Manifest detail Deleted"
                })
                setTimeout(() => {
                    setAlert(current => ({ ...current, isActived: false }))
                }, 2000)
                setData(data.filter(unit => unit.oidunitpo !== oidDelete.current).map(filter => filter));
            }).catch(err => {
                console.log(err.response);
                setAlert({
                    isActived: true,
                    code: 0,
                    title: "Error " + err.response.status,
                    message: "Failed Delete Data Unit Manifest"
                })
            }).finally(() => setOpenModalDelete(false))
        }
    }
    return (
        <>
            <div className="flex justify-between px-2 py-4 items-center divider-bottom my-6">
                <div className="flex gap-x-2 items-center">
                    <Icon icon="fa6-solid:car-side" className={`text-2xl text-gold `} />
                    <span className='text-lg text-dark-green font-medium'>Data Unit Manifest</span>
                </div>
            </div>
            {!isUpdate ? <Table dataBody={data.map(data => { return { ...data, amount: moneyFormat(data.amount) } })}
                column={columnTable} id="oidunitpo" loading={false} handleActionDelete={handleDeleteUnit} /> :
                <UnitManfestEdit />}

            {/* Modal Konfirmasi Delete Manifest Detail (Data Unit) */}
            <Modal isOpen={openModalDelete} setIsOpen={setOpenModalDelete} title="Delete Manifest" size={500}>
                <div className='text-slate-600 text-xl font-medium'>
                    Are you sure want to <span className="text-red-600">Delete</span> this Data Unit ?
                </div>
                <div className="flex justify-end gap-x-4 mt-4">
                    <button className={`text-slate-500 hover:text-slate-600 items-center gap-x-1 py-2 px-4 `}
                        onClick={() => setOpenModalDelete(false)}>
                        Cancel
                    </button>
                    <button type="Submit" className={`border border-red-600 text-red-600 rounded flex items-center gap-x-1 py-2 px-4 
                            focus:ring focus:ring-red-200 active:ring active:ring-red-200`} onClick={handleDelete}>
                        Delete
                    </button>
                </div>
            </Modal>
        </>
    );
}

export default UnitManifest;
