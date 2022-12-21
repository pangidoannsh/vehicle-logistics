import { Menu, Transition } from '@headlessui/react';
import { Icon } from '@iconify/react'
import React from 'react'
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../config/User';

function Header({ setIsLogged }) {
    const [user, setUser] = useContext(UserContext);
    let navigate = useNavigate();
    const handleLogout = e => {
        e.preventDefault();
        localStorage.clear();
        setIsLogged(false);
        navigate('/login');
        window.location.reload();
    }
    return (
        <>
            <div className='flex justify-end p-4 h-[72px] bg-white'>
                <Menu as="div" className="relative">
                    <Menu.Button>
                        <div className='flex gap-x-2 items-center'>
                            <h3 className='text-base text-dark-green'>{user.name}</h3>
                            <Icon icon={'ic:round-account-circle'} className='text-4xl text-dark-green' />
                        </div>
                    </Menu.Button>
                    <Transition
                        enter="transition duration-100 ease-out"
                        enterFrom="transform scale-95 opacity-0"
                        enterTo="transform scale-100 opacity-100"
                        leave="transition duration-75 ease-out"
                        leaveFrom="transform scale-100 opacity-100"
                        leaveTo="transform scale-95 opacity-0"
                    >
                        <Menu.Items as='div' className={`absolute z-30 left-0 bg-white rounded shadow-md`}>
                            {/* <Menu.Item as='div' className='flex flex-col gap-y-3'>
                                <div className='hover:bg-green-400 px-3 py-2 hover:text-white'>testing</div>
                            </Menu.Item> */}
                            <Menu.Item as='div' className='flex flex-col gap-y-3'>
                                <button className='w-full hover:bg-red-400 px-3 py-2 hover:text-white'
                                    onClick={handleLogout}>Logout</button>
                            </Menu.Item>
                        </Menu.Items>
                    </Transition>
                </Menu>
            </div>
        </>
    )
}

export default React.memo(Header)