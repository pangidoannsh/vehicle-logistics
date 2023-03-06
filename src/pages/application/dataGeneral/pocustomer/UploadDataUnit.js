import { Icon } from '@iconify/react';
import React, { useRef, useState } from 'react';
import { api } from '../../../../config';

const UploadDataUnit = ({ oidpocustomer, setAlert, setData, setIsOpen, setTotalAmount, fetchPoCustomer }) => {

    const [loadingCreate, setloadingCreate] = useState(false);
    const fileInputRef = useRef(null);

    const handleUpload = e => {
        e.preventDefault();
        setloadingCreate(true);
        setAlert(prev => ({ ...prev, isActived: false }));

        const dataPost = {
            oidpocustomer,
            file: fileInputRef.current.files[0]
        }
        // console.log(dataPost);
        api.post("/vehiclepo/import", dataPost, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }).then(res => {
            fetchPoCustomer();
            setData(res.data.unit);
            setTotalAmount(res.data.totalamount)
            setAlert({
                isActived: true,
                code: 1,
                title: "Success",
                message: "Import Data Unit Success"
            });
            setIsOpen(false);
            setTimeout(() => {
                setAlert(prev => ({ ...prev, isActived: false }))
            }, 3000)
        }).catch(err => {
            console.log(err.response);
            setAlert({
                isActived: true,
                code: 0,
                title: "Failed",
                message: "Import Data Unit Failed"
            });
        }).finally(() => setloadingCreate(false));

    }
    return (
        <div className='flex flex-col gap-4'>
            <div>
                <div className='text-sky-400 py-1 px-2 rounded text-sm bg-sky-100 mb-2'>
                    <span className='font-medium'>Noted: </span>
                    upload csv file for better uploading
                </div>
                <div className='flex flex-col gap-1'>
                    <label htmlFor="file" className='text-sm'>File Excel/CSV</label>
                    <input type="file" id='file' className='text-sm border border-slate-400 p-2 rounded'
                        ref={fileInputRef} />
                </div>
            </div>
            <div className="flex justify-end">
                <button className={`bg-light-green hover:bg-green-700 text-white rounded 
                                flex active:ring active:ring-green-200 focus:ring focus:ring-green-200 items-center 
                                gap-x-1 py-1 px-4 mt-6`} onClick={handleUpload} disabled={loadingCreate}>
                    {!loadingCreate ? <>
                        <span className='text-base'>Upload</span>
                    </> :
                        <div className='px-4'><Icon icon="eos-icons:loading" className='text-2xl' /></div>
                    }
                </button>
            </div>
        </div>
    );
}

export default UploadDataUnit;
