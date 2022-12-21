import React from 'react';
import { useContext } from 'react';
import FormInput from '../../../../../components/inputs/FormInput';
import Select from '../../../../../components/inputs/Select';
import { api } from '../../../../../config';
import { UserContext } from '../../../../../config/User';

const PlanArmadaEdit = ({ setIsOpen, options, setAlert, setLoadingPage, fetchPlanArmada, currentData, oid }) => {
    const [user] = useContext(UserContext);
    const { moda, armada, destination, plandate, payload } = currentData;
    const [valueArmada] = armada;
    const [valueModa] = moda;
    const [valueDestination] = destination;
    const [valuePlanDate, setValuePlanDate] = plandate;
    const [valuePayload, setValuePayload] = payload;
    const { optionsModa, optionsVehicleArmada, optionsDestination } = options;


    const handleCLickUpdate = e => {
        e.preventDefault();
        setAlert(prev => ({ ...prev, isActived: false }));
        const dataUpdate = {
            hullnumber: valueArmada.hullnumber,
            moda: valueModa.id,
            destination: valueDestination.key,
            plandate: valuePlanDate,
            payloadcomposition: valuePayload,
        }
        if (Object.values(dataUpdate).findIndex(data => (data === "" || data === null)) === -1) {
            setLoadingPage(true);

            api.put(`/planarmada/${oid}`, dataUpdate)
                .then(response => {
                    fetchPlanArmada();
                    setAlert({
                        isActived: true,
                        code: 1,
                        title: "Success",
                        message: "Data Plan Armada Updated"
                    })
                    setIsOpen(false);
                    setTimeout(() => {
                        setAlert(prev => ({ ...prev, isActived: false }));
                    }, 2000)
                    console.log(response.data);
                }).catch(err => {
                    console.log(err.response);
                    alert("error");
                }).finally(() => setLoadingPage(false))
        } else {
            console.log(dataUpdate);
            setAlert({
                isActived: true,
                code: 0,
                title: "Can't Create",
                message: "There is an empty field input"
            })
        }

    }
    return (
        <form onSubmit={handleCLickUpdate}>
            <div className="flex flex-col gap-y-6 pb-2">
                <Select label={"Branch"} useSelect={[{ oid: user.branch, branchname: user.branchname }]} keyId={"oid"} keyName={"branchname"} disabled />
                <Select label={"Moda"} useSelect={moda} keyId={"id"} keyName={"name"} options={optionsModa} />
                <Select label={"Vihcle Armada"} useSelect={armada} keyId={"hullnumber"} keyName={"armadaname"} options={optionsVehicleArmada} />
                <Select label={"Destination"} useSelect={destination} keyId={"key"} keyName={"name"}
                    options={optionsDestination.map(option => {
                        return { key: option.destination, name: option.destination }
                    })} />
                <FormInput label="Plan Date" tagId="plandate" defaultValue={valuePlanDate} setValue={setValuePlanDate} type="date" />
                <FormInput label="Payload Composition" tagId="payload" defaultValue={valuePayload} setValue={setValuePayload} />
            </div>
            <div className="flex justify-end gap-4 px-4 pt-6">
                <div className="text-gold py-2 px-4 cursor-pointer" onClick={() => setIsOpen(false)}>Close</div>
                <button type="Submit" className={`bg-gold hover:bg-yellow-600 text-white rounded flex items-center 
                gap-x-1 py-2 px-4 focus:ring focus:ring-yellow-200 active:ring active:ring-yellow-200`}>
                    Update
                </button>
            </div>
        </form>
    );
}

export default PlanArmadaEdit;
