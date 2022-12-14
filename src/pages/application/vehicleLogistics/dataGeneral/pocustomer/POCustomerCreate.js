import { useContext, useRef } from "react";
import { useState } from "react";
import FormInput from "../../../../../components/inputs/FormInput";
import Select from "../../../../../components/inputs/Select";
import { api } from "../../../../../config";
import { UserContext } from "../../../../../config/User";


const POCustomerCreate = (props) => {
    const user = useContext(UserContext);
    const { setIsOpen, setSuccessCreate, setFailCreate, setMsgAlert, fetchPoCustomer, options, setLoadingPage } = props
    const { optionsBranch, setOptionsBranch } = options.branch
    const { optionsContract, setOptionsContract } = options.contract
    const [valueBranch, setValueBranch] = useState({ oid: null, branchname: "nothing selected" });
    const refPoNumber = useRef();
    const [valueContract, setValueContract] = useState({ oid: null, contractname: "nothing selected" });
    // function yang akan dijalankan ketika menekan button create
    const handleClickCreate = e => {
        e.preventDefault()
        setFailCreate(false);
        const valuePoNumber = refPoNumber.current.value.toUpperCase()
        if (valueBranch && valuePoNumber && valueContract) {
            setLoadingPage(true)
            // POST untuk /pocustomer
            api.post('/pocustomer', {
                branchoid: valueBranch.oid,
                ponumber: valuePoNumber,
                contractoid: valueContract.oid,
                user: user.id
            }).then(response => {
                setLoadingPage(false)
                if (response.status === 201) {
                    fetchPoCustomer();
                    setSuccessCreate(true);
                    setLoadingPage(false)
                    setMsgAlert(["Success", "New Data Created"]);
                    setIsOpen(false);
                    setTimeout(() => {
                        setSuccessCreate(false)
                    }, 3000);
                }
            }).catch(error => {
                setLoadingPage(false)
                if (error.status !== 422) {
                    console.log(error.response);
                }
                const message = Object.values(error.response.data)[0][0]
                setFailCreate(true);
                setMsgAlert([`Error ${error.response.status}`, message]);
            })
        } else {
            setFailCreate(true)
            setMsgAlert(["Can't Create", "There is an empty field input"])
        }
    }

    return <>
        <div className="flex flex-col gap-y-6 pb-2">
            <FormInput label="PO Number" tagId="ponumber" refrence={refPoNumber} />
            <Select label={"Branch"} useSelect={[valueBranch, setValueBranch]} keyId={"oid"} keyName={"branchname"} options={optionsBranch} />
            <Select label={"Contract Name"} useSelect={[valueContract, setValueContract]} keyId={"oid"} keyName={"contractname"}
                options={optionsContract.map(opt => {
                    const name = opt.contractno + " - " + opt.contractname;
                    return { oid: opt.oid, contractname: name }
                })} />
        </div>
        <div className="flex justify-end gap-4 px-4 pt-6">
            <button className="text-green-600 py-2 px-4" onClick={() => props.setIsOpen(false)}>Close</button>
            <button type="Submit" onClick={handleClickCreate}
                className={`bg-light-green hover:bg-green-700 text-white rounded flex items-center gap-x-1 py-2 px-4 
                focus:ring focus:ring-green-200 active:ring active:ring-green-200`}>
                Save
            </button>
        </div>
    </>
}

export default POCustomerCreate;
