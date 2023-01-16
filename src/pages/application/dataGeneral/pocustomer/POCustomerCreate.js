import { useContext, useRef, useState } from "react";
import FormInput from "../../../../components/inputs/FormInput";
import Select from "../../../../components/inputs/Select";
import { api } from "../../../../config";
import { UserContext } from "../../../../config/User";


const POCustomerCreate = (props) => {
    const [user] = useContext(UserContext);
    const { setIsOpen, setAlert, fetchPoCustomer, options, setLoadingPage } = props
    const { optionsContract } = options.contract;
    const refPoNumber = useRef();
    const [valueContract, setValueContract] = useState({ oid: null, contractname: "nothing selected" });
    // function yang akan dijalankan ketika menekan button create
    const handleClickCreate = e => {
        e.preventDefault()
        setAlert(prev => ({ ...prev, isActive: false }))
        const valuePoNumber = refPoNumber.current.value.toUpperCase()
        if (valuePoNumber && valueContract) {
            setLoadingPage(true)
            // POST untuk /pocustomer
            api.post('/pocustomer', {
                branchoid: user.branch,
                ponumber: valuePoNumber,
                contractoid: valueContract.oid
            }).then(response => {
                setLoadingPage(false)
                fetchPoCustomer();
                setLoadingPage(false)
                setAlert({
                    isActive: true,
                    code: 1,
                    title: "Success",
                    message: "New Data PO Customer Created"
                });
                setIsOpen(false);
                setTimeout(() => {
                    setAlert(prev => ({ ...prev, isActive: false }));
                }, 3000);
            }).catch(error => {
                setLoadingPage(false)
                if (error.response.status !== 422) {
                    if (error.response.status >= 500) {
                        setAlert({
                            isActive: true,
                            code: 0,
                            title: `Error ${error.response.status}`,
                            message: "Server Error"
                        })
                    }
                    console.log(error.response);
                } else {
                    const message = Object.values(error.response.data)[0][0]
                    setAlert({
                        isActive: true,
                        code: 0,
                        title: `Error ${error.response.status}`,
                        message: message
                    })
                }
            })
        } else {
            setAlert({
                isActive: true,
                code: 0,
                title: "Can't Create",
                message: "There is an empty field input"
            })
        }
    }

    return <>
        <div className="flex flex-col gap-y-6 pb-2">
            <FormInput label="PO Number" tagId="ponumber" refrence={refPoNumber} />
            <Select label={"Branch"} useSelect={[{ oid: user.branch, branchname: user.branchname }]}
                keyId={"oid"} keyName={"branchname"} disabled />
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
