import { Icon } from '@iconify/react';
import { Menu, Transition } from '@headlessui/react'

const Action = (props) => {
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
                <Menu.Items as='div' className={`absolute -top-7 -right-32 bg-white rounded shadow-md p-4 py-4`}>
                    <Menu.Item as='div' className='flex flex-col gap-y-3'>
                        {props.children}
                    </Menu.Item>
                </Menu.Items>
            </Transition>
        </Menu>
    );
}

export default Action;
