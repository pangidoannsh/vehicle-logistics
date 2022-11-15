import { useEffect, useState } from 'react';
import Select from '../../../components/Select'
import FormInput from '../../../components/FormInput'
import { api } from '../../../config'

const MarketingCreate = (props) => {
    const [valueBranch, setValueBranch] = useState(null);
    const [valuePoNumber, setValuePoNumber] = useState(null);
    const [valuePoValue, setValuePoValue] = useState(null);
    const [optionsBranch, setOptionsBranch] = useState([]);
    const [optionsContract, setOptionsContract] = useState([]);

    const handleClickCreate = e => {
        e.preventDefault()
    }

    useEffect(() => {
        api.get('/branch').then(res => {
            setOptionsBranch(res.data)
        }).catch(error => {
            // console.log(error);
            if (error.code === "ERR_NETWORK") {
                alert('Periksa jaringan anda dan Reload Browser')
            }
        })
    }, []);
    return <>
        <div className="flex flex-col gap-y-6 pb-2">
            <FormInput label="PO Number" tagId="ponumber" setValue={setValuePoNumber} />
            <FormInput label="PO Value" tagId="povalue" setValue={setValuePoValue} />
            <Select label={"Branch"} setValue={setValueBranch} keyId={"branchid"} keyName={"branchname"} options={optionsBranch} />
            <Select label={"Contract Name"} setValue={setValueBranch} keyId={"contractid"} keyName={"contractname"} options={optionsContract} />
            <div className="flex flex-col gap-2">
                <label htmlFor="remarks" className='text-slate-600 text-sm'>Remarks (Optional)</label>
                <textarea id="remarks" className="border px-4 py-2 border-template-input text-sm text-slate-700" rows="4"></textarea>
            </div>
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
