import React, { useEffect, useState } from 'react'
import { useRef } from 'react'

const FinanceAr = () => {
    const input = useRef();
    const handleSubmit = e => {
        e.preventDefault();
        console.log(input.current.value);
    }
    useEffect(() => {
        input.current.value = "edo"
    }, []);

    return (
        <div className='py-4 px-6'>
            <form onSubmit={handleSubmit}>
                <FormInput label="Input" tagId="input" refrence={input} type="date" />
                <button>Submit</button>
            </form>
        </div>
    )
}

const FormInput = (props) => {
    const { label, tagId, type, refrence } = props

    return (
        <div className="flex flex-col gap-y-2 text-slate-700 relative">
            <label htmlFor={tagId} className="text-sm">{label}</label>
            <input ref={refrence} type={type ? type : 'text'} className={`text-sm py-2 px-4 border rounded duration-500 w-full outline-none
             focus:border-light-green focus:shadow-none uppercase`} id={tagId} />
        </div>
    );
}
export default FinanceAr
