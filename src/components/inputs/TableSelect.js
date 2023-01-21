import { Icon } from '@iconify/react';
import React, { useEffect, useState } from 'react';
import Modal from '../Modal';
import LoadingTable from '../tables/LoadingTable';
import Table from '../tables/Table';
import { moneyFormat } from '../../utils';

/*
    dataStart         => jika ada data awal yang akan ditampilkan, namun data ini tidak memiliki action
    sourceDataOptions => berupa useState([Array]), sumber data untuk options dari komponen select nantinya
    selectdeData      => berupa useRef([Array]), berguna untuk menampung id (oid) dari data yang sudah di-select (pilih)
    column            => template table, selalu ada pada setiap penggunaan component Table di system ini
    keyId             => identifire data yang dipilih
    loading           => mengambil variable state loading dari parent component
*/
const TableSelect = ({ dataStart = [], sourceDataOptions, selectedData, column, keyId, loading }) => {
    const [showOptions, setShowOptions] = useState(false);
    const [dataSelected, setDataSelected] = useState([]);
    const [dataOptions, setDataOptions] = useState([]);

    const templateUnitSelect = data => {
        const action = (
            <div className="text-center w-6">
                <button className="px-2 py-1 bg-light-green rounded-sm hover:bg-green-800
                                 active:bg-green-700 text-white"
                    onClick={() => handleSelect(data.oid)}>
                    Select
                </button>
            </div>
        )
        return { ...data, action };
    };
    useEffect(() => {
        setDataOptions(sourceDataOptions);
        setDataSelected([]);
    }, [sourceDataOptions]);

    const handleSelect = oid => {
        // memasukan oid terpilih ke dalam list unit terpilih
        selectedData.current = [...selectedData.current, oid];
        // menambahkan data terpilih ke list unit select
        setDataSelected([...dataSelected, sourceDataOptions.filter(data => data.oid === oid).map(filter => filter)[0]])
        // mengurangi data terpilih dari list option data unit
        setDataOptions(dataOptions.filter(data => data.oid !== oid).map(filter => filter));
    }

    const handleDelete = oid => {
        selectedData.current = selectedData.current.filter(id => id !== oid).map(filter => filter)
        // mengurangi data terpilih dari list unit select
        setDataOptions([...dataOptions, sourceDataOptions.filter(data => data.oid === oid).map(filter => filter)[0]])
        // mengurangi data unit yang sudah selected
        setDataSelected(dataSelected.filter(data => data.oid !== oid).map(filter => filter))
    }

    return <>
        <table className="table-auto w-full">
            <thead>
                <tr>
                    <th className={`p-4 bg-dark-green text-white font-semibold 
                                    text-sm text-center border border-l-[1px] border-white w-14`}>No</th>
                    {column.map(data => (
                        <th key={data.field} className="p-2 bg-dark-green text-white font-semibold 
                                        text-sm text-center border border-l-[1px] border-white">{data.header}</th>
                    ))}
                    {handleDelete ? (
                        <th className={`p-4 bg-dark-green text-white font-semibold 
                            text-sm text-center border border-l-[1px] border-white`}>#</th>
                    ) : ''}
                </tr>
            </thead>
            <tbody>

                {dataStart.length > 0 ? dataStart.map((data, index) => (
                    <tr key={`row ${index}`}>
                        <td className="text-center text-slate-600 ">{index + 1}</td>
                        {column.map(col => (
                            <td key={col.field} className="p-4 text-sm text-slate-700">{data[col.field]}</td>
                        ))}
                    </tr>
                )) : ''}

                {dataSelected.map((data, index) => (
                    <tr key={`row ${index}`} className="hover:bg-light-green/10 ">
                        <td className="text-center text-slate-600 ">{index + dataStart.length + 1}</td>
                        {column.map(col => (
                            <td key={col.field} className="p-4 text-sm text-slate-700">{data[col.field]}</td>
                        ))}
                        {handleDelete ? (
                            <td className='px-4 py-2 text-center'>
                                <button className='rounded border border-[#AF183C] p-1' onClick={() => handleDelete(data[keyId])}>
                                    <Icon icon="bxs:trash-alt" className=' text-[#AF183C]' />
                                </button>
                            </td>
                        ) : ''}
                    </tr>
                ))}
                {!loading ? (
                    <tr className=" bg-dark-green/10 w-full">
                        <td className="text-center text-slate-600">{dataSelected.length + dataStart.length + 1}</td>
                        <td className="text-end py-2 px-4">
                            <button className="p-1 rounded border border-light-green"
                                onClick={() => setShowOptions(true)}>
                                <Icon icon="akar-icons:more-horizontal" className=" text-light-green" />
                            </button>
                        </td>
                        <td colSpan={'100%'}></td>
                    </tr>
                ) : <LoadingTable />}

            </tbody>
        </table>
        {/* Modal Sleect Data Unit*/}
        <Modal isOpen={showOptions} setIsOpen={setShowOptions} title="Select Data Unit" >
            <Table dataBody={dataOptions.map(option => {
                return templateUnitSelect(option);
            })} column={[...column, { field: "action", header: "#" }]} />
        </Modal>
    </>
}
export default React.memo(TableSelect);
