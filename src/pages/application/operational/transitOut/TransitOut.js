import { Icon } from '@iconify/react';
import React, { useState, useEffect, useContext } from 'react';
import Loading from '../../../../components/Loading';
import Modal from '../../../../components/Modal';
import SearchTable from '../../../../components/tables/SearchTable';
import Table from '../../../../components/tables/Table';
import { api } from '../../../../config';
import { useFetch } from '../../../../hooks';
import { AlertContext } from '../../../../layouts/Main';
import { moneyFormat } from '../../../../utils';
import TransitOutCreate from './TransitOutCreate';
import TransitoutEdit from './TransitoutEdit';

const columnTable = [
    { field: 'transitout_date', header: 'Date' },
    { field: 'enginenumber', header: 'Engine Number' },
    { field: 'framenumber', header: 'Frame Number' },
    { field: 'unitbrand', header: 'Brand' },
    { field: 'type', header: 'Type' },
    { field: 'color', header: 'Color' },
    { field: 'year', header: 'Year' }
];
const displayData = data => {
    const date = data.transitout_date.split(" ")[0].split("-").reverse();
    return {
        ...data, transitout_date: `${date[0]}/${date[1]}/${date[2]}`
    };
}

const TransitOut = () => {
    const [loadingCreate, setLoadingCreate] = useState(false);
    const [loadingTable, setLoadingTable] = useState(true);
    const [loadingPage, setLoadingPage] = useState(false);

    const [alert, setAlert] = useContext(AlertContext);

    const [dataBody, setDataBody, fetchDataBody, errorNet] = useFetch({
        url: "transitoutdetail", setLoading: setLoadingTable
    });

    const [dataShow, setDataShow] = useState([]);
    const [dataEdit, setDataEdit] = useState();
    const [optionsManifest, setOptionsManifest] = useState([]);
    const [openModalCreate, setOpenModalCreate] = useState(false);
    const [openModalEdit, setOpenModalEdit] = useState(false);

    const handleOpenModalCreate = e => {
        setLoadingCreate(true);
        api.get("/manifestlist?filter=CREATE").then(res => {
            setOptionsManifest(res.data.map(data => {
                return {
                    oidmanifest: data.oid,
                    manifest: (<div className='grid grid-cols-3'>
                        <span>{data.oid}</span>
                        <span className='text-center'>{data.manifestdate}</span>
                        <span>{data.origin} - {data.destination}</span>
                    </div>)
                }
            }));
            setOpenModalCreate(true);
        }).catch(err => {
            console.log(err);
        }).finally(() => setLoadingCreate(false));
    }

    const handleOpenModalEdit = oid => {
        setDataEdit(dataBody.find(unit => unit.oid === oid));
        setOpenModalEdit(true)
    }
    useEffect(() => {
        setDataShow(dataBody.map(data => {
            return displayData(data);
        }))
    }, [dataBody]);
    return (
        <>
            {/* Content */}
            <div className="p-4">
                <div className="card bg-white p-6">
                    {/* Title */}
                    <div className="flex justify-between items-center divider-bottom">
                        <div className="flex px-2 py-4 gap-x-2 items-center ">
                            <Icon icon="material-symbols:warehouse-rounded" className={`text-2xl text-gold `} />
                            <span className='text-lg text-dark-green font-medium'>Transit Out Unit</span>
                        </div>
                        <div>
                            <button className={`bg-light-green hover:bg-green-700 text-white rounded flex
                                items-center gap-x-1 py-[2px] px-4 `} onClick={handleOpenModalCreate}>
                                {!loadingCreate ?
                                    <>
                                        <Icon icon="fluent:add-12-filled" className="text-base" />
                                        <span className='text-base'>Create</span>
                                    </> :
                                    <div className='px-4 py-1'><Icon icon="eos-icons:loading" /></div>
                                }
                            </button>
                        </div>
                    </div>
                    {/* Table */}
                    <Table dataBody={dataShow} column={columnTable} id="oid" loading={loadingTable} pagination
                        handleActionEdit={handleOpenModalEdit} center={["transitout_date"]}>
                        {/* Search searchFunct={customSearch} */}
                        <SearchTable setData={setDataShow} dataBody={dataBody} customDisplay={displayData} />
                    </Table>
                </div>
            </div>

            <Modal isOpen={openModalCreate} setIsOpen={setOpenModalCreate} title="Create Transit Out" size={1000}>
                <TransitOutCreate optionsManifest={optionsManifest} columnTable={columnTable} setLoadingPage={setLoadingPage}
                    reFetch={fetchDataBody} setAlert={setAlert} setOpenModalCreate={setOpenModalCreate} />
            </Modal>
            <Modal isOpen={openModalEdit} setIsOpen={setOpenModalEdit} title="Edit Transit Out" size={500}>
                <TransitoutEdit currentData={dataEdit} reFetch={fetchDataBody} setAlert={setAlert} setOpenModal={setOpenModalEdit} />
            </Modal>
            <Loading isLoading={loadingPage} />
        </>
    );
}

export default TransitOut;
