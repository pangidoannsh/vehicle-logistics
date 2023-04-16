import { Icon } from '@iconify/react';
import { useState, useEffect } from 'react'
import useFetch from '../../../hooks/useFetch';
import Search from '../../../components/Search';
import SearchTable from '../../../components/tables/SearchTable';
import Loading from '../../../components/Loading';
import Table from '../../../components/tables/Table';

const columnTable = [
    { field: "drivername", header: "Driver Name" },
    { field: "simtype", header: "SIM Type" },
    { field: "status", header: "Status" },
]
const displayData = data => {
    const { status } = data;
    return {
        ...data,
        status: status.toLowerCase() === "ready" ? (
            <div className='flex justify-center'>
                <div className="flex w-max gap-x-1 py-1 px-2 items-center bg-light-green rounded-sm text-white justify-center">
                    <Icon icon="akar-icons:check" className="text-base" />
                    <span className="text-sm capitalize">{data.status}</span>
                </div>
            </div>
        ) : status.toLowerCase() === "repair" ? (
            <div className="flex justify-center">
                <div className="flex w-max gap-x-1 py-1 px-2 items-center bg-[#A90101] rounded-sm text-white justify-center">
                    <Icon icon="fa6-solid:gears" className="text-base" />
                    <span className="text-sm capitalize">{data.status}</span>
                </div>
            </div>
        ) : status.toLowerCase() === "used" ? (
            <div className="flex justify-center">
                <div className="flex w-max gap-x-1 py-1 px-2 items-center bg-yellow-500 rounded-sm text-white justify-center">
                    <Icon icon="game-icons:steering-wheel" className="text-base" />
                    <span className="text-sm capitalize">{data.status}</span>
                </div>
            </div>
        ) : status
    }
}
export default function Driver() {
    const [loading, setLoading] = useState(true);
    const [dataBody, setDataBody, fetchDataBody] = useFetch({ url: "/driver", setLoading })
    const [dataShow, setDataShow] = useState([]);

    useEffect(() => {
        setDataShow(dataBody.map(data => displayData(data)));
    }, [dataBody]);
    return (
        <>
            {/* Content */}
            <div className="p-4">
                <div className="card p-6">
                    {/* Title */}
                    <div className="flex justify-between divider-bottom">
                        <div className="flex px-2 py-4 gap-x-2 items-center">
                            <Icon icon="mingcute:steering-wheel-fill" className={`text-xl text-gold `} />
                            <span className="text-lg text-dark-green font-medium">Driver</span>
                        </div>
                        <div className="flex items-center">
                            {/* <button className={`bg-light-green hover:bg-green-700 text-white rounded flex
                                items-center gap-x-1 py-1 px-4 `}
                                onClick={handleOpenModalCreate}>
                                <Icon icon="fluent:add-12-filled" className="text-base" />
                                <span className="text-base">Create</span>
                            </button> */}
                        </div>
                    </div>
                    {/* Table */}
                    <Table dataBody={dataShow} column={columnTable} id="hullnumber" loading={loading} pagination >
                        {/* Search */}
                        {/* <SearchTable setData={setDataShow} dataBody={dataBody} customDisplay={displayData} /> */}
                        <SearchTable dataBody={dataBody} setData={setDataBody} />
                    </Table>
                </div>
            </div>
            <Loading isLoading={loading} />
        </>
    );
}
