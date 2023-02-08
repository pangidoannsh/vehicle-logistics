import { Icon } from '@iconify/react';
import React, { useRef, useState } from 'react';
import FormInput from '../../../../components/inputs/FormInput';
import { api } from '../../../../config';


const BastEdit = ({ currentData, reFetch, setAlert, setOpenModal }) => {
    const [loadingSubmit, setLoadingSubmit] = useState(false);
    const dateRef = useRef(null);

    const handleCreate = () => {
        setLoadingSubmit(true);
        setAlert(prev => ({ ...prev, isActived: false }))
        api.put(`/beritaacara/${currentData.oid}`, { bastdate: dateRef.current?.value })
            .then(res => {
                reFetch();
                setAlert({
                    isActived: true,
                    code: 1,
                    title: "Success",
                    message: "B.A.S.T Updated"
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
                    message: "B.A.S.T fail to update"
                })
                setTimeout(() => {
                    setAlert(prev => ({ ...prev, isActived: false }))
                }, 3000);
            }).finally(() => setLoadingSubmit(false))
    }
    return (
        <>
            <FormInput type="date" label="B.A.S.T Date" tagId="bastdate" refrence={dateRef}
                defaultValue={currentData ? currentData.bastdate : ''} />
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

export default BastEdit;
