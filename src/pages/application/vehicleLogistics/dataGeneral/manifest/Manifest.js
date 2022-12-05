import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import SearchTable from "../../../../../components/tables/SearchTable";
import Table from "../../../../../components/tables/Table";
import { api } from "../../../../../config";
import Main from "../../../../../layouts/Main";
import { NavLink } from "react-router-dom";
import { useMemo } from "react";

const Manifest = () => {
    const templateObject = data => {
        const { manifestno, manifestdate, origin, destination, moda, status } = data;
        return { manifestno, manifestdate, origin, destination, moda, status };
    }
    const [loading, setLoading] = useState(true);
    // dataBody meruoakan data asli yang didapatkan dari consume API dan tidak diganggu gugat
    const [dataBody, setDataBody] = useState([]);
    // dataShow berfungsi sebagai data yang akan ditampilkan pada table, dapat berubah seperti untuk searcing dll
    const [dataShow, setDataShow] = useState([]);
    // untuk data yang akan ditampilkan Modal -> ModalContent
    const [dataModal, setDataModal] = useState({});
    const [isErrorNetwork, setIsErrorNetwork] = useState(false);
    // untuk membuka dan menutup modal
    const [openModal, setOpenModal] = useState(false);
    // untuk membuka dan menutup modal detail
    const [openModalCreate, setOpenModalCreate] = useState(false);

    // data untuk table head
    const headTable = useMemo(() => [
        "Manifest Number", "Manifest Date", "Origin", "Destination", "Moda", "Status"
    ]);

    // use effect untuk consume API
    useEffect(() => {
        api.get('/manifest').then(res => {
            setDataBody(res.data)
            setLoading(false)
        }).catch(error => {
            // console.log(error);
            if (error.code === "ERR_NETWORK") {
                setIsErrorNetwork(true)
            }
        })
    }, []);

    // memberikan nilai ke datashow dari data bodi(api)
    useEffect(() => {
        setDataShow(dataBody.map(data => {
            return templateObject(data);
        }));
    }, [dataBody])

    return (
        <>
            {/* After Header */}
            <div className="flex justify-end items-center px-4 py-3 divider-top bg-white">
                <NavLink to={"/manifest/create"} className={`bg-light-green hover:bg-green-700 text-white rounded flex
                                items-center gap-x-1 py-[2px] px-4 `} >
                    <Icon icon="fluent:add-12-filled" className="text-base" />
                    <span className='text-base'>Create</span>
                </NavLink>
            </div>
            {/* Content */}
            <div className="p-4 pb-14">
                <div className="card bg-white p-6">
                    {/* Title */}
                    <div className="flex px-2 py-4 gap-x-2 items-center divider-bottom">
                        <Icon icon="eos-icons:init-container" className={`text-2xl text-gold `} />
                        <span className='text-lg text-dark-green font-medium'>Manifest</span>
                    </div>
                    {/* Search */}
                    <SearchTable setData={setDataShow} dataBody={dataBody} />
                    {/* Table */}
                    <Table dataBody={dataShow} dataHead={headTable} id="manifestid" loading={loading} />
                </div>
            </div>
        </>
    );
}

export default Manifest;