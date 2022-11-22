import { Icon } from '@iconify/react';
import React from 'react'
import { useState } from 'react';

export default function PasswordInput(props) {
    const { id, className, children } = props
    const [seePassword, setseePassword] = useState(false);
    const [isFocus, setIsFocus] = useState(false);

    return (
        <div className={`relative ${className}`}>
            {/* Input */}
            <input id={id} type={`${seePassword ? 'text' : 'password'}`} className='focus:outline-none
            bg-transparent p-1 focus:rounded border-b border-b-slate-400 w-full text-slate-400 
            focus:text-slate-600 peer' placeholder=" " onFocus={() => setIsFocus(true)} />
            {/* label */}
            <label htmlFor={id} className="floating-label font-medium">
                {children}
            </label>
            {/* Can See Password or Not Button */}
            <button className={`absolute right-0 text-center p-2 pr-4 ${isFocus ? 'inline' : 'hidden'} peer`}
                onClick={e => { e.preventDefault(); setseePassword(!seePassword) }}>
                <Icon icon={`${seePassword ? 'mdi:eye-off' : 'ic:round-remove-red-eye'}`}
                    className='text-lg text-slate-600' />
            </button>
            {/* Border Bottom */}
            <div className='absolute bottom-0 duration-300 w-0 peer-focus:w-full h-[2px] bg-light-green '></div>
        </div>
    )
}
