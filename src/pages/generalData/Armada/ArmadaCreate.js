import { useEffect, useState } from "react";
import FormInput from "../../../components/FormInput";
import Select from "../../../components/Select";
import { api } from "../../../config";

const ArmadaCreate = (props) => {
    const { setIsOpen, options } = props

    const [valueBranch, setValueBranch] = useState(null);
    const [valueType, setValueType] = useState(null);
    const [valueModel, setValueModel] = useState(null);
    const [valueVehicleBrand, setValueVehicleBrand] = useState(null);
    const [valueYear, setValueYear] = useState(null);
    const [valueStatus, setValueStatus] = useState(null);
    const [valueHullNumber, setValueHullNumber] = useState(null);
    const [valuePlatNumber, setValuePlatNumber] = useState(null);
    const [valueFrameNumber, setValueFrameNumber] = useState(null);
    const [valueEngineNumber, setValueEngineNumber] = useState(null);
    const [valueColor, setValueColor] = useState(null);
    const { optionsBranch, setOptionsBranch } = options.branch;
    const [optionsType, setOptionsType] = useState([]);
    const [optionsBrand, setOptionsBrand] = useState([]);
    const [optionsModel, setOptionsModel] = useState([]);

    // function untuk button create
    const handleClickCreate = e => {
        e.preventDefault()
    }

    function closeModal() {
        setIsOpen(false)
    }

    useEffect(() => {
        api.get('/vehicletype').then(res => {
            setOptionsType(res.data)
        }).catch(error => {
            // console.log(error);
            if (error.code === "ERR_NETWORK") {
                // alert('Periksa jaringan anda dan Reload Browser')
            }
        })
    }, []);

    useEffect(() => {
        api.get('/vehiclemodel').then(res => {
            setOptionsModel(res.data)
        }).catch(error => {
            // console.log(error);
            if (error.code === "ERR_NETWORK") {
                // alert('Periksa jaringan anda dan Reload Browser')
            }
        })
    }, []);

    useEffect(() => {
        api.get('/vehiclebrand').then(res => {
            setOptionsBrand(res.data)
        }).catch(error => {
            // console.log(error);
            if (error.code === "ERR_NETWORK") {
                // alert('Periksa jaringan anda dan Reload Browser')
            }
        })
    }, []);


    return <>
        <div className='grid grid-cols-2 gap-6 text-slate-700'>
            {/* Branch*/}
            <div className="col-span-1">
                <Select label="Branch" setValue={setValueBranch} keyId="branchid" keyName="branchname" options={optionsBranch} />
            </div>
            {/* Car Hull Number */}
            <div className="col-span-1">
                <FormInput label="Car Hull Number" tagId="hull_number" setValue={setValueHullNumber} />
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
                <FormInput label="Plat Number" tagId="plat_number" setValue={setValuePlatNumber} />
            </div>
            {/* Vehicle Brand */}
            <div className="col-span-1">
                <Select label="Vehicle Brand" setValue={setValueVehicleBrand} keyId="oid" keyName="brandname" options={optionsBrand} />
            </div>
            {/* Chasis/Frame Number */}
            <div className="col-span-1">
                <FormInput label="Chasis/Frame Number" tagId="frame_number" setValue={setValueFrameNumber} />
            </div>
            {/* Vehicle Model */}
            <div className="col-span-1">
                <Select label="Vehicle Model" setValue={setValueModel} keyId="oid" keyName="modelname" options={optionsModel} />
            </div>
            {/* Engine Number */}
            <div className="col-span-1">
                <FormInput label="Engine Number" tagId="engine_number" setValue={setValueEngineNumber} />
            </div>
            {/* Vehicle Type */}
            <div className="col-span-1">
                <Select label="Vehicle Type" setValue={setValueType} keyId="id" keyName="name" options={optionsType} />
            </div>
            {/* Color */}
            <div className="col-span-1">
                <FormInput label="Color" tagId="color" setValue={setValueColor} />
            </div>
        </div>
        <div className="grid grid-cols-2 gap-x-6 mt-6 text-slate-700">
            <div className="row-span-2 flex flex-col gap-y-2">
                <label htmlFor="remark" className='text-slate-700 text-sm'>Remarks (Opsional)</label>
                <textarea id="remark" className="border px-4 py-2 border-template-input h-full resize-none"></textarea>
            </div>
            {/* Relesaed Year */}
            <div className="flex flex-col gap-6">
                <FormInput label="Released Year" tagId="year" setValue={setValueYear} />
                <div>
                    <Select label="Status" setValue={setValueStatus} keyId="id" keyName="name" options={[
                        { id: 1, name: "Ready" },
                        { id: 2, name: "On the Way" },
                        { id: 3, name: "Used" }
                    ]} setTop={-116} />
                </div>
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