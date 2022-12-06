import { useEffect, useState } from 'react'
import FormInput from '../../../../../components/inputs/FormInput';
import Select from '../../../../../components/inputs/Select';
import { api } from '../../../../../config';

const PlanArmadaCreate = (props) => {
    const { setIsOpen, options, alert, setAlert, setLoadingPage, fetchPlanArmada } = props;

    const [valueBranch, setValueBranch] = useState(null);
    const [valueDestinantion, setValueDestinantion] = useState("");
    const [valuePlanDate, setValuePlanDate] = useState("");
    const [valuePayload, setValuePayload] = useState("");
    const [valueModa, setValueModa] = useState([]);
    const [valueArmada, setValueArmada] = useState([]);

    const { optionsBranch, optionsModa, optionsVehicleArmada } = options;

    const handleClickCreate = e => {
        e.preventDefault()
        setAlert({ ...alert, isActived: false });
        if (valueBranch && valueDestinantion && valuePlanDate && valuePayload && valueArmada && valueModa) {
            setLoadingPage(true);
            const postValue = {
                branchoid: valueBranch,
                moda: valueModa,
                hullnumber: valueArmada,
                destination: valueDestinantion,
                payloadcomposition: valuePayload,
                plandate: valuePlanDate
            };

            api.post('/planarmada', postValue).then(response => {
                setLoadingPage(false);
                setAlert({ isActived: true, code: 1, title: `Success`, message: "New Plan Armada Created" });
                setTimeout(() => {
                    setAlert({ ...alert, isActived: false });
                }, 3000);
                fetchPlanArmada()
                setIsOpen(false)
                // console.log(response);
            }).catch(error => {
                setLoadingPage(false);
                console.log(error.response);
                // if (error.status !== 422) {
                //     console.log(error.response);
                // }
                const message = Object.values(error.response.data)[0][0];
                setAlert({ isActived: true, code: 0, title: `Error ${error.response.status}`, message });
            })
        } else {
            setAlert({ isActived: true, code: 0, title: "Can't Create", message: "There is an empty field input" });
        }
    }

    return <>
        <div className="flex flex-col gap-y-6 pb-2">
            <Select label={"Branch"} setValue={setValueBranch} keyId={"oid"} keyName={"branchname"} options={optionsBranch} />
            <Select label={"Moda"} setValue={setValueModa} keyId={"id"} keyName={"name"} options={optionsModa} />
            <Select label={"Vihcle Armada"} setValue={setValueArmada} keyId={"hullnumber"} keyName={"armadaname"} options={optionsVehicleArmada} />
            <FormInput label="Destination" tagId="destinantion" setValue={setValueDestinantion} value={valueDestinantion} />
            <FormInput label="Plan Date" tagId="plandate" setValue={setValuePlanDate} type="date" />
            <FormInput label="Payload Composition" tagId="payload" setValue={setValuePayload} value={valuePayload} />
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