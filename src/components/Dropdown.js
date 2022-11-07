import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { Icon } from "@iconify/react";

const people = [{ name: "Wade Cooper" }, { name: "Devon Webb" }, { name: "Tom Cook" }, { name: "Tanya Fox" }, { name: "Hellen Schmidt" }];

export default function Dropdown() {
    const [selected, setSelected] = useState(people[0]);

    return (
        <div className="">
            <Listbox value={selected} onChange={setSelected}>
                <div className="relative mt-1">
                    <Listbox.Button className="relative w-full cursor-default rounded border border-slate-300 bg-white py-2 pl-4 pr-10 text-left sm:text-sm">
                        <span className="block truncate text-base">{selected.name}</span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                            <Icon icon="akar-icons:chevron-down" className="text-xl"></Icon>
                        </span>
                    </Listbox.Button>
                    <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                        <Listbox.Options className="z-20 absolute mt-1 max-h-60 w-full overflow-auto rounded bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            {people.map((person, personIdx) => (
                                <Listbox.Option key={personIdx} className={({ active }) => `relative cursor-default select-none py-2 px-4 text-base ${active ? "bg-amber-100 text-amber-900" : "text-gray-900"}`} value={person}>
                                    {({ selected }) => (
                                        <>
                                            <span className={`block truncate ${selected ? "font-medium" : "font-normal"}`}>{person.name}</span>
                                            {selected ? <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">{/* <CheckIcon className="h-5 w-5" aria-hidden="true" /> */}</span> : null}
                                        </>
                                    )}
                                </Listbox.Option>
                            ))}
                        </Listbox.Options>
                    </Transition>
                </div>
            </Listbox>
        </div>
    );
}
