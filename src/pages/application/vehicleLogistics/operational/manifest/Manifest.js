import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import SearchTable from "../../../../../components/tables/SearchTable";
import Table from "../../../../../components/tables/Table";
import { api } from "../../../../../config";
import { NavLink, useNavigate } from "react-router-dom";
import Modal from "../../../../../components/Modal";
import Alert from "../../../../../components/Alert";
import ErrorNetwork from "../../../../../components/ErrorNetwork";
import { useFetch } from "../../../../../hooks";
import ManifestDetail from "./ManifestDetail";

const columnTable = [
    { field: 'oid', header: 'Manifest Number' },
    { field: 'deliverydate', header: 'Delivery Date' },
    { field: 'origin', header: 'Origin' },
    { field: 'destination', header: 'Destination' },
    { field: 'status', header: 'Status' },
]
// Bagaimana data diambil
const howDataGet = data => {
    return { ...data, deliverydate: data.deliverydate.split(' ')[0] };
}
// Bagaimana data ditampilkan
const displayData = data => {
    return {
        ...data,
        status: data.status.toLowerCase() === 'create' ? (
            <div className="flex gap-x-1 py-1 items-center bg-light-green rounded-sm text-white justify-center">
                {/* <Icon icon="akar-icons:check" className="text-base" /> */}
                <span className="text-sm capitalize">{data.status}</span>
            </div>
        ) : data.status.toLowerCase() === 'bast' ? (
            <div className="flex gap-x-1 py-1 items-center bg-[#0092E4] rounded-sm text-white justify-center">
                {/* <Icon icon="bi:stack" className="text-base" /> */}
                <span className="text-sm capitalize">{data.status}</span>
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
    let navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    // dataBody meruoakan data asli yang didapatkan dari consume API dan tidak diganggu gugat
    const [dataBody, setDataBody, fetchDataBody, isErrorNetwork, setIsErrorNetwork] = useFetch({
        url: "/manifest", setLoading, howDataGet
    });
    // dataShow berfungsi sebagai data yang akan ditampilkan pada table, dapat berubah seperti untuk searcing dll
    const [dataShow, setDataShow] = useState([]);
    // untuk data yang akan ditampilkan Modal -> ModalContent
    const [dataModal, setDataModal] = useState({});
    // untuk membuka dan menutup modal
    const [openModalDetail, setOpenModalDetail] = useState(false);
    const [openModalDelete, setOpenModalDelete] = useState(false);
    const [alert, setAlert] = useState({
        isActived: false,
        code: 0,
        title: "title",
        message: "message"
    })
    const [dataUnit, setDataUnit] = useState([]);

    const fetchDataDetail = () => {

    }
    const setActivedAlert = isActived => {
        setAlert({ ...alert, isActived });
    }
    const handleOpenModalDetail = oid => {
        setOpenModalDetail(true);

    }
    const handleEdit = oid => {
        navigate(`/manifest/${oid}/edit`);
    }
    const handleOpenModalDelete = oid => {
        setOpenModalDelete(true);
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
                iconTitle={"ooui:view-details-ltr"}>
                <ManifestDetail />
            </Modal>
            <Modal isOpen={openModalDelete} setIsOpen={setOpenModalDelete} title="Delete Manifest" ></Modal>
            <Alert isOpen={alert.isActived} setIsOpen={setActivedAlert} codeAlert={alert.code} title={alert.title}>
                {alert.message}
            </Alert>
            {/* Notifikasi Error Ketika Tidak Ada Jaringan */}
            <ErrorNetwork isOpen={isErrorNetwork} setIsOpen={setIsErrorNetwork} />
        </>
    );
}

export default Manifest;