import React, { Fragment } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { Icon } from '@iconify/react'

const Select = ({ label, keyId, keyName, options, setTop, catchSelect, className, useSelect, disabled }) => {

    const [selected, setSelected] = useSelect;

    const handleSelect = select => {
        setSelected(select);
        if (catchSelect) {
            catchSelect(select[keyId]);
        }
    }
    if (disabled) {
        return (
            <div className='flex flex-col gap-y-2'>
                <label className={`text-sm font-medium text-light-green`}>{label}</label>
                <Listbox value={selected} onChange={handleSelect} disabled>
                    <div className="relative">
                        <Listbox.Button className={`relative w-full rounded bg-white py-2 px-4 bg-gradient-to-t
                         from-green-50 to-green-100 ${selected[keyId] === null ? 'text-slate-400' : 'text-slate-600'}
                     text-left border border-light-green focus:outline-none sm:text-sm`} >
                            <span className="block truncate text-light-green">{selected[keyName]}</span>
                            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                <Icon icon={`${(setTop && setTop < 0) ? 'akar-icons:chevron-up' : 'akar-icons:chevron-down'}`}
                                    className="text-base text-light-green" />
                            </span>
                        </Listbox.Button>
                    </div>
                </Listbox>
            </div>
        )
    }
    return (
        <div className='flex flex-col gap-y-2'>
            <label className={`text-sm text-slate-600`}>{label}</label>
            <Listbox value={selected} onChange={handleSelect}>
                <div className="relative">
                    <Listbox.Button className={`relative w-full rounded bg-white py-2 px-4
                    ${selected[keyId] === null ? 'text-slate-400' : 'text-slate-600'}
                     text-left border focus:outline-none sm:text-sm`} >
                        <span className="block truncate">{selected[keyName]}</span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                            <Icon icon={`${(setTop && setTop < 0) ? 'akar-icons:chevron-up' : 'akar-icons:chevron-down'}`}
                                className="text-base" />
                        </span>
                    </Listbox.Button>
                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Listbox.Options className={`absolute mt-1 max-h-60 w-full overflow-auto rounded z-20 bg-white 
                        text-base shadow-lg shadow-slate-400/20 ring-1 ring-slate-400/20 focus:outline-none sm:text-sm`}
                            style={{ top: setTop && `${setTop}px` }}>
                            {options.length > 0 ? (
                                options.map((option, index) => (
                                    <Listbox.Option
                                        key={index}
                                        className={({ active }) =>
                                            `relative cursor-default select-none py-2 px-4
                                        ${active ? 'bg-light-green bg-opacity-20 text-light-green' : 'text-slate-700'}`
                                        }
                                        value={option}
                                    >
                                        {({ selected }) => (
                                            <>
                                                <span className={`block truncate  ${className} 
                                            ${selected ? 'font-medium' : 'font-normal'}`}>
                                                    {option[keyName]}
                                                </span>
                                            </>
                                        )}
                                    </Listbox.Option>
                                ))

                            ) :
                                <div className="relative cursor-default select-none py-2 px-4 text-center text-slate-400">
                                    nothing data to select
                                </div>
                            }
                        </Listbox.Options>
                    </Transition>
                </div>
            </Listbox>
        </div>
    )
}
export default React.memo(Select);