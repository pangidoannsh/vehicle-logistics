import { Fragment, useEffect, useState } from 'react'
import { Menu, Listbox, Transition } from '@headlessui/react'
import { Icon } from '@iconify/react'
import { api } from '../config'

export default function Select(props) {
    const { label, setValue, keyId, keyName, urlPath, options, setTop } = props
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
        <div className='flex flex-col gap-y-2'>
            <div className={`text-sm text-slate-600`}>{label}</div>
            <Listbox value={selected} onChange={setSelected} >
                <div className="relative">
                    <Listbox.Button className={`relative w-full rounded bg-white py-2 px-4
                    ${selected[keyId] === null ? 'text-slate-400' : 'text-slate-600'}
                     text-left border focus:outline-none sm:text-sm`}>
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
                        <Listbox.Options className={`absolute mt-1 max-h-60 w-full overflow-auto rounded z-10 bg-white 
                        text-base shadow-lg shadow-slate-400/20 ring-1 ring-slate-400/20 focus:outline-none sm:text-sm`}
                            style={{ top: setTop && `${setTop}px` }}>
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
