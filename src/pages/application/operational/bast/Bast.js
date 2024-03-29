import { Icon } from '@iconify/react'
import React, { useEffect, useState, useContext, useRef } from 'react'
import ButtonCreate from '../../../../components/ButtonCreate'
import ErrorNetwork from '../../../../components/ErrorNetwork'
import Loading from '../../../../components/Loading'
import Modal from '../../../../components/Modal'
import SearchTable from '../../../../components/tables/SearchTable'
import Table from '../../../../components/tables/Table'
import { api } from '../../../../config'
import { useFetch } from '../../../../hooks'
import { AlertContext } from '../../../../layouts/Main'
import BastCreate from './BastCreate'
import BastDetail from './BastDetail'
import BastEdit from './BastEdit'

const columnTable = [
    { field: 'oid', header: 'BAST Number' },
    { field: 'bastdate', header: 'BAST Date' },
    { field: 'origin', header: 'Origin' },
    { field: 'destination', header: 'Destination' },
    { field: 'oidmanifest', header: 'Manifest Number' },
    { field: 'moda', header: 'Moda' },
    { field: 'status', header: 'Status' },
]
const columtTableUnit = [
    { field: 'enginenumber', header: 'Engine Number' },
    { field: 'framenumber', header: 'Frame Number' },
    { field: 'unitbrand', header: 'Brand' },
    { field: 'type', header: 'Type' },
    { field: 'color', header: 'Color' },
    { field: 'year', header: 'Year' }
];
const howDataGet = data => {
    return { ...data, bastdate: data.bastdate.split(" ")[0] };
}
const dataDisplay = data => {
    const date = data.bastdate.split(" ")[0].split("-").reverse();
    return {
        ...data, bastdate: `${date[0]}/${date[1]}/${date[2]}`,
        status: data.status.toLowerCase() === 'create' ? (
            <div className="flex gap-x-1 py-1 items-center bg-light-green rounded-sm text-white justify-center">
                {/* <Icon icon="akar-icons:check" className="text-base" /> */}
                <span className="text-sm capitalize">{data.status}</span>
            </div>
        ) : data.status.toLowerCase() === 'unloading' ? (
            <div className="flex gap-x-1 py-1 items-center bg-[#0092E4] rounded-sm text-white justify-center">
                {/* <Icon icon="bi:stack" className="text-base" /> */}
                <span className="text-sm capitalize">{data.status}</span>
            </div>
        ) : data.status.toLowerCase() === 'closed' ? (
            <div className="flex gap-x-1 py-1 items-center bg-[#A90101] rounded-sm text-white justify-center">
                {/* <Icon icon="eos-icons:init-container" className="text-base" /> */}
                <span className="text-sm capitalize">{data.status}</span>
            </div>
        ) : data.status.toLowerCase() === 'invoice' ? (
            <div className="flex gap-x-1 py-1 px-2 items-center bg-slate-300 rounded-sm text-slate-500 justify-center">
                <span className="text-sm capitalize">{data.status}</span>
            </div>
        ) : data.status
    }
}

