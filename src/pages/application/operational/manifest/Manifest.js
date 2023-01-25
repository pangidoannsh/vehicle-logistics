import { Icon } from "@iconify/react";
import { useEffect, useState, useRef, useContext } from "react";
import SearchTable from "../../../../components/tables/SearchTable";
import Table from "../../../../components/tables/Table";
import { NavLink } from "react-router-dom";
import Modal from "../../../../components/Modal";
import ErrorNetwork from "../../../../components/ErrorNetwork";
import { useFetch } from "../../../../hooks";
import ManifestDetail from "./ManifestDetail";
import Loading from "../../../../components/Loading";
import { api } from "../../../../config";
import ManifestEdit from "./ManifestEdit";
import { AlertContext } from "../../../../layouts/Main";

const columnTable = [
    { field: 'oid', header: 'Manifest Number' },
    { field: 'deliverydate', header: 'Delivery Date' },
    { field: 'origin', header: 'Origin' },
    { field: 'destination', header: 'Destination' },
    { field: 'status', header: 'Status' },
]
// Bagaimana data diambil
const howDataGet = data => {
    return {
        ...data, deliverydate: data.deliverydate.split(" ")[0],
        origin: data.origin.toUpperCase(), destination: data.destination.toUpperCase()
    };
}
// Bagaimana data ditampilkan
const displayData = data => {
    const date = data.deliverydate.split("-").reverse();
    return {
        ...data,
        deliverydate: `${date[0]}-${date[1]}-${date[2]}`,
        status: data.status.toLowerCase() === 'create' ? (
            <div className="flex gap-x-1 py-1 items-center bg-light-green rounded-sm text-white justify-center">
                {/* <Icon icon="akar-icons:check" className="text-base" /> */}
                <span className="text-sm capitalize">{data.status}</span>
            </div>
        ) : data.status.toLowerCase() === 'bast' ? (
            <div className="flex gap-x-1 py-1 items-center bg-[#0092E4] rounded-sm text-white justify-center">
                {/* <Icon icon="bi:stack" className="text-base" /> */}
                <span className="text-sm capitalize">B.A.S.T</span>
            </div>
        ) : data.status.toLowerCase() === 'closed' ? (
            <div className="flex gap-x-1 py-1 items-center bg-[#A90101] rounded-sm text-white justify-center">
                {/* <Icon icon="eos-icons:init-container" className="text-base" /> */}
                <span className="text-sm capitalize">{data.status}</span>
            </div>
        ) : data.status
    }
}

