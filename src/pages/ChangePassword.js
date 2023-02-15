import { Icon } from '@iconify/react';
import React, { useContext, useRef, useState } from 'react';
import FormInput from '../components/inputs/FormInput';
import PasswordInput from '../components/inputs/PasswordInput';
import { api } from '../config';
import { AlertContext } from '../layouts/Main';

const ChangePassword = () => {
    const [loadingSubmit, setLoadingSubmit] = useState(false);
    const oldPassRef = useRef(null);
    const newPassRef = useRef(null);
    const confirmPassRef = useRef(null);

    const [alert, setAlert] = useContext(AlertContext);

    const handleSubmit = e => {
        e.preventDefault();
        if (newPassRef.current.value !== "") {
            if (newPassRef.current.value === confirmPassRef.current.value) {
                setLoadingSubmit(true);
                const dataPost = {
                    oldpassword: oldPassRef.current.value,
                    newpassword: newPassRef.current.value
                }
                // console.log(dataPost);
                api.put("/change-password", dataPost).then(res => {
                    setAlert({
                        isActived: true,
                        code: 1,
                        title: "Success",
                        message: "Password Changed"
                    })
                    setTimeout(() => {
                        setAlert(prev => ({ ...prev, isActived: false }))
                    }, 3000)
                }).catch(err => {
                    setAlert({
                        isActived: true,
                        code: 0,
                        title: "Error" + err.response.status,
                        message: err.response.data.message
                    })
                    setTimeout(() => {
                        setAlert(prev => ({ ...prev, isActived: false }))
                    }, 3000)
                }).finally(() => setLoadingSubmit(false));
            }
            else {
                setAlert({
                    isActived: true,
                    code: 0,
                    title: "Failed",
                    message: "Confirm Password not match"
                })
            }
        }
        else {
            setAlert({
                isActived: true,
                code: 0,
                title: "Failed",
                message: "New password is empty"
            })
        }

    }
    return (
        <div className='p-4'>
            <form onSubmit={handleSubmit}>
                <div className='card p-6 '>
                    <h3 className='text-xl font-medium'>Change Password</h3>
                    <div className="flex flex-col gap-4 mt-6">
                        <PasswordInput label="Old Password" width="50%" refrence={oldPassRef} type="password" tagId="old" />
                        <PasswordInput label="New Password" width="50%" refrence={newPassRef} type="password" tagId="new" />
                        <PasswordInput label="Confirm New Password" width="50%" refrence={confirmPassRef} type="password" tagId="confirm" />
                    </div>
                    <button type="Submit" className={`bg-light-green mt-6 hover:bg-green-700 text-white rounded flex 
                    items-center gap-x-1 py-2 px-4 focus:ring focus:ring-green-200 active:ring active:ring-green-200`}>
                        {!loadingSubmit ? <>
                            <span className='text-base'>Save</span>
                        </> :
                            <div className='px-2 text-2xl'><Icon icon="eos-icons:loading" /></div>
                        }
                    </button>
                </div>
            </form>

        </div>
    );
}

export default ChangePassword;
