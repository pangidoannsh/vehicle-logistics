import { Icon } from '@iconify/react';
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Alert from '../components/Alert';
import InputBranch from '../components/inputs/InputBranch';
import PasswordInput from '../components/inputs/PasswordInput';
import { api } from '../config';
import Sign from '../layouts/Sign';
const branchGet = data => {
    return { oid: data.oid, branch: data.branchname };
}
export default function Register() {
    let navigate = useNavigate();
    const [valueBranch, setvalueBranch] = useState(null);
    const [loadingBtn, setLoadingBtn] = useState(false);
    const [optionsBranch, setOptionsBranch] = useState([]);
    const [alert, setAlert] = useState({
        isActived: false,
        code: 0,
        title: "title",
        message: "message"
    });
    const refName = useRef(null);
    const refEmail = useRef(null);
    const refPass = useRef(null);
    const refPassConfirmed = useRef(null);
    const resetInput = () => {
        setvalueBranch(null);
        refName.current.value = ""
        refEmail.current.value = ""
        refPass.current.value = ""
        refPassConfirmed.current.value = ""
    }
    const handleSubmit = e => {
        e.preventDefault();
        const dataRegister = {
            branchoid: valueBranch,
            username: refName.current.value,
            email: refEmail.current.value,
            password: refPass.current.value
        };
        if (Object.values(dataRegister).findIndex(data => data === "" || data === null) === -1) {
            if (refPass.current.value === refPassConfirmed.current.value) {
                setLoadingBtn(true)
                api.post("/register", dataRegister).then(res => {
                    setAlert({
                        isActived: true,
                        code: 1,
                        title: "Register Success",
                        message: "Will redirect to Login"
                    })
                    resetInput();
                    setTimeout(() => {
                        navigate('/login');
                    }, 3000);
                }).catch(error => {
                    console.log(error.response);
                    setAlert({
                        isActived: true,
                        code: 0,
                        title: "Error" + error.response.status,
                        message: "Register Failed"
                    })
                    setTimeout(() => {
                        setAlert(prev => ({ ...prev, isActived: false }));
                    }, 3000);
                }).finally(() => {
                    setLoadingBtn(false)
                })
            }
            else {
                setAlert({
                    isActived: true,
                    code: 0,
                    title: "Register Failed",
                    message: "Confirmed Password and Password input is different"
                })
                setTimeout(() => {
                    setAlert(prev => ({ ...prev, isActived: false }));
                }, 3000);
            }
        } else {
            setAlert({
                isActived: true,
                code: 0,
                title: "Register Failed",
                message: "there are empty field"
            })
            setTimeout(() => {
                setAlert(prev => ({ ...prev, isActived: false }));
            }, 3000);
        }
    }
    useEffect(() => {
        api.get("branchlist").then(res => {
            setOptionsBranch(res.data.map(data => branchGet(data)));
        }).catch(error => {
            setAlert({
                isActived: true,
                code: 0,
                title: "Error" + error.response.status,
                message: "Register Failed"
            })
        })
        return () => {

        };
    }, []);
    return (
        <>
            <Sign>
                <form className='py-6' onSubmit={handleSubmit}>
                    <InputBranch options={optionsBranch} setValue={setvalueBranch} />
                    {/* Input Name */}
                    <div className="relative mb-8">
                        <input id='name' type="text" className='focus:outline-none bg-transparent p-1 focus:rounded
                                        border-b border-b-slate-400 w-full text-slate-400 focus:text-slate-600 peer'
                            placeholder=" " ref={refName} />
                        <div className='absolute bottom-0 duration-300 w-0 peer-focus:w-full h-[2px] bg-light-green'></div>
                        <label htmlFor="name" className="floating-label font-medium">Name</label>
                    </div>
                    {/* Input Email */}
                    <div className="relative mb-8">
                        <input id='email' type="text" className='focus:outline-none bg-transparent p-1 focus:rounded
                                        border-b border-b-slate-400 w-full text-slate-400 focus:text-slate-600 peer '
                            placeholder=" " ref={refEmail} />
                        <div className='absolute bottom-0 duration-300 w-0 peer-focus:w-full h-[2px] bg-light-green'></div>
                        <label htmlFor="email" className="floating-label font-medium">Email</label>
                    </div>
                    {/* Input Password */}
                    <PasswordInput id="password" className="mb-8" refrence={refPass} login>Password</PasswordInput>
                    <PasswordInput id="confirmpassword" className="mb-8" refrence={refPassConfirmed} login>Confirm Password</PasswordInput>
                    {/* Login Button */}
                    <button className='bg-light-green hover:bg-green-600 active:ring-4 active:ring-green-300 focus:ring-4 focus:ring-green-300
                rounded py-2 px-4 text-white font-medium tracking-[.25em] relative'>
                        {loadingBtn ? <div className='px-4 text-xl'><Icon icon="eos-icons:loading" /></div> : 'REGISTER'}
                    </button>
                </form>
            </Sign>
            <Alert isOpen={alert.isActived} setAlert={isActived => setAlert(prev => ({ ...prev, isActived }))}
                codeAlert={alert.code} title={alert.title}>
                {alert.message}
            </Alert>
        </>
    )
}
