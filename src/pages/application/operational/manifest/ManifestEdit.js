import React from 'react';
import FormInput from '../../../../components/inputs/FormInput';
import Select from '../../../../components/inputs/Select';
import { api } from '../../../../config';

const ManifestEdit = ({ setIsOpen, dataCurrent, options, id, setLoadinPage, fetchManifest, setAlert }) => {

    const { origin, destination, deliverydate } = dataCurrent;
    const [originValue] = origin;
    const [destinationnValue] = destination;
    const [deliverydateValue, setDeliverydateValue] = deliverydate;
    const handleUpdate = e => {
        if (!id) {
            window.alert("error: oid not found");
            return;
        }
        setAlert(current => ({ ...current, isActived: false }));
        setLoadinPage(true);
        const dataUpdate = {
            origin: originValue.origin,
            destination: destinationnValue.destination,
            deliverydate: deliverydateValue
        }
        // console.log({ ...dataUpdate, id });
        api.put(`manifest/${id}`, dataUpdate).then(res => {
            console.log(res);
            setAlert({
                isActived: true,
                code: 1,
                title: "Success",
                message: "Data Manifest Updated"
            })
            setTimeout(() => {
                setAlert(current => ({ ...current, isActived: false }));
            }, 3000)
            fetchManifest();
            setIsOpen(false);
        }).catch(err => {
            console.log(err.response);
            if (err.response.status >= 500) {
                setAlert({
                    isActived: true,
                    code: 0,
                    title: "Error " + err.response.status,
                    message: "Server Error"
                })
            }
            else {
                setAlert({
                    isActived: true,
                    code: 0,
                    title: "Error " + err.response.status,
                    message: "Client Error"
                })
            }
        }).finally(() => setLoadinPage(false))

    }
    return (
        <>
            <div className="flex flex-col gap-y-6 pb-2">
                <Select label={"Origin"} useSelect={origin} keyId={"oid"} keyName={"origin"}
                    options={options.origin} />
                <Select label={"Destination"} useSelect={destination} keyId={"oid"} keyName={"destination"}
                    options={options.destination} />
                <FormInput label="Delivery Date" tagId="deliverydate" type="date"
                    setValue={setDeliverydateValue} defaultValue={deliverydateValue} />
            </div>
            <div className="flex justify-end gap-4 px-4 pt-6">
                <button className="text-gold py-2 px-4" onClick={() => setIsOpen(false)}>Close</button>
                <button type="Submit" onClick={handleUpdate}
                    className={`bg-gold hover:bg-yellow-600 text-white rounded flex items-center gap-x-1 py-2 px-4 
                focus:ring focus:ring-yellow-200 active:ring active:ring-yellow-200`}>
                    Update
                </button>
            </div>
        </>
    );
}

export default ManifestEdit;
