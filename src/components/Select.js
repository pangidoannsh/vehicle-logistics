import { Fragment, useEffect, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { Icon } from '@iconify/react'
import { api } from '../config'

export default function Select(props) {
    const { label, setValue, keyId, keyName, urlPath, options } = props
    const [selected, setSelected] = useState({ [keyId]: null, [keyName]: "nothing selected" })

    const [dataOption, setDataOption] = useState(() => {
        if (urlPath) {
            return [];
        } else {
            return options;
        }
    });

    useEffect(() => {
        setValue(selected[keyId])
    }, [selected]);

    useEffect(() => {
        if (urlPath) {
            api.get(urlPath).then(res => {
                setDataOption(res.data)
            })
                .catch(error => { })
        }
    }, []);
    return (
        <div className='col-span-1' >
            <div className='text-slate-700 text-base mb-2'>{label}</div>
            <Listbox value={selected} onChange={setSelected}>
                <div className="relative mt-1">
                    <Listbox.Button className="relative w-full rounded bg-white py-2 pl-3 
                    pr-10 text-left border border-black border-opacity-20 focus:outline-none sm:text-sm">
                        <span className="block truncate">{selected[keyName]}</span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                            <Icon icon={`akar-icons:chevron-down`} className="text-base" />
                        </span>
                    </Listbox.Button>
                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Listbox.Options className="z-10 absolute mt-1 max-h-60 w-full overflow-auto rounded scroll-green
                         bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            {dataOption.map((option, index) => (
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
                                            <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                                                {option[keyName]}
                                            </span>
                                            {/* {selected ? (
                                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                                    <Icon icon="akar-icons:check" className='text-base' />
                                                </span>
                                            ) : null} */}
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
