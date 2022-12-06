import { Icon } from '@iconify/react'
import React, { useState } from 'react'
import FormInput from '../../../../../components/inputs/FormInput';
import Select from '../../../../../components/inputs/Select'

const BastCreate = () => {
    // options input
    const [optionsManifestNumber, setOptionsmanifestNumber] = useState([]);
    // =================== value input variables ========================
    const [value, setValue] = useState({
        maifestnumber: "",
        bastdate: "",
        origin: "",
        destination: "",
        planarmada: ""
    })
    const setValueManifestNumber = newValue => setValue({ ...value, planarmada: newValue });
    const setValueBastDate = newValue => setValue({ ...value, bastdate: newValue});
    const setValueOrigin = newValue => setValue({ ...value, bastdate: newValue});
    const setValueDestination = newValue => setValue({ ...value, bastdate: newValue});
    
  return (
    <>
    <div className="p-4">
        <div className="card drop-shadow-lg bg-white p-6">
            {/* Title */}
         <div className="flex px-2 pb-4 gap-x-2 items-center divider-bottom mb-12">
            <Icon icon="eos-icons:init-container" className={`text-2xl text-gold `} />
            <span className="text-lg text-dark-green font-medium">Bast Create</span>
        </div>
        <div className="grid grid-cols-2 gap-6 mb-6">
            <Select label="Manifest Number" setValue={setValueManifestNumber} keyId="oid" keyName="drivername"
                            options={optionsManifestNumber} className="capitalize" />
            <FormInput label="Bast Date" setValue={setValueBastDate} tagId={"bastdate"} type="Date" />
            <FormInput label="Origin" tagId="origin" setValue={setValueOrigin} value={value.origin} />
            <FormInput label="Destination" tagId="destination" setValue={setValueDestination} value={value.destination} />
        </div>
        {/* Data Unit */}
        <div className="flex justify-between px-2 py-4 items-center divider-bottom mb-6 mt-8">
            <div className="flex gap-x-2 items-center">
                <Icon icon="fa6-solid:car-side" className={`text-xl text-gold `} />
                <span className='text-lg text-dark-green font-medium'>Data Unit</span>
            </div>
        </div>



        </div>
    </div>
    
    </>
  )
}

export default BastCreate