import { Icon } from '@iconify/react'
import React, { useContext, useEffect, useState } from 'react'
import Table from '../../../components/tables/Table'
import SearchTable from '../../../components/tables/SearchTable'
import Modal from '../../../components/Modal'
import { api } from '../../../config'
import MarketingCreate from './MarketingCreate'
import MarketingDetail from './MarketingDetail'
import Main from '../../../layouts/Main'
import Alert from '../../../components/Alert'
import { BranchContext } from '../../../Store'


const Marketing = () => {
    const [loading, setLoading] = useState(true);
    // dataBody merupakan data asli yang didapatkan dari consume API dan tidak diganggu gugat
    const [dataBody, setDataBody] = useState([]);
    // dataShow berfungsi sebagai data yang akan ditampilkan pada table, dapat berubah seperti untuk searcing dll
    const [dataShow, setDataShow] = useState([]);

    // untuk membuka dan menutup modal detail
    const [openModalDetail, setOpenModalDetail] = useState(false)
    // untuk membuka dan menutup modal detail
    const [openModalCreate, setOpenModalCreate] = useState(false)
    // untuk data yang akan ditampilkan Modal -> ModalContent
    const [dataModal, setDataModal] = useState({});
    // untuk menampung kondisi error network
    const [isErrorNetwork, setIsErrorNetwork] = useState(false);
    // untuk menampung kondisi berhasil create data
    const [isSuccessCreated, setIsSuccessCreated] = useState(false);

    // option branch untuk select pada create po customer
    const [optionsBranch, setOptionsBranch] = useContext(BranchContext);

    // data untuk table head
    const headTable = [
        "Branch", "PO Number", "Customers", "Contract No", "Contract Name", "Contract Type", "Value"
    ]

    // penentuan id dari data yang ada di table
    const data_id = 'po_number'

    // untuk handle Open dari Modal PO Customer Detail
    const handleOpenModalDetail = e => {
        // console.log(e.target.name);
        setDataModal(dataBody.filter(data => data.po_number === e.target.name).map(filter => filter)[0]);
        setOpenModalDetail(true)
    }
    const handleOpenModalCreate = e => {
        e.preventDefault()
        if (optionsBranch.length === 0) {
            api.get('/branch').then(res => {
                setOptionsBranch(res.data)
            }).catch(error => {
                if (error.code === "ERR_NETWORK") {
                    alert('Periksa jaringan anda dan Reload Browser')
                    return
                }
            })
        }
        setOpenModalCreate(true)
    }
    // use effect untuk consume API
    useEffect(() => {
        api.get('/pocustomer').then(res => {
            setDataBody(res.data.map(data => {
                const { branch, po_number, customer, contractno, contractname, contracttype, povalue } = data;
                return {
                    branch, po_number, customer, contractno, contractname, contracttype, povalue
                }
            }))
            setLoading(false)
        }).catch(error => {
            // console.log(error);
            if (error.code === "ERR_NETWORK") {
                setIsErrorNetwork(true)
            }
        })

    }, []);

    // pemberian isi dari data show
    useEffect(() => {
        setDataShow(dataBody)
    }, [dataBody])

    return (
        <Main>
            {/* After Header */}
            <div className="flex justify-end items-center px-4 py-3 divider-top bg-white">
                <button className={`bg-light-green hover:bg-green-700 text-white rounded flex
                                items-center gap-x-1 py-[2px] px-4 `} onClick={handleOpenModalCreate}>
                    <Icon icon="fluent:add-12-filled" className="text-base" />
                    <span className='text-base'>Create</span>
                </button>
            </div>

            {/* Content */}
            <div className="p-4">
                <div className="card bg-white p-6">
                    {/* Title */}
                    <div className="flex px-2 py-4 gap-x-2 items-center divider-bottom">
                        <Icon icon="fluent-mdl2:market" className={`text-2xl text-gold `} />
                        <span className='text-lg text-dark-green font-medium'>PO Customer</span>
                    </div>
                    {/* Search */}
                    <SearchTable setData={setDataShow} dataBody={dataBody} />
                    {/* Table */}
                    <Table dataBody={dataShow} dataHead={headTable} id={data_id}
                        loading={loading} handleClick={handleOpenModalDetail} actionInData={1}
                    />
                </div>
            </div>
            {/* Modal Detail */}
            <Modal isOpen={openModalDetail} setIsOpen={setOpenModalDetail}
                title={"PO Customer Detail"} iconTitle={"ooui:view-details-ltr"}
            >
                <MarketingDetail data={dataModal} />
            </Modal>
            {/* Modal Create */}
            <Modal isOpen={openModalCreate} setIsOpen={setOpenModalCreate} title={'New PO Customer'} size={700}>
                <MarketingCreate setIsOpen={setOpenModalCreate} setSuccessCreate={setIsSuccessCreated} options={{
                    Branch: {
                        optionsBranch, setOptionsBranch
                    }
                }} />
            </Modal>
            {/* Notifikasi Error Ketika Tidak Ada Jaringan */}
            <Alert isOpen={isErrorNetwork} setIsOpen={setIsErrorNetwork} codeAlert={0} title="Error Network">
                Please Check Your Connection and Reload the Browser!
            </Alert>
            {/* Notifikasi Ketika Berhasil Create Data */}
            <Alert isOpen={isSuccessCreated} setIsOpen={setIsSuccessCreated} codeAlert={1} title="Success">
                New Data Created
            </Alert>

        </Main>
    )
}

export default Marketing