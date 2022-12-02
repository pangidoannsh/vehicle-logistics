import { useEffect, useState } from "react";
import FormInput from "../../../components/inputs/FormInput";
import Select from "../../../components/inputs/Select";
import { api } from "../../../config";

const ArmadaCreate = (props) => {
    const { setIsOpen, options } = props
    const [value, setValue] = useState({
        branch: "",
        type: "",
        vehicleModel: "",
        vehicleBrand: "",
        vehicleType: "",
        year: "",
        status: "",
        hullNumber: "",
        policeNumber: "",
        frameNumber: "",
        engineNumber: "",
        color: ""
    });
    const setValueBranch = newValue => setValue({ ...value, branch: newValue });
    const setValueType = newValue => setValue({ ...value, type: newValue });
    const setValueVehicleModel = newValue => setValue({ ...value, vehicleModel: newValue });
    const setValueVehicleBrand = newValue => setValue({ ...value, vehicleBrand: newValue });
    const setValueVehicleType = newValue => setValue({ ...value, vehicleType: newValue });
    const setValueYear = newValue => setValue({ ...value, year: newValue });
    const setValueStatus = newValue => setValue({ ...value, status: newValue });
    const setValueHullNumber = newValue => setValue({ ...value, hullNumber: newValue });
    const setValuePoliceNumber = newValue => setValue({ ...value, policeNumber: newValue });
    const setValueFrameNumber = newValue => setValue({ ...value, frameNumber: newValue });
    const setValueEngineNumber = newValue => setValue({ ...value, engineNumber: newValue });
    const setValueColor = newValue => setValue({ ...value, color: newValue });

    const { optionsBranch, optionsType, optionsModel, optionsBrand } = options;


    // function untuk button create
    const handleClickCreate = e => {
        e.preventDefault()
        // console.log(value);
        const postValue = {
            carhullnumber: value.hullNumber,
            enginenumber: value.engineNumber,
            framenumber: value.frameNumber,
            platnumber: value.policeNumber,
            unitbrand: value.vehicleBrand,
            unitmodel: value.vehicleModel,
            unittype: value.vehicleType,
            status: value.status,
            type: value.type,
            branch: value.branch
        }
        console.log(postValue);
        // api.post('/vehiclearmada', postValue)
        //     .then(res => {
        //         console.log(res);
        //     })
        //     .catch(error => {
        //         console.log(error.response);
        //     })
    }

    function closeModal() {
        setIsOpen(false)
    }
    return <>
        <div className='grid grid-cols-2 gap-6 text-slate-700'>
            {/* Branch*/}
            <div className="col-span-1">
                <Select label="Branch" setValue={setValueBranch} keyId="branchid" keyName="branchname" options={optionsBranch} />
            </div>
            {/* Car Hull Number */}
            <div className="col-span-1">
                <FormInput label="Car Hull Number" tagId="hullnumber" value={value.hullNumber} setValue={setValueHullNumber} />
            </div>
            {/* Type */}
            <div className="col-span-1">
                <Select label="Type" setValue={setValueType} keyId="id" keyName="name" options={[
                    { id: 1, name: "asset" },
                    { id: 2, name: "vendor" }
                ]} />
            </div>
            {/* Plat Number */}
            <div className="col-span-1">
                <FormInput label="Police Number" tagId="policenumber" value={value.policeNumber} setValue={setValuePoliceNumber} />
            </div>
            {/* Vehicle Brand */}
            <div className="col-span-1">
                <Select label="Vehicle Brand" setValue={setValueVehicleBrand} keyId="brandid" keyName="brand" options={optionsBrand} />
            </div>
            {/* Chasis/Frame Number */}
            <div className="col-span-1">
                <FormInput label="Chasis/Frame Number" tagId="framenumber" value={value.frameNumber} setValue={setValueFrameNumber} />
            </div>
            {/* Vehicle Model */}
            <div className="col-span-1">
                <Select label="Vehicle Model" setValue={setValueVehicleModel} keyId="modelid" keyName="model" options={optionsModel} />
            </div>
            {/* Engine Number */}
            <div className="col-span-1">
                <FormInput label="Engine Number" tagId="enginenumber" value={value.engineNumber} setValue={setValueEngineNumber} />
            </div>
            {/* Vehicle Type */}
            <div className="col-span-1">
                <Select label="Vehicle Type" setValue={setValueVehicleType} keyId="typeid" keyName="unittype" options={optionsType} />
            </div>
            {/* Color */}
            <div className="col-span-1">
                <FormInput label="Color" tagId="color" value={value.color} setValue={setValueColor} />
            </div>
            {/* Realesed Year */}
            <div className="col-span-1">
                <FormInput label="Released Year" tagId="year" value={value.year} setValue={setValueYear} />
            </div>
            {/* Realesed Year */}
            <div className="col-span-1">
                <Select label="Status" setValue={setValueStatus} keyId="id" keyName="name" options={[
                    { id: "ready", name: "Ready" },
                    { id: "repair", name: "Repair" },
                    { id: "used", name: "Used" }
                ]} setTop={-116} />
            </div>
        </div>
        <div className="flex justify-end gap-4 px-4 pt-6">
            <button className="text-green-600 py-2 px-4" onClick={() => closeModal()}>Close</button>
            <button type="Submit" onClick={handleClickCreate}
                className={`bg-light-green hover:bg-green-700 text-white rounded flex items-center gap-x-1 py-2 px-4 `}>
                Create New
            </button>
        </div>
    </>
}
export default ArmadaCreate