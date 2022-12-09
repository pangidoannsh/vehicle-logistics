import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import SearchTable from "../../../../../components/tables/SearchTable";
import Table from "../../../../../components/tables/Table";
import { api } from "../../../../../config";
import { NavLink } from "react-router-dom";
import Modal from "../../../../../components/Modal";

const columnTable = [
    { field: 'oid', header: 'Manifest Number' },
    { field: 'deliverydate', header: 'Delivery Date' },
    { field: 'origin', header: 'Origin' },
    { field: 'destination', header: 'Destination' },
    { field: 'status', header: 'Status' },
]
// Bagaimana data diambil
const templateData = data => {
    return { ...data, deliverydate: data.deliverydate.split(' ')[0] };
}
// Bagaimana data ditampilkan
const displayData = data => {
    return {
        ...data,
        status: data.status.toLowerCase() === 'ready' ? (
            <div className="flex gap-x-1 py-1 items-center bg-light-green rounded-sm text-white justify-center">
                <Icon icon="akar-icons:check" className="text-base" />
                <span className="text-sm capitalize">{data.status}</span>
            </div>
        ) : data.status.toLowerCase() === 'manifest' ? (
            <div className="flex gap-x-1 py-1 items-center bg-[#0092E4] rounded-sm text-white justify-center">
                <Icon icon="bi:stack" className="text-base" />
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

    const [loading, setLoading] = useState(true);
    // dataBody meruoakan data asli yang didapatkan dari consume API dan tidak diganggu gugat
    const [dataBody, setDataBody] = useState([]);
    // dataShow berfungsi sebagai data yang akan ditampilkan pada table, dapat berubah seperti untuk searcing dll
    const [dataShow, setDataShow] = useState([]);
    // untuk data yang akan ditampilkan Modal -> ModalContent
    const [dataModal, setDataModal] = useState({});
    const [isErrorNetwork, setIsErrorNetwork] = useState(false);
    // untuk membuka dan menutup modal
    const [openModalDetail, setOpenModalDetail] = useState(false);

    const handleOpenModalDetail = oid => {
        setOpenModalDetail(true);

    }
    // use effect untuk consume API
    useEffect(() => {
        api.get('/manifest').then(res => {
            setDataBody(res.data.map(data => templateData(data)))
            setLoading(false)
        }).catch(error => {
            console.log(error.response);
            if (error.code === "ERR_NETWORK") {
                setIsErrorNetwork(true)
            }
        })
    }, []);

    // memberikan nilai ke datashow dari data bodi(api)
    useEffect(() => {
        setDataShow(dataBody.map(data => {
            return displayData(data);
        }));
    }, [dataBody])

    return (
        <>
            {/* After Header */}
            <div className="flex justify-end items-center px-4 py-3 divider-top bg-white">
                <NavLink to="/manifest/create" className="bg-light-green hover:bg-green-700 text-white rounded flex
                                items-center gap-x-1 py-[2px] px-4" >
                    <Icon icon="fluent:add-12-filled" className="text-base" />
                    <span className='text-base'>Create</span>
                </NavLink>
            </div>
            {/* Content */}
            <div className="p-4 pb-14">
                <div className="card bg-white p-6">
                    {/* Title */}
                    <div className="flex px-2 py-4 gap-x-2 items-center divider-bottom">
                        <Icon icon="bi:stack" className={`text-2xl text-gold `} />
                        <span className='text-lg text-dark-green font-medium'>Manifest</span>
                    </div>
                    {/* Search */}
                    <SearchTable setData={setDataShow} dataBody={dataBody} customDisplay={displayData} />
                    {/* Table */}
                    <Table dataBody={dataShow} column={columnTable} id="oid" loading={loading}
                        handleClickField={handleOpenModalDetail} />
                </div>
            </div>
            <Modal isOpen={openModalDetail} setIsOpen={setOpenModalDetail} title="Manifest Detail" ></Modal>
        </>
    );
}

export default Manifest;