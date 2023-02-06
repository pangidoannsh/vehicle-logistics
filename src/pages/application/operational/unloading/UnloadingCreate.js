import { Icon } from '@iconify/react';
import React, { useState, useContext, useRef } from 'react';
import FormInput from '../../../../components/inputs/FormInput';
import Select from '../../../../components/inputs/Select';
import Table from '../../../../components/tables/Table';
import { api } from '../../../../config';
import { UserContext } from '../../../../config/User';

const UnloadingCreate = ({ optionsBast = [], columnTable, setLoadingPage, setAlert, setOpenModalCreate, reFetch }) => {
    const [user] = useContext(UserContext);
    const [loadingTable, setloadingTable] = useState(false);

    const [selectedUnit, setSelectedUnit] = useState([]);
    const [valueBast, setvalueBast] = useState({ oid: null, bast: "nothing selected" });
    const unloadingDateRef = useRef(null);
    const unitDeleted = useRef(0);

    const handleSelectBast = oidbast => {
        setloadingTable(true);
        if (oidbast) {
            api.get(`/beritaacara-detail/${oidbast}`).then(res => {
                unitDeleted.current = 0;
                setSelectedUnit(res.data.map(data => {
                    return {
                        ...data, action: (
                            <button className="text-[#AF183C] hover:text-red-600" onClick={() => handleDelete(data.oidunitpo)}>
                                <Icon icon="bxs:trash-alt" className='text-xl' />
                            </button>
                        )
                    }
                }));
            }).catch(err => {
                console.log(err.response);
            }).finally(() => setloadingTable(false));
        } else {
            setAlert({
                isActived: true,
                code: 0,
                title: "Error",
                message: "Something Error at Code"
            })
        }
    }

    const handleCreate = e => {
        e.preventDefault();
        setLoadingPage(true);
        setAlert(prev => ({ ...prev, isActived: false }));
        const dataPost = {
            oidbast: valueBast.oid,
            unloadingdate: unloadingDateRef.current.value,
            vehiclepooid: selectedUnit.map(unit => unit.oidunitpo)
        }
        console.log(dataPost)
        api.post("unloading", dataPost).then(res => {
            setAlert({
                isActived: true,
                code: 1,
                title: "Success",
                message: "New data Unloading Created"
            })
            setTimeout(() => {
                setAlert(prev => ({ ...prev, isActived: false }));
            }, 3000);
        }).catch(err => {
            setAlert({
                isActived: true,
                code: 0,
                title: "Error " + err.response.status,
                message: "Er"
            })
            setTimeout(() => {
                setAlert(prev => ({ ...prev, isActived: false }));
            }, 2000);
        }).finally(() => setLoadingPage(false))
    }

    const handleDelete = oidUnit => {
        unitDeleted.current = unitDeleted.current + 1;
        setSelectedUnit(current => current.filter(unit => unit.oidunitpo !== oidUnit).map(filter => filter));
    }
    return (
        <div className='flex flex-col gap-6'>
            <div className='grid grid-cols-2 gap-6'>
                <Select label={"Branch"} useSelect={[{ oid: user.branch, branchname: user.branchname }]}
                    keyId="oid" keyName="branchname" disabled />
                <FormInput type="date" label="Unloading Date" tagId="unloadingdate" refrence={unloadingDateRef} />
                <div className="col-span-2">
                    <Select label="B.A.S.T Number" keyId="oid" keyName="bast" catchSelect={handleSelectBast}
                        useSelect={[valueBast, setvalueBast]} options={optionsBast} />
                </div>
            </div>
            <div className='flex flex-col gap-3'>
                <div className="flex justify-between px-2 py-4 items-center divider-bottom">
                    <div className="flex gap-x-2 items-center">
                        <Icon icon="fa6-solid:car-side" className={`text-2xl text-gold `} />
                        <span className='text-lg text-dark-green font-medium'>Data Unit</span>
                    </div>
                </div>
                <div >
                    <Table dataBody={selectedUnit} column={[...columnTable, { field: "action", header: "#" }]}
                        loading={loadingTable} center={["action"]} />
                    <div className='mt-2 text-slate-400 text-sm'>Unit Deleted : {unitDeleted.current}</div>
                </div>
                <div className="flex justify-end ">
                    <button type="Submit" onClick={handleCreate}
                        className={`bg-light-green hover:bg-green-700 text-white rounded gap-x-1 py-2 px-4 
                    focus:ring focus:ring-green-200 active:ring active:ring-green-200 text-center`}>
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
}

export default UnloadingCreate;
