import { Icon } from '@iconify/react'
import React, { useCallback, useState } from 'react'
import { useEffect } from 'react';
import FormInput from '../../../../../components/inputs/FormInput';
import Select from '../../../../../components/inputs/Select'
import TableSelect from '../../../../../components/inputs/TableSelect';
import Loading from '../../../../../components/Loading';
import Modal from '../../../../../components/Modal';
import Table from '../../../../../components/tables/Table';
import { api } from '../../../../../config';

const columnSelectUnit = [
    { field: "enginenumber", header: "Engine Number" },
    { field: "framenumber", header: "Frame Number" },
    { field: "type", header: "Type" },
    { field: "color", header: "Color" },
    { field: "year", header: "Year" },
    { field: "amount", header: "Amount" }
]
const columnTableModal = [
    { field: "enginenumber", header: "Engine Number" },
    { field: "framenumber", header: "Frame Number" },
    { field: "type", header: "Type" },
    { field: "color", header: "Color" },
    { field: "year", header: "Year" },
    { field: "amount", header: "Amount" },
    { field: "action", header: "#" }
]

const BastCreate = () => {
    const templateUnitSelect = useCallback(data => {
        const action = (
            <div className="text-center w-6">
                <button className="px-2 py-1 bg-light-green rounded-sm hover:bg-green-800
                                 active:bg-green-700 text-white"
                    onClick={() => handleSelectUnit(data.oid)}>
                    Select
                </button>
            </div>
        )
        return { ...data, action };
    });
    const [loading, setLoading] = useState(true);
    const [unitSelect, setUnitSelect] = useState([]);
    // options input
    const [optionsManifestNumber, setOptionsManifestNumber] = useState([]);
    const [optionsDataUnit, setOptionsDataUnit] = useState([])
    const [optionsOrigin, setOptionsOrigin] = useState([])
    const [optionsDestination, setOptionsDestination] = useState([])
    // =================== value input variables ========================
    const [value, setValue] = useState({
        maifestnumber: { oid: null, name: "nothing selected" },
        bastdate: ""
    })
    // =================== Modal State ========================
    const [openModalSelectUnit, setOpenModalSelectUnit] = useState(false);
    const handleOpenModalSelectUnit = e => {
        e.preventDefault();
        setOpenModalSelectUnit(true);
    }

    const handleManifestNumberInput = id => {
        if (id !== null) {
            console.log(id);
        }
    }
    const handleSelectUnit = useCallback(oidunit => {
        // memasukan oidunit terpilih ke dalam list unit terpilih
        // idUnitSelected.current = [...idUnitSelected.current, oidunit];
        // menambahkan data terpilih ke list unit select
        // setUnitSelect([...unitSelect, sourceDataUnit.current.filter(data => data.oid === oidunit).map(filter => filter)[0]])
        // mengurangi data terpilih dari list option data unit
        // setOptionsDataUnit(optionsDataUnit.filter(data => data.oid !== oidunit).map(filter => filter));
    })
    const handleDeleteUnit = useCallback(oidunit => {
        // console.log(oidunit);
        // idUnitSelected.current = idUnitSelected.current.filter(id => id !== oidunit).map(filter => filter)
        // mengurangi data terpilih dari list unit select
        // setOptionsDataUnit([...optionsDataUnit, sourceDataUnit.current.filter(data => data.oid === oidunit).map(filter => filter)[0]])
        // setUnitSelect(unitSelect.filter(data => data.oid !== oidunit).map(filter => filter))
    })
    const setValueManifestNumber = newValue => setValue({ ...value, maifestnumber: newValue });
    const setValueBastDate = newValue => setValue({ ...value, bastdate: newValue });

    const loadData = async () => {
        try {
            await api.get('/manifest').then(res => {
                setOptionsManifestNumber(res.data.map(data => {
                    return {
                        oid: data.oid,
                        name: (<div className='grid grid-cols-3'>
                            <span>{data.oid}</span>
                            <span className='text-center'>{data.manifestdate}</span>
                            <span>{data.origin} - {data.destination}</span>
                        </div>)
                    }
                }))
            })
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        loadData()
    }, []);
    return (
        <>
            <div className="p-4">
                <div className="card drop-shadow-lg bg-white p-6">
                    {/* Title */}
                    <div className="flex px-2 pb-4 gap-x-2 items-center divider-bottom mb-12">
                        <Icon icon="fa-solid:truck-loading" className={`text-2xl text-gold `} />
                        <span className="text-lg text-dark-green font-medium">B.A.S.T Create</span>
                    </div>
                    <div className="grid grid-cols-2 gap-6 mb-6">
                        <Select label="Manifest Number" useSelect={[value.maifestnumber, setValueManifestNumber]}
                            keyId="oid" keyName="name" options={optionsManifestNumber} className="capitalize"
                            catchSelect={handleManifestNumberInput} />
                        <FormInput label="Bast Date" setValue={setValueBastDate} tagId={"bastdate"} type="Date" />
                    </div>
                    {/* Data Unit */}
                    <div className="flex justify-between px-2 py-4 items-center divider-bottom mb-6 mt-8">
                        <div className="flex gap-x-2 items-center">
                            <Icon icon="fa6-solid:car-side" className={`text-xl text-gold `} />
                            <span className='text-lg text-dark-green font-medium'>Data Unit</span>
                        </div>
                    </div>
                    <TableSelect dataBody={unitSelect} handleAdd={handleOpenModalSelectUnit}
                        handleDelete={handleDeleteUnit} column={columnSelectUnit} />
                </div>
            </div>
            {/* Modal Sleect Data Unit*/}
            <Modal isOpen={openModalSelectUnit} setIsOpen={setOpenModalSelectUnit} title="Select Data Unit" >
                <Table dataBody={optionsDataUnit.map(option => {
                    return templateUnitSelect(option);
                })} column={columnTableModal} />
            </Modal>
            {/* Loading Page */}
            <Loading isLoading={loading} />
        </>
    )
}

export default BastCreate