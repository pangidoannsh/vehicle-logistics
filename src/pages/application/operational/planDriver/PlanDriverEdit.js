import { Icon } from '@iconify/react';
import { useEffect, useRef, useState } from 'react'
import FormInput from '../../../../components/inputs/FormInput';
import Select from '../../../../components/inputs/Select';
import { api } from '../../../../config';

export default function PlanDriverEdit({ driverOptions = [], currentData, setIsOpen, setAlert, setData }) {
    const [loadingSubmit, setloadingSubmit] = useState(false);
    const [driverInput, setdriverInput] = useState({ oid: null, drivername: 'nothing selected' });
    const planDateRef = useRef(null);

    useEffect(() => {
        setdriverInput({ oid: currentData.driverid, drivername: currentData.drivername });
    }, [currentData]);
    function handleSubmit(e) {
        e.preventDefault();
        setloadingSubmit(true);
        const dataUpdate = {
            driver: driverInput.oid,
            plandate: planDateRef.current.value
        }
        console.log(dataUpdate);
        api.put(`plandriver/${currentData.oid}`, dataUpdate).then(res => {
            setData(prev => prev.map(data => data.oid === currentData.oid ? res.data : data));
            setAlert({
                isActived: true,
                code: 1,
                title: "Success",
                message: "Plan Driver Updated"
            })
            setTimeout(() => {
                setAlert(prev => ({ ...prev, isActived: false }))
            }, 3000);
            setIsOpen(false)
        }).catch(err => {
            console.log(err.response);
            setAlert({
                isActived: true,
                code: 0,
                title: "Error " + err.response.status,
                message: "Failed to Update Plan Driver"
            })
            setTimeout(() => {
                setAlert(prev => ({ ...prev, isActived: false }))
            }, 3000);
        }).finally(() => setloadingSubmit(false))
    }
    return (
        <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-y-6 pb-2">
                <Select options={driverOptions} useSelect={[driverInput, setdriverInput]} keyId="oid" keyName="drivername"
                    label="Driver" />
                <FormInput label="Plan Date" refrence={planDateRef} tagId="plandateinput" type="date"
                    defaultValue={currentData.plandate} />
            </div>
            <div className="flex justify-end gap-4 px-4 pt-6">
                <div className="text-gold py-2 px-4 cursor-pointer" onClick={() => setIsOpen(false)}>Close</div>
                <button type="Submit" disabled={loadingSubmit}
                    className={`bg-gold hover:bg-yellow-700 text-white rounded flex items-center gap-x-1 py-2 px-4 `}>
                    {!loadingSubmit ? <div>Update</div> :
                        <div className='px-2'>
                            <Icon icon="eos-icons:loading" className='text-2xl' />
                        </div>}
                </button>
            </div>
        </form>
    )
}
