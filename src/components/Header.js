import { Icon } from '@iconify/react'
import React from 'react'
import { NavLink } from 'react-router-dom'

function Header() {
    return (
        <div className=' flex justify-end p-4 h-[72px] bg-white'>
            <NavLink to="/user">
                <div className='flex gap-x-2 items-center'>
                    <h3 className='text-base text-dark-green'>Username</h3>
                    <Icon icon={'ic:round-account-circle'} className='text-4xl text-dark-green' />
                </div>
            </NavLink>
        </div>
    )
}

export default Header