const Manifest = () => {
    const [loading, setLoading] = useState(true);
    const [loadingPage, setLoadingPage] = useState(false);
    // dataBody meruoakan data asli yang didapatkan dari consume API dan tidak diganggu gugat
    const [dataBody, setDataBody, fetchDataBody, isErrorNetwork, setIsErrorNetwork] = useFetch({
        url: "/manifest", setLoading, howDataGet
    });
    // dataShow berfungsi sebagai data yang akan ditampilkan pada table, dapat berubah seperti untuk searcing dll
    const [dataShow, setDataShow] = useState([]);
    // untuk data yang akan ditampilkan Modal -> ModalContent
    const [dataDetail, setDataDetail] = useState({});
    const oidDetailManifest = useRef(null);
    const oidDataEdit = useRef(null);
    const oidDataDelete = useRef(null);
    const [editOrigin, setEditOrigin] = useState({ oid: -1, origin: "nothing selected" });
    const [editDestination, setEditDestination] = useState({ oid: -1, destination: "nothing selected" });
    const [editDeliverydate, setEditDeliverydate] = useState("");

    const [optionsOrigin] = useFetch({ url: "/origin" })
    const [optionsDestination] = useFetch({ url: "/destination" })
    // data unit di dalam manifest
    const [dataUnitManifest, setDataUnitManifest] = useState([]);
    // untuk membuka dan menutup modal
    const [openModalDetail, setOpenModalDetail] = useState(false);
    const [openModalDelete, setOpenModalDelete] = useState(false);
    const [openModalEdit, setOpenModalEdit] = useState(false);

    const [alert, setAlert] = useContext(AlertContext);

    const setActivedAlert = isActived => {
        setAlert(current => ({ ...current, isActived }));
    }
    const setTotalAmountDetailManifest = newAmount => {
        setDataBody(dataBody.map(data => {
            if (data.oid === oidDetailManifest.current) {
                return { ...data, totalamount: newAmount }
            }
            return data;
        }))
    }
    const handleOpenModalDetail = oid => {
        if (oidDetailManifest.current !== oid) {
            oidDetailManifest.current = oid;
            setLoadingPage(true);
            setDataDetail(dataBody.find(data => data.oid === oid));
            api.get(`/manifestdetail/${oid}`).then(res => {
                setDataUnitManifest(res.data);
            }).catch(err => {
                console.log(err.response);
            }).finally(() => {
                setLoadingPage(false);
                setOpenModalDetail(true);
            })
        } else {
            setOpenModalDetail(true);
        }
    }

    const handleEdit = oid => {
        oidDataEdit.current = oid;
        if (oid) {
            const dataCurrent = dataBody.find(data => data.oid === oid);

            setEditOrigin(curr => ({ ...curr, origin: dataCurrent.origin }));
            setEditDestination(curr => ({ ...curr, destination: dataCurrent.destination }));
            setEditDeliverydate(dataCurrent.deliverydate);
            setOpenModalEdit(true);
        }
    }
    const handleOpenModalDelete = oid => {
        oidDataDelete.current = oid;
        setOpenModalDelete(true);
    }
    const handleDelete = () => {
        setLoadingPage(true);
        setActivedAlert(false);
        api.delete(`/manifest/${oidDataDelete.current}`).then(res => {
            setDataBody(dataBody.filter(data => data.oid !== oidDataDelete.current).map(filter => filter));
            setOpenModalDelete(false);
            setAlert({
                isActived: true,
                code: 1,
                title: "Success",
                message: "Data Manifest Deleted"
            })
            setTimeout(() => {
                setActivedAlert(false);
            }, 3000);
        }).catch(err => {
            setAlert({
                isActived: true,
                code: 0,
                title: "Error " + err.response.status,
                message: "Delete data failed"
            })
            console.log(err.response);
        }).finally(() => setLoadingPage(false))
    }
    // memberikan nilai ke datashow dari data bodi(api)
    useEffect(() => {
        setDataShow(dataBody.map(data => {
            return displayData(data);
        }));
    }, [dataBody])

    return (
        <>
            {/* Content */}
            <div className="p-4 pb-14">
                <div className="card bg-white p-6">
                    {/* Title */}
                    <div className="flex justify-between items-center divider-bottom">
                        <div className="flex px-2 py-4 gap-x-2 items-center">
                            <Icon icon="bi:stack" className={`text-2xl text-gold `} />
                            <span className='text-lg text-dark-green font-medium'>Manifest</span>
                        </div>
                        <div>
                            <NavLink to="/manifest/create" className="bg-light-green hover:bg-green-700 text-white rounded flex
                                items-center gap-x-1 py-[2px] px-4" >
                                <Icon icon="fluent:add-12-filled" className="text-base" />
                                <span className='text-base'>Create</span>
                            </NavLink>
                        </div>
                    </div>
                    {/* Table */}
                    <Table dataBody={dataShow} column={columnTable} id="oid" loading={loading}
                        handleClickField={handleOpenModalDetail} handleActionEdit={handleEdit}
                        handleActionDelete={handleOpenModalDelete} pagination>
                        {/* Search */}
                        <SearchTable setData={setDataShow} dataBody={dataBody} customDisplay={displayData} />
                    </Table>
                </div>
            </div>
            {/* Modal Detail */}
            <Modal isOpen={openModalDetail} setIsOpen={setOpenModalDetail} title="Manifest Detail"
                iconTitle="ooui:view-details-ltr">
                <ManifestDetail dataDetail={dataDetail} dataUnitManifest={dataUnitManifest} setAlert={setAlert}
                    setDataUnitManifest={setDataUnitManifest} setDataDetail={setDataDetail}
                    setTotalAmountManifest={setTotalAmountDetailManifest} />
            </Modal>
            <Modal isOpen={openModalEdit} setIsOpen={setOpenModalEdit} title="Edit Manifest" size={500}>
                <ManifestEdit setIsOpen={setOpenModalEdit} setLoadinPage={setLoadingPage} dataCurrent={{
                    origin: [editOrigin, setEditOrigin],
                    destination: [editDestination, setEditDestination],
                    deliverydate: [editDeliverydate, setEditDeliverydate]
                }} options={{ origin: optionsOrigin, destination: optionsDestination }} id={oidDataEdit.current}
                    fetchManifest={fetchDataBody} setAlert={setAlert} />
            </Modal>

            {/* Modal Konfirmasi Delete Manifest */}
            <Modal isOpen={openModalDelete} setIsOpen={setOpenModalDelete} title="Delete Manifest" size={500}>
                <div className='text-slate-600 text-xl font-medium'>
                    Are you sure want to <span className="text-red-600">Delete</span> this Data Manifest ?
                </div>
                <div className="flex justify-end gap-x-4 mt-4">
                    <button className={`text-slate-500 hover:text-slate-600 items-center gap-x-1 py-2 px-4 `}
                        onClick={() => setOpenModalDelete(false)}>
                        Cancel
                    </button>
                    <button type="Submit" className={`border border-red-600 text-red-600 rounded flex items-center gap-x-1 py-2 px-4 
                            focus:ring focus:ring-red-200 active:ring active:ring-red-200`} onClick={handleDelete}>
                        Delete
                    </button>
                </div>
            </Modal>
            {/* Notifikasi Error Ketika Tidak Ada Jaringan */}
            <ErrorNetwork isOpen={isErrorNetwork} setIsOpen={setIsErrorNetwork} />
            <Loading isLoading={loadingPage} />
        </>
    );
}

export default Manifest;