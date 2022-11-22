import { useEffect, useState } from 'react';
import Select from '../../../components/Select'
import FormInput from '../../../components/FormInput'
import { api } from '../../../config'

const MarketingCreate = (props) => {
    const { setIsOpen, setSuccessCreate } = props
    const { optionsBranch, setOptionsBranch } = props.options.Branch
    const [valueBranch, setValueBranch] = useState("");
    const [valuePoNumber, setValuePoNumber] = useState("");
    const [valuePoValue, setValuePoValue] = useState("");
    const [optionsContract, setOptionsContract] = useState([]);

    const handleClickCreate = e => {
        e.preventDefault()
        api.post('/pocustomer', {
            branch: valueBranch,
            po_number: valuePoNumber,
            customer: "PT. Hadji Kalla",
            contractno: "bla",
            contractname: "bla",
            contracttype: "bla",
            povalue: valuePoValue
        }).then(response => {
            console.log(response);
            if (response.status === 201) {
                setSuccessCreate(true)
                setIsOpen(false)
            }
        }).catch(error => {
            console.log(error);
        })
    }

    return <>
        <div className="flex flex-col gap-y-6 pb-2">
            <FormInput label="PO Number" tagId="ponumber" setValue={setValuePoNumber} value={valuePoNumber} />
            <FormInput label="PO Value" tagId="povalue" setValue={setValuePoValue} />
            <Select label={"Branch"} setValue={setValueBranch} keyId={"branchid"} keyName={"branchname"} options={optionsBranch} />
            <Select label={"Contract Name"} setValue={setValueBranch} keyId={"contractid"} keyName={"contractname"} options={optionsContract} />
            {/* <div className="flex flex-col gap-2">
                <label htmlFor="remarks" className='text-slate-600 text-sm'>Remarks (Optional)</label>
                <textarea id="remarks" className="border px-4 py-2 border-template-input text-sm text-slate-700" rows="4"></textarea>
            </div> */}
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

export default MarketingCreate;
