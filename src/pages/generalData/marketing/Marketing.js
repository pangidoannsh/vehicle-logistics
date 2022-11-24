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
import { CreateDataContext, fetchOption } from '../../../Store'


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
    // untuk menampung kondisi gagal create data
    const [isFailCreated, setIsFailCreated] = useState(false);

    // option branch untuk select pada create po customer
    const [optionsBranch, setOptionsBranch] = useContext(CreateDataContext).branch;
    const [optionsContract, setOptionsContract] = useContext(CreateDataContext).contract;

    // data untuk table head
    const headTable = [
        "Branch", "PO Number", "Customer", "Contract No", "Contract Name", "Value"
    ]

    // penentuan id dari data yang ada di table
    const data_id = 'ponumber'

    // untuk handle Open dari Modal PO Customer Detail
    const handleOpenModalDetail = id => {
        setDataModal(dataBody.filter(data => data.ponumber === id).map(filter => filter)[0]);
        setOpenModalDetail(true)
    }
    const handleOpenModalCreate = e => {
        e.preventDefault()
        if (optionsBranch.length === 0) {
            fetchOption("/branch", setOptionsBranch);
        }
        if (optionsContract.length === 0) {
            fetchOption("/contract", setOptionsContract);
        }
        setOpenModalCreate(true)
    }
    const fetchPoCustomer = () => {
        api.get('/pocustomer').then(res => {
            setDataBody(res.data.map(data => {
                const { branch, ponumber, customer, contractno, contractname, contracttype, value } = data;
                return {
                    branch, ponumber, customer, contractno, contractname, contracttype, value
                }
            }))
            setLoading(false)
        }).catch(error => {
            console.log(error);
            if (error.code === "ERR_NETWORK") {
                setIsErrorNetwork(true)
            }
        })
    }

    let onceEffect = false
    // use effect untuk consume API
    useEffect(() => {
        if (!onceEffect) {
            fetchPoCustomer()
        }
        return () => {
            onceEffect = true
        }
    }, []);

    // pemberian isi dari data show
    useEffect(() => {
        setDataShow(dataBody.map(data => {
            const { branch, ponumber, customer, contractno, contractname, value } = data;
            return {
                branch, ponumber, customer, contractno, contractname, value
            }
        }))
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
                    <SearchTable setData={setDataShow} dataBody={dataBody.map(data => {
                        const { branch, ponumber, customer, contractno, contractname, value } = data;
                        return { branch, ponumber, customer, contractno, contractname, value };
                    })} />
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
                <MarketingCreate setIsOpen={setOpenModalCreate} setSuccessCreate={setIsSuccessCreated} setFailCreate={setIsFailCreated}
                    fetchPoCustomer={fetchPoCustomer} options={{
                        branch: { optionsBranch, setOptionsBranch },
                        contract: { optionsContract, setOptionsContract }
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
            {/* Notifikasi Ketika Gagal Create Data */}
            <Alert isOpen={isFailCreated} setIsOpen={setIsFailCreated} codeAlert={0} title="Failed">
                New Data is Failed to Create
            </Alert>

        </Main>
    )
}

export default Marketing