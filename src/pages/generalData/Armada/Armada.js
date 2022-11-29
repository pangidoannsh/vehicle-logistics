import { Icon } from '@iconify/react'
import { useEffect, useState } from 'react'
import ErrorNetwork from '../../../components/ErrorNetwork';
import Select from '../../../components/Select';
import Header from '../../../components/Header'
import Modal from '../../../components/Modal';
import Navbar from '../../../components/Navbar'
import SearchTable from '../../../components/tables/SearchTable';
import Table from '../../../components/tables/Table';
import { api } from '../../../config';
import ArmadaCreate from './ArmadaCreate';
import { useContext } from 'react';
import { CreateDataContext, fetchOption } from '../../../Store';
import Main from '../../../layouts/Main';

export default function Armada() {
    const [loading, setLoading] = useState(true);
    const [mainData, setMainData] = useState([]);
    const [dataBody, setDataBody] = useState([]);
    const [dataShow, setDataShow] = useState([]);
    const [openModalCreate, setOpenModalCreate] = useState(false);
    const [isErrorNetwork, setIsErrorNetwork] = useState(false);

    const [optionsBranch, setOptionsBranch] = useContext(CreateDataContext).branch;
    const [optionsType, setOptionsType] = useState([]);
    const [optionsBrand, setOptionsBrand] = useState([]);
    const [optionsModel, setOptionsModel] = useState([]);

    const headTable = [
        "Branch", "Model Name", "Unit Type", "HUll Number", "Frame Number", "Police Number", "Type", "Status"
    ]

    const data_id = "policenumber";

    const customSearch = (e) => {
        setDataShow(
            dataBody
                .filter((dataRow) => {
                    return (
                        Object.values(dataRow).findIndex((dataCell, index) => {
                            if (index < 7) return dataCell.toLowerCase().includes(e.target.value.toLowerCase());
                            else if (index === 7) return dataCell.props.children[1].props.children.toLowerCase().includes(e.target.value.toLowerCase());
                        }) !== -1
                    );
                })
                .map((filter) => {
                    return filter;
                })
        );
    };

    const handleOpenModalCreate = e => {
        e.preventDefault();
        if (optionsBranch.length === 0) {
            fetchOption("/branch", setOptionsBranch)
        }
        if (optionsType.length === 0) {
            fetchOption("/vehicletype", setOptionsType);
            fetchOption("/vehiclemodel", setOptionsModel);
            fetchOption("/vehiclebrand", setOptionsBrand);
        }
        setOpenModalCreate(true)
    }

    // use effect untuk consume API
    useEffect(() => {
        api.get('/vehiclearmada').then(res => {
            setMainData(res.data)
            setLoading(false)
        })
            .catch(error => {
                if (error.code === "ERR_NETWORK") {
                    setIsErrorNetwork(true)
                }
            })
    }, []);

    useEffect(() => {
        setDataBody(mainData.map(data => {
            const { branch, modelname, unittype, hullnumber, framenumber, policenumber, type, status } = data;
            return { branch, modelname, unittype, hullnumber, framenumber, policenumber, type, status };
        }))
    }, [mainData]);
    // pemberian isi dari data show
    useEffect(() => {
        // Perubahan isi dari Type dan Status karena Type dan Status memiliki Style nya sendiri
        dataBody.forEach((data) => {
            if (data.status === "ready") {
                data.status = (
                    <div className="flex gap-x-1 py-1 px-2 items-center bg-light-green rounded-sm text-white justify-center">
                        <Icon icon="akar-icons:check" className="text-base" />
                        <span className="text-sm capitalize">{data.status}</span>
                    </div>
                );
            } else if (data.status === "repair") {
                data.status = (
                    <div className="flex gap-x-1 py-1 px-2 items-center bg-[#A90101] rounded-sm text-white justify-center">
                        <Icon icon="fa6-solid:gears" className="text-base" />
                        <span className="text-sm capitalize">{data.status}</span>
                    </div>
                );
            }
            else if (data.status === "used") {
                data.status = (
                    <div className="flex gap-x-1 py-1 px-2 items-center bg-yellow-500 rounded-sm text-white justify-center">
                        <Icon icon="game-icons:steering-wheel" className="text-base" />
                        <span className="text-sm capitalize">{data.status}</span>
                    </div>
                );
            }
        });
        // End Function

        setDataShow(dataBody);
    }, [dataBody]);

    return (
        <Main>
            {/* After Header */}
            <div className="flex justify-end items-center px-4 py-3 divider-top bg-white">
                <button
                    className={`bg-light-green hover:bg-green-700 text-white rounded flex
                                items-center gap-x-1 py-[2px] px-4 `}
                    onClick={handleOpenModalCreate}
                >
                    <Icon icon="fluent:add-12-filled" className="text-base" />
                    <span className="text-base">Create</span>
                </button>
            </div>

            {/* Content */}
            <div className="p-4">
                <div className="card drop-shadow-lg bg-white px-4 pb-4 pt-2">
                    {/* Title */}
                    <div className="flex px-2 py-4 gap-x-2 items-center divider-bottom">
                        <Icon icon="fa-solid:truck" className={`text-xl text-gold `} />
                        <span className="text-lg text-dark-green font-medium">Armada</span>
                    </div>
                    {/* Search searchFunct={customSearch} */}
                    <SearchTable setData={setDataShow} dataBody={dataBody} customSearchFunction={customSearch} />
                    {/* Table */}
                    <Table dataBody={dataShow} dataHead={headTable} id={data_id} loading={loading} />
                </div>
            </div>
            <Modal isOpen={openModalCreate} setIsOpen={setOpenModalCreate} title={"New Vehicle Unit"} size={1000}>
                <ArmadaCreate setIsOpen={setOpenModalCreate} options={{
                    optionsBranch, optionsType, optionsModel, optionsBrand
                }} />
            </Modal>
            <ErrorNetwork isOpen={isErrorNetwork} setIsOpen={setIsErrorNetwork}
                title="Network Error!" message="Please check your network and Reload your browser" />
        </Main>
    );
}

