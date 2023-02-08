import { Icon } from '@iconify/react';
import React, { useRef, useState } from 'react';
import FormInput from '../../../../components/inputs/FormInput';
import { api } from '../../../../config';

const TransitoutEdit = ({ currentData, reFetch, setAlert }) => {
    const [loadingSubmit, setLoadingSubmit] = useState(false);
    const toDateRef = useRef(null);

    const handleCreate = e => {
        setLoadingSubmit(true);
        setAlert(prev => ({ ...prev, isActived: false }))
        api.put(`/transitout-detail/${currentData.oid}`, { transitout_date: toDateRef.current?.value })
            .then(res => {
                reFetch();
                setAlert({
                    isActived: true,
                    code: 1,
                    title: "Success",
                    message: "Transit Out Updated"
                })
                setTimeout(() => {
                    setAlert(prev => ({ ...prev, isActived: false }))
                }, 3000)
            }).catch(err => {
                setAlert({
                    isActived: true,
                    code: 0,
                    title: "Error " + err.response.status,
                    message: "Transit Out fail to update"
                })
                setTimeout(() => {
                    setAlert(prev => ({ ...prev, isActived: false }))
                }, 3000);
            }).finally(() => setLoadingSubmit(false))
    }
    return (
        <>
            <FormInput type="date" label="Transit Out Date" tagId="transitdate" refrence={toDateRef}
                defaultValue={currentData ? currentData.transitout_date : ''} />
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

export default TransitoutEdit;
