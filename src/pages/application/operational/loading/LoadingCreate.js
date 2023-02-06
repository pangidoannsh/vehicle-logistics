import { Icon } from '@iconify/react';
import React, { useContext, useState, useRef } from 'react';
import FormInput from '../../../../components/inputs/FormInput';
import Select from '../../../../components/inputs/Select';
import Table from '../../../../components/tables/Table';
import { api } from '../../../../config';
import { UserContext } from '../../../../config/User';

const LoadingCreate = ({ optionsManifest = [], columnTable, setLoadingPage, setAlert, setOpenModalCreate, reFetch }) => {
    const [user] = useContext(UserContext);
    const [loadingTable, setloadingTable] = useState(false);

    const [selectedUnit, setSelectedUnit] = useState([]);
    const [valueManifest, setvalueManifest] = useState({ oidmanifest: null, manifest: "nothing selected" });
    const loadingDateRef = useRef(null);
    const unitDeleted = useRef(0);

    const resetinput = () => {
        setvalueManifest({ oid: null, transitout: "nothing selected" });
        loadingDateRef.current.value = "";
        unitDeleted.current = 0;
        setSelectedUnit([]);
    }

    const handleSelectManifest = oidmanifest => {
        setloadingTable(true);
        if (oidmanifest) {
            api.get(`/transitoutdetail/${oidmanifest}`).then(res => {
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
        const dataPost = {
            oidmanifest: valueManifest.oidmanifest,
            loadingdate: loadingDateRef.current.value,
            vehiclepooid: selectedUnit.map(unit => unit.oidunitpo)
        }

        setAlert(current => ({ ...current, isActived: false }));
        api.post("/loading", dataPost).then(res => {
            console.log(res);
            reFetch();
            setAlert({
                isActived: true,
                code: 1,
                title: "Success",
                message: "Data Loading Created"
            });
            resetinput();
            setTimeout(() => {
                setAlert(current => ({ ...current, isActived: false }));
            }, 2000);
            setOpenModalCreate(false);
        }).catch(err => {
            console.log(err);
            if (err.response) {
                if (err.response.status > 499) {
                    setAlert({
                        isActived: true,
                        code: 0,
                        title: "Error " + err.response.status,
                        message: "Server Error"
                    });
                }
                else if (err.response.status <= 499) {
                    setAlert({
                        isActived: true,
                        code: 0,
                        title: "Error " + err.response.status,
                        message: "Client Error"
                    });
                }
            }
        }).finally(() => setLoadingPage(false));
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
                <FormInput type="date" label="Loading Date" tagId="loadingdate" refrence={loadingDateRef} />
                <div className="col-span-2">
                    <Select label="Manifest Number" keyId="oidmanifest" keyName="manifest" catchSelect={handleSelectManifest}
                        useSelect={[valueManifest, setvalueManifest]} options={optionsManifest} />
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

export default LoadingCreate;
