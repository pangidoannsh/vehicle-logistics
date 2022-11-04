import { Dialog, Transition } from '@headlessui/react'
import { Icon } from '@iconify/react'
import { Fragment } from 'react'

const Modal = (props) => {
    // yang wajib dibuatkan props nya isOpen, setIsOpen, ModalContent
    const { isOpen, setIsOpen, title, iconTitle, ModalContent, size } = props

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    return (
        <>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full justify-center p-8 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className=" transform overflow-hidden rounded
                                 bg-white p-4 text-left align-middle shadow-xl transition-all"
                                    style={{ width: size ? `${size}px` : '100%' }}>
                                    {/* Content */}
                                    <div className="flex justify-between pb-4 divider-bottom mb-4">
                                        <div className="flex gap-x-2 items-center">
                                            <Icon icon={iconTitle} className={`text-2xl text-gold `} />
                                            <span className='text-lg text-dark-green font-medium'>{title}</span>
                                        </div>
                                        <button onClick={closeModal}>
                                            <Icon icon="carbon:close" className='text-[28px]' />
                                        </button>
                                    </div>
                                    {ModalContent}
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}

export default Modal