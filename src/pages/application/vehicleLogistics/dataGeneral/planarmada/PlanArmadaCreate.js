import { useEffect, useState } from 'react'
import FormInput from '../../../../../components/FormInput';
import Select from '../../../../../components/Select';
import { api } from '../../../../../config';

const PlanArmadaCreate = (props) => {
    const { setIsOpen, setFailCreate, options } = props
    const [optionsBranch, setOptionsBranch] = useState([]);
    const [valueBranch, setValueBranch] = useState(null);
    const [valueDestinantion, setValueDestinantion] = useState(null);
    const [valuePlanDate, setValuePlanDate] = useState(null);
    const [valuePayload, setValuePayload] = useState(null);
    const [valueType, setValueType] = useState([]);
    const [valueUnit, setValueUnit] = useState([]);
    const [optionsType, setOptionsType] = useState([]);
    const [optionsUnit, setOptionsUnit] = useState([]);



    const handleClickCreate = e => {
        e.preventDefault()
        api.post('/planarmada', {
            branchid: valueBranch,
            type: valueType,
            unit: valueUnit,
        }).catch(error => {
            console.log(error.response);
            setFailCreate(true)
            setIsOpen(false)
        })
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
        api.get('/vehicleunit').then(res => {
            setOptionsUnit(res.data)
        }).catch(error => {
            // console.log(error);
            if (error.code === "ERR_NETWORK") {
                // alert('Periksa jaringan anda dan Reload Browser')
            }
        })
    }, []);

    return <>
        <div className="flex flex-col gap-y-6 pb-2">
            <Select label={"Branch"} setValue={setValueBranch} keyId={"branchid"} keyName={"branchname"} options={optionsBranch} />
            <Select label={"Type"} setValue={setValueType} keyId={"oid"} keyName={"typename"} options={optionsType} />
            <Select label={"Vihcle Unit"} setValue={setValueUnit} keyId={"oidunit"} keyName={"unitname"} options={optionsUnit} />
            <FormInput label="Destination" tagId="destinantion" setValue={setValueDestinantion} />
            <FormInput label="Plan Date" tagId="plandate" setValue={setValuePlanDate} />
            <FormInput label="Payload Composition" tagId="payload" setValue={setValuePayload} />
        </div>
        <div className="flex justify-end gap-4 px-4 pt-6">
            <button className="text-green-600 py-2 px-4" onClick={() => props.setIsOpen(false)}>Close</button>
            <button type="Submit" onClick={handleClickCreate}
                className={`bg-light-green hover:bg-green-700 text-white rounded flex items-center gap-x-1 py-2 px-4 `}>
                Create New
            </button>
        </div>
    </>
}

export default PlanArmadaCreate