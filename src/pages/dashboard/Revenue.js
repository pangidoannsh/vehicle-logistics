import React from 'react'
import { useEffect } from 'react';
import { useAlert } from '../../hooks'

export default function Revenue() {
    const [alert, setAlert] = useAlert();
    const handle = e => {
        e.preventDefault()
        setAlert({ isActived: true });
        setAlert({ code: 1 })
        setAlert({ message: "hello" })
    }
    let mount = true;
    useEffect(() => {
        if (mount) {
            console.table(alert);
        }
        return () => mount = false;
    }, [alert]);
    return (
        <div className='flex justify-center pt-8'>
            <button className='py-2 px-4 bg-light-green text-white hover:bg-green-600 active:scale-95'
                onClick={handle}>Change</button>
        </div >
    )
}
