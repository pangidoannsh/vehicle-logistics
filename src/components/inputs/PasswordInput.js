import { Icon } from '@iconify/react';
import React from 'react'
import { useState } from 'react';

export default function PasswordInput({ id, className, children, refrence, login, tagId, label, width }) {
    const [seePassword, setseePassword] = useState(false);
    const [isFocus, setIsFocus] = useState(false);
    if (login) {
        return (
            <div className={`relative ${className}`}>
                {/* Input */}
                <input id={id} type={`${seePassword ? 'text' : 'password'}`} className='focus:outline-none
            bg-transparent p-1 focus:rounded border-b border-b-slate-400 w-full text-slate-400 
            focus:text-slate-600 peer' placeholder=" " onFocus={() => setIsFocus(true)} ref={refrence} />
                {/* label */}
                <label htmlFor={id} className="floating-label font-medium">
                    {children}
                </label>
                {/* Can See Password or Not Button */}
                <span className={`can-see-password ${isFocus ? 'inline' : 'hidden'} peer`}
                    onClick={e => { e.preventDefault(); setseePassword(!seePassword) }}>
                    <Icon icon={`${seePassword ? 'mdi:eye-off' : 'ic:round-remove-red-eye'}`}
                        className='text-lg text-slate-600' />
                </span>
                {/* Border Bottom */}
                <div className='absolute bottom-0 duration-300 w-0 peer-focus:w-full h-[2px] bg-light-green '></div>
            </div>
        )
    }
    return (
        <div className="flex flex-col gap-y-2 text-slate-700 relative" style={{ width: width ? width : '100%' }}>
            <label htmlFor={tagId} className="text-sm">{label}</label>
            <input ref={refrence} type={!seePassword ? "password" : 'text'}
                className={`text-sm py-2 px-4 border rounded duration-500 w-full outline-none
             focus:border-light-green focus:shadow-none`} id={tagId} />
            {/* Can See Password or Not Button */}
            <span className="absolute right-1 bottom-2"
                onClick={e => { e.preventDefault(); setseePassword(!seePassword) }}>
                <Icon icon={`${seePassword ? 'mdi:eye-off' : 'ic:round-remove-red-eye'}`}
                    className='text-lg text-slate-600' />
            </span>
        </div>
    )

}
