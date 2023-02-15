import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { Icon } from '@iconify/react'


export default function InputBranch({ options, setValue }) {
    const [selected, setSelected] = useState({ oid: null, branch: "Branch" })
    const handleChange = val => {
        setSelected(val);
        setValue(val.oid)
    }
    return (
        <div className="mb-8">
            <Listbox value={selected} onChange={handleChange}>
                <div className="relative mt-1 z-20 border-b border-slate-400">
                    <Listbox.Button className="relative w-full rounded-lg py-2 pl-3 pr-10 text-left cursor-pointer">
                        <span className="block truncate text-slate-400 -translate-x-1">{selected.branch}</span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                            <Icon icon={`akar-icons:chevron-down`} className="text-base text-slate-400" />
                        </span>
                    </Listbox.Button>
                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md 
                        bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            {options.map((option, index) => (
                                <Listbox.Option
                                    key={index}
                                    className={({ active }) =>
                                        `relative cursor-default select-none py-2 px-4 
                                        ${active ? 'bg-light-green/20 text-light-green' : 'text-gray-900'
                                        }`
                                    }
                                    value={option}
                                >
                                    {({ selected }) => (
                                        <>
                                            <span
                                                className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                                    }`}
                                            >
                                                {option.branch}
                                            </span>
                                        </>
                                    )}
                                </Listbox.Option>
                            ))}
                        </Listbox.Options>
                    </Transition>
                </div>
            </Listbox>
        </div>
    )
}