const Bast = () => {
    const [alert, setAlert] = useContext(AlertContext);

    const [loading, setLoading] = useState(true);
    const [loadingPage, setLoadingPage] = useState(false);
    const [loadingCreate, setLoadingCreate] = useState(false);
    const [loadingDelete, setLoadingDelete] = useState(false);
    const [dataBody, setDataBody, fetchDataBody, isErrorNetwork, setIsErrorNetwork] = useFetch({
        url: "/beritaacara", setLoading, howDataGet
    })
    const [dataShow, setDataShow] = useState([]);
    const [dataEdit, setDataEdit] = useState([]);
    const [dataDetail, setDataDetail] = useState([]);
    const [dataUnitBast, setDataUnitBast] = useState([]);

    const idWillDelete = useRef();

    const [openModalDetail, setOpenModalDetail] = useState(false);
    const [openModalCreate, setOpenModalCreate] = useState(false);
    const [openModalEdit, setOpenModalEdit] = useState(false);
    const [openModalDelete, setOpenModalDelete] = useState(false);
    const [optionsManifest, setOptionsManifest] = useState([]);

    const handleOpenModalDetail = oid => {
        // console.log(oid);
        setLoadingPage(true);
        setDataDetail(dataBody.find(data => data.oid === oid));
        api.get(`/beritaacara-detail/${oid}`).then(res => {
            setDataUnitBast(res.data);
            setOpenModalDetail(true)
        }).catch(err => {
            console.log(err.response);
            setAlert({
                isActived: true,
                code: 0,
                title: "Error",
                message: "Get data unit failed"
            });
        }).finally(() => setLoadingPage(false))
    }

    const handleOpenModalCreate = e => {
        e.preventDefault();
        setLoadingCreate(true);
        api.get("/manifestlist?filter=loading").then(res => {
            setOptionsManifest(res.data.map(data => {
                return {
                    oidmanifest: data.oid,
                    manifest: (<div className='grid grid-cols-3'>
                        <span>{data.oid}</span>
                        <span className='text-center'>{data.loadingdate}</span>
                        <span>{data.origin} - {data.destination}</span>
                    </div>)
                }
            }));
            setOpenModalCreate(true);
        }).catch(err => {

        }).finally(() => setLoadingCreate(false))

    }
    const handleOpenModalEdit = oid => {
        setDataEdit(dataBody.find(unit => unit.oid === oid));
        setOpenModalEdit(true)
    }

    const handleOpenModalDelete = oid => {
        if (oid) {
            idWillDelete.current = oid
            setOpenModalDelete(true);
        } else {
            console.log(oid);
        }
    }

    const handleDelete = e => {
        e.preventDefault();
        console.log(idWillDelete.current);
        setLoadingDelete(true);
        setAlert(prev => ({ ...prev, isActived: false }));
        api.delete(`/beritaacara/${idWillDelete.current}`).then(res => {
            setAlert({
                isActived: true,
                code: 1,
                title: "Success",
                message: "Data B.A.S.T Deleted"
            })
            console.log(res.data);
        }).catch(err => {
            // console.log(err);
            let code = 0;
            let message = "";
            switch (err.response.status) {
                case 503:
                    message = err.response.data;
                    break;
                case 403:
                    code = 2;
                    message = err.response.data.message;
                    break;
                default:
                    message = "Failed Deleted Data B.A.S.T"
            }
            setAlert({
                isActived: true,
                code,
                title: `Error ${err.response.status}`,
                message
            })
            setTimeout(() => {
                setAlert(prev => ({ ...prev, isActived: false }));
            }, 3000)
        }).finally(() => setLoadingDelete(false))

    }
    const handleDownload = (oid) => {
        console.log(oid);
        api.get('/beritaacara/download/' + oid, { responseType: 'blob' }).then(response => {
            console.log(response);
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `BAST_${oid}.pdf`);
            document.body.appendChild(link);
            link.click();
            link.remove();
            setAlert({
                isActived: true,
                code: 1,
                title: `Success`,
                message: 'Download BAST done'
            })
        }).catch(err => {
            setAlert({
                isActived: true,
                code: 0,
                title: `Error`,
                message: 'Failed to download BAST'
            })
            console.log(err);
        }).finally(() => setTimeout(() => setAlert(prev => ({ ...prev, isActived: false })), 2000))
    }
    useEffect(() => {
        setDataShow(dataBody.map(data => {
            return dataDisplay(data);
        }));
    }, [dataBody]);
    // penonaktifan fail alert ketika modal create atau edit tertutup
    useEffect(() => {
        if ((!openModalCreate) && (alert.code === 0)) {
            setAlert(prev => ({ ...prev, isActived: false }));
        }
    }, [openModalCreate]);
    return (
        <>
            {/* Content */}
            <div className="p-4">
                <div className="card shadow-lg bg-white p-6">
                    {/* Title */}
                    <div className="flex justify-between items-center divider-bottom">
                        <div className="flex px-2 py-4 gap-x-2 items-center">
                            <Icon icon="material-symbols:assignment-turned-in-rounded" className={`text-2xl text-gold `} />
                            <span className="text-lg text-dark-green font-medium">B.A.S.T</span>
                        </div>
                        <div>
                            <ButtonCreate onClick={handleOpenModalCreate} loading={loadingCreate} />
                        </div>
                    </div>
                    {/* Table */}
                    <Table dataBody={dataShow} column={columnTable} id="oid" loading={loading} clickField="oid"
                        handleClickField={handleOpenModalDetail} pagination handleActionDelete={handleOpenModalDelete}
                        handleActionEdit={handleOpenModalEdit} handleActionDownload={handleDownload}>
                        {/* Search */}
                        <SearchTable setData={setDataShow} dataBody={dataBody} />
                    </Table>
                </div>
            </div>
            {/* Modal Create */}
            <Modal isOpen={openModalCreate} setIsOpen={setOpenModalCreate} title="Create B.A.S.T" size={1000}>
                <BastCreate optionsManifest={optionsManifest} columnTable={columtTableUnit} setAlert={setAlert}
                    fetchBast={fetchDataBody} setOpenModal={setOpenModalCreate} />
            </Modal>
            {/* Modal Detail */}
            <Modal isOpen={openModalDetail} setIsOpen={setOpenModalDetail} title="Detail B.A.S.T" iconTitle="ooui:view-details-ltr">
                <BastDetail dataDetail={dataDetail} dataUnitBast={dataUnitBast} />
            </Modal>
            {/* Modal Edit */}
            <Modal isOpen={openModalEdit} setIsOpen={setOpenModalEdit} title="Edit B.A.S.T" size={500}>
                <BastEdit currentData={dataEdit} reFetch={fetchDataBody} setAlert={setAlert} setOpenModal={setOpenModalEdit} />
            </Modal>
            {/* Modal Delete */}
            <Modal isOpen={openModalDelete} setIsOpen={setOpenModalDelete} size={500} >
                <div className='text-slate-600 text-xl font-medium'>
                    Are you sure want to Delete Data B.A.S.T?
                </div>
                <div className="flex justify-end gap-x-4 mt-4">
                    <button className={`text-slate-500 hover:text-slate-600 items-center gap-x-1 py-2 px-4 `}
                        onClick={() => setOpenModalDelete(false)}>
                        Cancel
                    </button>
                    <button type="Submit" className={`border border-red-600 text-red-600 rounded flex items-center gap-x-1 py-2 px-4 
                            focus:ring focus:ring-red-200 active:ring active:ring-red-200`} onClick={handleDelete}>
                        {!loadingDelete ? <>
                            Delete
                        </> :
                            <div className='px-3'><Icon icon="eos-icons:loading" className='text-2xl' /></div>
                        }
                    </button>
                </div>
            </Modal>
            {/* Notifikasi Error Ketika Tidak Ada Jaringan */}
            <ErrorNetwork isOpen={isErrorNetwork} setIsOpen={setIsErrorNetwork} />
            <Loading isLoading={loadingPage} />
        </>
    )
}

export default Bast