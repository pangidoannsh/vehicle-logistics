// import React, { useEffect } from 'react';
// import { useRef } from 'react';
// import { useState } from 'react';
// import FormInput from '../../../components/inputs/FormInput';
// import Select from '../../../components/inputs/Select';
// import { api } from '../../../config';

// const MarketingEdit = ({ oid, setIsOpen, setLoadingPage, options, setSuccessCreate, setFailCreate, setMsgAlert }) => {

//     const { optionsBranch, setOptionsBranch } = options.branch;
//     const { optionsContract, setOptionsContract } = options.contract;

//     // const [valuePoNumber, setValuePoNumber] = useState(dataEdit.valuePoNumber);
//     // const [valueBranch, setValueBranch] = useState("");
//     // const currValueBranch = dataEdit.currentBranch;
//     // const currValueContract = dataEdit.currentContract;
//     // const [valueContract, setValueContract] = useState("");
//     const handleClickEdit = e => {
//         e.preventDefault();
//     }
//     // useEffect(() => {
//     //     api.get(`/pocustomer/${oid}`).then(res => {
//     //         // console.log(res.data);
//     //         const { ponumber, branch, contract, branchname,contractname } = res.data;
//     //         setValuePoNumber(ponumber);
//     //         setValueBranch(branch);
//     //         setCurrBranch({ oid: branch, branchname });
//     //         setValueContract(contract);
//     //         setLoadingPage(false);
//     //     }).catch(error => {
//     //         console.log(error);
//     //         setIsOpen(false);
//     //         setLoadingPage(false);
//     //     })
//     // }, []);
//     return <>
//         <div className="flex flex-col gap-y-6 pb-2">
//             <FormInput label="PO Number" tagId="ponumber" setValue={setValuePoNumber} value={valuePoNumber} />
//             {/* <FormInput label="PO Value" tagId="povalue" setValue={setValuePoValue} /> */}
//             <Select label={"Branch"} setValue={setValueBranch} keyId={"oid"} keyName={"branchname"} options={optionsBranch}
//                 defaultValue={currValueBranch} />
//             <Select label={"Contract Name"} setValue={setValueContract} keyId={"oid"} keyName={"contractname"}
//                 options={optionsContract.map(opt => {
//                     const name = opt.contractno + " - " + opt.contractname;
//                     return { oid: opt.oid, contractname: name }
//                 })} defaultValue={currValueContract} />
//             <div className="flex flex-col gap-2">
//                 <label htmlFor="remarks" className='text-slate-600 text-sm'>Remarks (Optional)</label>
//                 <textarea id="remarks" className="border px-4 py-2 border-template-input text-sm text-slate-700" rows="4"></textarea>
//             </div>
//         </div>
//         <div className="flex justify-end gap-4 px-4 pt-6">
//             <button className="text-green-600 py-2 px-4" onClick={() => setIsOpen(false)}>Close</button>
//             <button type="Submit" onClick={handleClickEdit}
//                 className={`bg-gold hover:bg-yellow-700 text-white rounded flex items-center gap-x-1 py-2 px-4
//                 focus:ring focus:ring-yellow-200 active:ring active:ring-yellow-200`}>
//                 Create New
//             </button>
//         </div>
//     </>
// }

// export default MarketingEdit;
