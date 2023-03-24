import React, { Fragment } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { Icon } from '@iconify/react'

const MultiSelect = ({ label, options, keyId, keyName, multiSelect, setMultiSelect }) => {
    const setSelected = (key, selected) => {
        setMultiSelect(multiSelect.map((currentSelected, index) => {
            if (key === index) return selected;
            else return currentSelected;
        }))
    }
    const handleAddSelector = () => {
        setMultiSelect(prev => [...prev, { [keyId]: null, [keyName]: "nothing selected" }]);
    }
    return (
        <div className="flex flex-col gap-2">
            <label className="text-slate-600">{label}</label>
            {multiSelect.map((selected, index) => (
                <Select keyId={keyId} keyName={keyName} selected={selected} setSelected={setSelected}
                    key={index} options={options} indexComponent={index} />
            ))}
            <button onClick={handleAddSelector} disabled={multiSelect[multiSelect.length - 1][keyId] === null}
                className='flex justify-center items-center p-2 border border-light-green text-light-green 
                font-medium rounded disabled:text-gray-400 disabled:border-gray-400'>
                <Icon icon="material-symbols:add-rounded" className='text-2xl' />
                <span>Add {label}</span>
            </button>
        </div>
    )
}

const Select = ({ keyId, keyName, options, selected, setSelected, indexComponent }) => {


    const handleSelect = select => {
        setSelected(indexComponent, select);
    }

    return (
        <div className='flex flex-col gap-y-2'>
            <Listbox value={selected} onChange={handleSelect}>
                <div className="relative">
                    <Listbox.Button className={`relative w-full rounded bg-white py-2 px-4
                    ${selected[keyId] === null ? 'text-slate-400' : 'text-slate-600'}
                     text-left border focus:outline-none sm:text-sm`} >
                        <span className="block truncate">{selected[keyName]}</span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                            <Icon icon="akar-icons:chevron-down" className="text-base" />
                        </span>
                    </Listbox.Button>
                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Listbox.Options className={`absolute mt-1 max-h-60 w-full overflow-auto rounded z-20 bg-white 
                        text-base shadow-lg shadow-slate-400/20 ring-1 ring-slate-400/20 focus:outline-none sm:text-sm`}>
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
                                                <span className={`block truncate
                                            ${selected ? 'font-medium' : 'font-normal'}`}>
                                                    {option[keyName]}
                                                </span>
                                            </>
                                        )}
                                    </Listbox.Option>
                                ))

                            ) :
                                <div className="relative cursor-default select-none py-2 px-4 text-center text-slate-400">
                                    no data to select
                                </div>
                            }
                        </Listbox.Options>
                    </Transition>
                </div>
            </Listbox>
        </div>
    )
}
export default MultiSelect;