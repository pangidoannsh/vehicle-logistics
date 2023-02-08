import { Icon } from '@iconify/react'
import React, { useContext, useState, useEffect, useRef } from 'react';
import FormInput from '../../../../components/inputs/FormInput';
import Select from '../../../../components/inputs/Select';
import Table from '../../../../components/tables/Table';
import { api } from '../../../../config';
import { UserContext } from '../../../../config/User';

const BastCreate = ({ optionsManifest = [], columnTable, setAlert, fetchBast, setOpenModal }) => {
    const [user] = useContext(UserContext);

    const [loadingTable, setloadingTable] = useState(false);
    const [loadingCreate, setloadingCreate] = useState(false);

    const [selectedUnit, setSelectedUnit] = useState([]);
    const [valueManifest, setValueManifest] = useState({ oidmanifest: null, manifest: "nothing selected" });

    const unitDeleted = useRef(0);
    const bastDateRef = useRef(null);
    const loadingLocation = useRef(null);
    const receiverNameRef = useRef(null);

    const handleSelectManifest = oidmanifest => {
        if (oidmanifest) {
            setloadingTable(true);
            api.get(`/loadingdetail/${oidmanifest}`).then(res => {
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
    const handleDelete = oidunit => {
        unitDeleted.current = unitDeleted.current + 1;
        setSelectedUnit(current => current.filter(unit => unit.oidunitpo !== oidunit).map(filter => filter));
    }
    const handleCreate = e => {
        e.preventDefault();
        setAlert(prev => ({ ...prev, isActived: false }));
        const dataPost = {
            manifestoid: valueManifest.oidmanifest,
            bastdate: bastDateRef.current.value,
            loadinglocation: loadingLocation.current.value,
            receivername: receiverNameRef.current.value,
            vehiclepooid: selectedUnit.map(unit => unit.oidunitpo),
        }
        // console.log(dataPost);
        setloadingCreate(true);
        api.post("/beritaacara", dataPost).then(res => {
            setAlert({
                isActived: true,
                code: 1,
                title: "Success",
                message: "New Data BAST Created"
            });
            fetchBast();
            setOpenModal(false);
            setTimeout(() => {
                setAlert(prev => ({ ...prev, isActived: false }));
            }, 3000);
            console.log(res.data);
        }).catch(err => {
            console.log(err.response);
            setAlert({
                isActived: true,
                code: 0,
                title: "Error",
                message: "Failed Create New Data BAST"
            })
        }).finally(() => setloadingCreate(false))
    }
    return (
        <div className='flex flex-col gap-6'>
            <div className='grid grid-cols-2 gap-6'>
                <Select label={"Branch"} useSelect={[{ oid: user.branch, branchname: user.branchname }]}
                    keyId="oid" keyName="branchname" disabled />
                <FormInput type="date" label="B.A.S.T Date" tagId="bastdate" refrence={bastDateRef} />
                <FormInput label="Loading Loacation" tagId="locationloading" refrence={loadingLocation} />
                <FormInput label="Receiver Name" tagId="receivername" refrence={receiverNameRef} />
                <div className="col-span-2">
                    <Select label="Manifest Number" keyId="oidmanifest" keyName="manifest" catchSelect={handleSelectManifest}
                        useSelect={[valueManifest, setValueManifest]} options={optionsManifest} />
                </div>
            </div>
            <div className='flex flex-col gap-3'>
                <div className="flex justify-between px-2 py-4 items-center divider-bottom">
                    <div className="flex gap-x-2 items-center">
                        <Icon icon="fa6-solid:car-side" className={`text-2xl text-gold `} />
                        <span className='text-lg text-dark-green font-medium'>Data Unit</span>
                    </div>
                </div>
                <div>
                    <Table dataBody={selectedUnit} column={[...columnTable, { field: "action", header: "#" }]}
                        loading={loadingTable} center={["action"]} />
                    <div className='mt-2 text-slate-400 text-sm'>Unit Deleted : {unitDeleted.current}</div>
                </div>
                <div className="flex justify-end ">
                    <button type="Submit" onClick={handleCreate}
                        className={`bg-light-green hover:bg-green-700 text-white rounded gap-x-1 py-2 px-4 
                    focus:ring focus:ring-green-200 active:ring active:ring-green-200 text-center`}>
                        {!loadingCreate ? "Save" :
                            <div className='px-4'>
                                <Icon icon="eos-icons:loading" className='text-2xl' />
                            </div>
                        }
                    </button>
                </div>
            </div>
        </div>
    );
}

export default BastCreate;
