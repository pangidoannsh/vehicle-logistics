import { Icon } from '@iconify/react';
import { Menu, Transition } from '@headlessui/react'
import { NavLink, useLocation } from 'react-router-dom';

const Action = ({ id }) => {
    let location = useLocation()

    return (
        <Menu as="div" className="flex justify-center items-center relative">
            <Menu.Button>
                <Icon icon='akar-icons:more-horizontal' className="text-xl text-slate-700" />
            </Menu.Button>
            <Transition
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0">
                <Menu.Items as='div' className={`absolute -top-5 -right-32 bg-white shadow-md p-4 rounded-[4px] py-4`}>
                    <Menu.Item as='div' className='flex flex-col gap-y-3'>
                        <NavLink to={`${location.pathname}/${id}/edit`} className={`text-yellow-500 hover:text-yellow-400`}>
                            <div className='flex gap-x-3' items-center>
                                <Icon icon={`clarity:note-edit-solid`} className='text-xl' />
                                <span className='text-base'>Edit</span>
                            </div>
                        </NavLink>
                        <button className={`text-[#AF183C] hover:text-red-600`}>
                            <div className='flex gap-x-3 items-center'>
                                <Icon icon={`bxs:trash-alt`} className='text-xl' />
                                <span className='text-base'>Delete</span>
                            </div>
                        </button>
                    </Menu.Item>
                </Menu.Items>
            </Transition>
        </Menu>
    );
}

export default Action;
