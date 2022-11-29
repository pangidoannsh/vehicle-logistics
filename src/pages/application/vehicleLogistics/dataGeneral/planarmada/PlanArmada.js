import React, { useContext, useEffect, useState } from 'react'
import Modal from '../../../../../components/Modal';
import SearchTable from '../../../../../components/tables/SearchTable';
import Table from '../../../../../components/tables/Table';
import { api } from '../../../../../config';
import Main from '../../../../../layouts/Main';
import PlanArmadaCreate from './PlanArmadaCreate';
import Alert from '../../../../../components/Alert';
import { CreateDataContext, fetchOption } from '../../../../../Store';
import { Icon } from '@iconify/react';


const PlanArmada = () => {
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
    // untuk menampung kondisi berhasil create data
    const [isSuccessCreated, setIsSuccessCreated] = useState(false);

    // option branch untuk select pada create po customer
    const [optionsBranch, setOptionsBranch] = useContext(CreateDataContext).branch;




    // data untuk table head
    const headTable = [
        "Branch", "Type", "Destination", "Plan Date", "Payload Composition", "Police Number", "Status"
    ]

    // penentuan id dari data yang ada di table
    const data_id = 'branch'
    const handleClick = e => {
        setDataModal(dataBody.filter(data => data.branch === e.target.name).map(filter => filter)[0]);
        setOpenModal(true)
    }

    const handleOpenModalCreate = e => {
        e.preventDefault()
        if (optionsBranch.length === 0) {
            fetchOption('/branch', setOptionsBranch);
        }
        setOpenModalCreate(true)
    }

    // use effect untuk consume API
    useEffect(() => {
        api.get('/planarmada').then(res => {
            setDataBody(res.data.map(data => {
                const { branch, type, destination, plandate, payloadcomposition, policenumber, status } = data;
                return {
                    branch, type, destination, plandate, payloadcomposition, policenumber, status
                }
            }))
            setLoading(false)
        }).catch(error => {
            if (error.code === "ERR_NETWORK") {
                setIsErrorNetwork(true)
            }
        })

    }, []);

    // memberikan nilai ke datashow dari data bodi(api)
    useEffect(() => {
        setDataShow(dataBody);
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
            <div className="p-4 pb-14">
                <div className="card bg-white p-6">
                    {/* Title */}
                    <div className="flex px-2 py-4 gap-x-2 items-center divider-bottom">
                        <span className='text-lg text-dark-green font-medium'>Plan Armada</span>
                    </div>
                    {/* Search */}
                    <SearchTable setData={setDataShow} dataBody={dataBody} />
                    {/* Table */}
                    <Table dataBody={dataShow} dataHead={headTable} id={data_id}
                        loading={loading}
                    />
                </div>
            </div>
            {/* Modal Create */}
            <Modal isOpen={openModalCreate} setIsOpen={setOpenModalCreate} title={'New Plan Armada'} size={700}>
                <PlanArmadaCreate setIsOpen={setOpenModalCreate} />
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
    );
}

export default PlanArmada