import { Icon } from '@iconify/react';
import React, { useState, useContext, useEffect } from 'react';
import LoadingPage from "../../../../components/Loading"
import Modal from '../../../../components/Modal';
import SearchTable from '../../../../components/tables/SearchTable';
import Table from '../../../../components/tables/Table';
import { api } from '../../../../config';
import { useFetch } from '../../../../hooks';
import { AlertContext } from '../../../../layouts/Main';
import LoadingCreate from './LoadingCreate';

const columnTable = [
    { field: 'enginenumber', header: 'Engine Number' },
    { field: 'framenumber', header: 'Frame Number' },
    { field: 'unitbrand', header: 'Brand' },
    { field: 'type', header: 'Type' },
    { field: 'color', header: 'Color' },
    { field: 'year', header: 'Year' }
];

const Loading = () => {
    const [loadingTable, setLoadingTable] = useState(false);
    const [loadingPage, setLoadingPage] = useState(false);
    const [loadingCreate, setLoadingCreate] = useState(false);

    const [alert, setAlert] = useContext(AlertContext);

    const [dataBody, setDataBody, fetchDataBody] = useFetch({
        url: "/loadingdetail", setLoading: setLoadingTable
    })
    const [dataShow, setDataShow] = useState([]);

    const [optionsTransitout, setOptionsTransitout] = useState([]);
    const [openModalCreate, setOpenModalCreate] = useState(false);

    const handleOpenModalCreate = () => {
        setLoadingCreate(true);
        api.get("/manifestlist?filter=transitout").then(res => {
            setOptionsTransitout(res.data.map(data => {
                return {
                    oidmanifest: data.oid,
                    manifest: (<div className='grid grid-cols-3'>
                        <span>{data.oid}</span>
                        <span className='text-center'>{data.transitoutdate}</span>
                        <span>{data.origin} - {data.destination}</span>
                    </div>)
                }
            }));
            setOpenModalCreate(true);
        }).catch(err => {
            console.log(err.response);
        }).finally(() => setLoadingCreate(false));
    }

    useEffect(() => {
        setDataShow(dataBody)
    }, [dataBody]);
    return (
        <>
            {/* Content */}
            <div className="p-4">
                <div className="card bg-white p-6">
                    {/* Title */}
                    <div className="flex justify-between items-center divider-bottom">
                        <div className="flex px-2 py-4 gap-x-2 items-center ">
                            <Icon icon="fa-solid:truck-loading" className={`text-xl text-gold `} />
                            <span className='text-lg text-dark-green font-medium'>Loading</span>
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
                    <Table dataBody={dataShow} column={columnTable} id="oid" loading={loadingTable} pagination>
                        <SearchTable setData={setDataShow} dataBody={dataBody} />
                    </Table>
                </div>
            </div>

            <Modal isOpen={openModalCreate} setIsOpen={setOpenModalCreate} title="Create Loading" size={1000}>
                <LoadingCreate columnTable={columnTable} setLoadingPage={setLoadingPage} reFetch={fetchDataBody}
                    setAlert={setAlert} setOpenModalCreate={setOpenModalCreate} optionsTransitout={optionsTransitout} />
            </Modal>
            <LoadingPage isLoading={loadingPage} />
        </>
    )
}

export default Loading;
