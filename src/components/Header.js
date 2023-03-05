import { Menu, Transition } from '@headlessui/react';
import { Icon } from '@iconify/react'
import React from 'react'
import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { UserContext } from '../config/User';
import Logout from '../pages/Logout';

function Header({ setIsLogged }) {
    const [user, setUser] = useContext(UserContext);
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
                        <Menu.Items as='div' className="fixed z-50 right-0 bg-white rounded shadow-md w-32">
                            <Menu.Item as='div' className='flex flex-col gap-y-3'>

                            </Menu.Item>
                            <Menu.Item as='div'>
                                <NavLink to="/settings" className="px-3 py-2 mt-1 flex gap-2 text-slate-500 hover:text-slate-700">
                                    <Icon icon="ci:settings-filled" className='text-xl' />
                                    <span className='text-sm'>Settings</span>
                                </NavLink>
                            </Menu.Item>
                            <div className='divider-bottom my-1'></div>
                            <Menu.Item as='div'>
                                <Logout setIsLogged={setIsLogged} />
                            </Menu.Item>
                        </Menu.Items>
                    </Transition>
                </Menu>
            </div>
        </>
    )
}

export default React.memo(Header)