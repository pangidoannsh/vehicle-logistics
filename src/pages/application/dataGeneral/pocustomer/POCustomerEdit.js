import React from 'react';
import { useContext } from 'react';
import FormInput from '../../../../components/inputs/FormInput';
import Select from '../../../../components/inputs/Select';
import { api } from '../../../../config';
import { UserContext } from '../../../../config/User';

const POCustomerEdit = ({ setIsOpen, currentData, fetchPoCustomer, options, oid, setLoading, setAlert }) => {
    const { optionsContract } = options.contract;
    const [valuePoNumber, setValuePoNumber] = currentData.ponumber ? currentData.ponumber : "";
    const [valueContract, setValueContract] = currentData.contract ? currentData.contract : { oid: null, contractname: "nothing selected" };
    const [user] = useContext(UserContext);

    const handleUpdate = e => {
        e.preventDefault();

        if (valuePoNumber !== "" || valueContract.oid !== null) {
            setLoading(true);
            const dataUpdate = {
                ponumber: valuePoNumber,
                contractoid: valueContract.oid
            }

            api.put(`/pocustomer/${oid}`, dataUpdate).then(res => {
                fetchPoCustomer();
                setIsOpen(false);
                setAlert({
                    isActived: true,
                    code: 1,
                    title: "Success",
                    message: "Data PO Customer Updated"
                })
                setTimeout(() => {
                    setAlert(prev => ({ ...prev, isActived: false }))
                }, 2000)
            }).catch(err => {
                if (err.response.status !== 422) {
                    if (err.response.status >= 500) {
                        setAlert({
                            isActived: true,
                            code: 0,
                            title: `Error ${err.response.status}`,
                            message: "Server Error"
                        })
                    }
                } else {
                    const message = Object.values(err.response.data)[0][0];
                    setAlert({
                        isActived: true,
                        code: 0,
                        title: `Error ${err.response.status}`,
                        message: message
                    })
                }
                console.log(err.response);
            }).finally(() => setLoading(false))
        }
        else {
            setAlert({
                isActived: true,
                code: 0,
                title: "Can't Edit",
                message: "There is an empty field input"
            })
        }
    }

    return (
        <>
            <div className="flex flex-col gap-y-6 pb-2">
                <FormInput label="PO Number" tagId="ponumber" setValue={setValuePoNumber} defaultValue={valuePoNumber} />
                <Select label={"Branch"} useSelect={[{ oid: user.branch, branchname: user.branchname }]}
                    keyId={"oid"} keyName={"branchname"} disabled />
                <Select label={"Contract Name"} useSelect={[valueContract, setValueContract]} keyId={"oid"} keyName={"contractname"}
                    options={optionsContract.map(opt => {
                        const name = opt.contractno + " - " + opt.contractname;
                        return { oid: opt.oid, contractname: name }
                    })} />
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

export default POCustomerEdit;
