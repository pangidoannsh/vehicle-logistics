import { useRef } from "react";
import { useState } from "react";
import FormInput from "../../../components/inputs/FormInput";
import Select from "../../../components/inputs/Select";
import { api } from "../../../config";

const ArmadaCreate = (props) => {
    const { setIsOpen, options, fetchArmada, alert, setAlert, setLoadingPage } = props
    const [valueBranch, setValueBranch] = useState({ oid: null, branchname: "nothing selected" });
    const [valueType, setValueType] = useState({ id: null, name: "nothing selected" });
    const [valueVehicleModel, setValueVehicleModel] = useState({ oid: null, model: "nothing selected" });
    const [valueVehicleBrand, setValueVehicleBrand] = useState({ oid: null, brand: "nothing selected" });
    const [valueVehicleType, setValueVehicleType] = useState({ oid: null, unittype: "nothing selected" });
    const [valueStatus, setValueStatus] = useState({ id: null, name: "nothing selected" });
    const refYear = useRef();
    const refHullnumber = useRef();
    const refPoliceNumber = useRef();
    const refFramenumber = useRef();
    const refEnginenumber = useRef();
    const refColor = useRef();

    const { optionsBranch, optionsType, optionsModel, optionsBrand } = options;

    // function untuk button create
    const handleClickCreate = e => {
        e.preventDefault()
        setAlert({ ...alert, isActived: false });
        const postValue = {
            hullnumber: refHullnumber.current.value.toUpperCase(),
            enginenumber: refEnginenumber.current.value.toUpperCase(),
            framenumber: refFramenumber.current.value.toUpperCase(),
            policenumber: refPoliceNumber.current.value.toUpperCase(),
            brandoid: valueVehicleBrand.oid,
            modeloid: valueVehicleModel.oid,
            unittypeoid: valueVehicleType.oid,
            status: valueStatus.id,
            type: valueType.id,
            branchoid: valueBranch.oid,
            color: refColor.current.value.toUpperCase(),
            year: refYear.current.value.toUpperCase()
        }
        // console.log(postValue);
        if (Object.values(postValue).findIndex(value => (value === "" || value === null)) === -1) {
            setLoadingPage(true);
            api.post('/vehiclearmada', postValue)
                .then(res => {
                    if (res.status === 201) {
                        fetchArmada();
                        setAlert({
                            isActived: true,
                            code: 1,
                            message: "New Data Created Successfully",
                            title: "Success"
                        })
                        setTimeout(() => {
                            setAlert({ ...alert, isActived: false });
                        }, 3000)
                        setIsOpen(false);
                    }
                })
                .catch(error => {
                    const message = Object.values(error.response.data)[0][0];
                    setAlert({ isActived: true, code: 0, title: `Error ${error.response.status}`, message });
                }).finally(() => setLoadingPage(false))
        } else {
            setAlert({
                isActived: true,
                code: 0,
                message: "There is an Empty Field Input!",
                title: "Can't Create Data"
            })
        }
    }

    function closeModal() {
        setIsOpen(false)
    }
    return <>
        <div className='grid grid-cols-2 gap-6 text-slate-700'>
            {/* Branch*/}
            <div className="col-span-1">
                <Select label="Branch" useSelect={[valueBranch, setValueBranch]} keyId="oid" keyName="branchname" options={optionsBranch} />
            </div>
            {/* Car Hull Number */}
            <div className="col-span-1">
                <FormInput label="Car Hull Number" tagId="hullnumber" refrence={refHullnumber} />
            </div>
            {/* Type */}
            <div className="col-span-1">
                <Select label="Type" useSelect={[valueType, setValueType]} keyId="id" keyName="name" options={[
                    { id: 1, name: "asset" },
                    { id: 2, name: "vendor" }
                ]} />
            </div>
            {/* Plat Number */}
            <div className="col-span-1">
                <FormInput label="Police Number" tagId="policenumber" refrence={refPoliceNumber} />
            </div>
            {/* Vehicle Brand */}
            <div className="col-span-1">
                <Select label="Vehicle Brand" useSelect={[valueVehicleBrand, setValueVehicleBrand]}
                    keyId="oid" keyName="brand" options={optionsBrand} />
            </div>
            {/* Chasis/Frame Number */}
            <div className="col-span-1">
                <FormInput label="Chasis/Frame Number" tagId="framenumber" refrence={refFramenumber} />
            </div>
            {/* Vehicle Model */}
            <div className="col-span-1">
                <Select label="Vehicle Model" useSelect={[valueVehicleModel, setValueVehicleModel]} keyId="oid" keyName="model" options={optionsModel} />
            </div>
            {/* Engine Number */}
            <div className="col-span-1">
                <FormInput label="Engine Number" tagId="enginenumber" refrence={refEnginenumber} />
            </div>
            {/* Vehicle Type */}
            <div className="col-span-1">
                <Select label="Vehicle Type" useSelect={[valueVehicleType, setValueVehicleType]} keyId="oid" keyName="unittype" options={optionsType} />
            </div>
            {/* Color */}
            <div className="col-span-1">
                <FormInput label="Color" tagId="color" refrence={refColor} />
            </div>
            {/* Realesed Year */}
            <div className="col-span-1">
                <FormInput label="Released Year" tagId="year" refrence={refYear} />
            </div>
            {/* Realesed Year */}
            <div className="col-span-1">
                <Select label="Status" useSelect={[valueStatus, setValueStatus]} keyId="id" keyName="name" options={[
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
                Save
            </button>
        </div>
    </>
}
export default ArmadaCreate