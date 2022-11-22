import { Dialog, Transition } from '@headlessui/react'
import { Icon } from '@iconify/react';
import { Fragment } from 'react'

const Alert = props => {
    const { isOpen, setIsOpen, title, codeAlert } = props;
    let color = "";
    let icon = ""
    if (codeAlert === 0) {
        color = "red";
        icon = "jam:triangle-danger-f";
    } else if (codeAlert === 1) {
        color = "green";
        icon = "material-symbols:check"
    }
    function closeModal() {
        setIsOpen(false)
    }

    return (
        <>
            <Transition appear show={isOpen} as={Fragment}>
                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <div className={`w-full max-w-md transform overflow-hidden flex bg-${color}-100 rounded-lg 
                                p-4 mb-4 text-sm text-${color}-700 items-center justify-between`}>
                                <div className="flex gap-x-2 items-center">
                                    <Icon icon={icon} className="text-2xl" />
                                    <div className='text-start'>
                                        <span className="font-medium">{title}: </span> {props.children}
                                    </div>
                                </div>
                                <button onClick={closeModal}>
                                    <Icon icon="material-symbols:close" className="text-lg" />
                                </button>
                            </div>
                        </Transition.Child>
                    </div>
                </div>
            </Transition>
            <div className="text-green-700 bg-green-100"></div>
            <div className="text-red-700 bg-red-100"></div>
            <div className="text-yellow-700 bg-yellow-100"></div>
        </>
    )
}

export default Alert