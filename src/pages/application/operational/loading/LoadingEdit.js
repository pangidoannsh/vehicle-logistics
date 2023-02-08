import { Icon } from '@iconify/react';
import React, { useRef, useState } from 'react';
import FormInput from '../../../../components/inputs/FormInput';
import { api } from '../../../../config';

const LoadingEdit = ({ currentData, reFetch, setAlert, setOpenModal }) => {
    const [loadingSubmit, setLoadingSubmit] = useState(false);
    const dateRef = useRef(null);

    const handleCreate = e => {
        setLoadingSubmit(true);
        setAlert(prev => ({ ...prev, isActived: false }))
        api.put(`/loading/${currentData.oidloading}`, { loading_date: dateRef.current?.value })
            .then(res => {
                reFetch();
                setAlert({
                    isActived: true,
                    code: 1,
                    title: "Success",
                    message: "Loading Updated"
                })
                setOpenModal(false);
                setTimeout(() => {
                    setAlert(prev => ({ ...prev, isActived: false }))
                }, 3000)
            }).catch(err => {
                setAlert({
                    isActived: true,
                    code: 0,
                    title: "Error " + err.response.status,
                    message: "Loading fail to update"
                })
                setTimeout(() => {
                    setAlert(prev => ({ ...prev, isActived: false }))
                }, 3000);
            }).finally(() => setLoadingSubmit(false))
    }
    return (
        <>
            <FormInput type="date" label="Loading Date" tagId="loadingdate" refrence={dateRef}
                defaultValue={currentData ? currentData.loading_date : ''} />
            <div className="flex justify-end mt-6">
                <button type="Submit" onClick={handleCreate}
                    className="bg-light-green hover:bg-green-700 text-white rounded gap-x-1 py-2 px-4 
                    focus:ring focus:ring-green-200 active:ring active:ring-green-200 text-center">
                    {loadingSubmit ? <div className='px-2'><Icon icon="eos-icons:loading" className='text-2xl' /></div> : 'Save'}
                </button>
            </div>
        </>
    );
}

export default LoadingEdit;
