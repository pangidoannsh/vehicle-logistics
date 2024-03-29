import { Icon } from '@iconify/react';
import React, { useState } from 'react';
import Modal from '../../../../components/Modal';
import Table from '../../../../components/tables/Table';
import { api } from '../../../../config';
import { moneyFormat } from '../../../../utils';
import UploadDataUnit from './UploadDataUnit';

const columnTable = [
    { field: 'enginenumber', header: 'Engine Number' },
    { field: 'framenumber', header: 'Frame Number' },
    { field: 'unitbrand', header: 'Brand' },
    { field: 'type', header: 'Type' },
    { field: 'color', header: 'Color' },
    { field: 'year', header: 'Year' },
    { field: 'amount', header: 'Amount (Rp)' },
]

const UnitPO = ({ data, setData, setTotalPrice, fetchPoCustomer, setLoadingPage, setFieldInput, setForm, setAlert, oidpocustomer }) => {
    const [openImportUnit, setOpenImportUnit] = useState(false);

    const handleEditUnit = oid => {
        document.getElementById("modal").scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        setForm(false);// untuk mengubah form menjadi form edit
        setFieldInput(data.filter(unit => unit.oid === oid).map(filter => filter)[0], oid);
    }
    const handleOpenUploadModal = () => {
        setOpenImportUnit(true);
    }
    const handleDeleteUnit = oid => {
        setLoadingPage(true);
        api.delete(`/vehiclepo/${oid}`).then(res => {
            console.log(res);
            setData(data.filter(unit => unit.oid !== oid).map(filter => filter));
            setTotalPrice(prev => Number(prev) - Number(data.filter(unit => unit.oid === oid).map(filter => filter.amount)[0]))
            fetchPoCustomer();
            setAlert({
                isActived: true,
                code: 1,
                title: "Success",
                message: "Data Unit Success Deleted"
            });
            setTimeout(() => {
                setAlert(prev => ({ ...prev, isActived: false }))
            }, 3000);
        }).catch(err => {
            if (err.response.status == 406) {
                setAlert({
                    isActived: true,
                    code: 2,
                    title: "Warning",
                    message: err.response.data.message
                })
            }
            else if (err.response.status < 500) {
                setAlert({
                    isActived: true,
                    code: 0,
                    title: `Error ${err.response.status}`,
                    message: "User Error"
                })
            } else {
                setAlert({
                    isActived: true,
                    code: 0,
                    title: `Error ${err.response.status}`,
                    message: "Server Error"
                })
            }
            setTimeout(() => {
                setAlert(prev => ({ ...prev, isActived: false }))
            }, 2000)
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
                <button className={`bg-custom-blue hover:bg-blue-900 text-white rounded flex
                                items-center gap-x-1 py-1 px-4 `}
                    onClick={handleOpenUploadModal}>
                    <Icon icon="file-icons:microsoft-excel" className="text-base" />
                    <span className='text-base'>Upload</span>
                </button>
            </div>
            <Table dataBody={data.map(data => { return { ...data, amount: moneyFormat(data.amount) } })}
                column={columnTable} id="oid" loading={false} handleActionEdit={handleEditUnit}
                handleActionDelete={handleDeleteUnit} />
            <Modal title="Import File Unit" isOpen={openImportUnit} setIsOpen={setOpenImportUnit} size={500}>
                <UploadDataUnit oidpocustomer={oidpocustomer} setAlert={setAlert} setData={setData} setIsOpen={setOpenImportUnit}
                    setTotalAmount={setTotalPrice} fetchPoCustomer={fetchPoCustomer} />
            </Modal>
        </>
    );
}

export default UnitPO;
