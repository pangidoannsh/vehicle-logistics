import { Icon } from "@iconify/react";
import Action from "./Action";
import Skeleton from "./Skeleton";

/* TableMasterData dibuat untuk memmenuhi kebutuhan dari Halaman/Menu MasterData yang dimana pada halaman Master Data
membutuhkan bentuk Table yang berbeda dari biasanya yakni memiliki kolom status jadi perlu dibuatkan 1 komponen table khusus untuk
penyelesaiinya */

function TableMasterData(props) {
    const { dataBody, dataHead, id, loading } = props
    /* 
        - dataBody => data yang akan ditampilkan pada table body <tbody>
        - dataHead => data yang akan menjadi header dari table <thead>
        - id => merupakan unique key dari data yang ada pada table
        - loading => penanda bahwa prorgam sudah selesai consume API
        
    */
    return (
        <>
            {!loading ?
                <>
                    {/* Table */}
                    <table className="table-auto w-full">
                        <thead>
                            <tr className="sticky top-0">
                                <th className={`p-4 bg-dark-green text-white font-semibold 
                            text-sm text-center border border-l-[1px] border-white w-[78px]`}>#</th>
                                <th className={`p-4 bg-dark-green text-white font-semibold 
                            text-sm text-center border border-l-[1px] border-white w-14`}>No</th>
                                {dataHead.map((item, index) => (
                                    <th key={index} className={`p-4 bg-dark-green text-white font-semibold text-sm text-center
                                border border-l-[1px] border-white`}>
                                        {item}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {dataBody.length !== 0 ?
                                dataBody.map((dataRow, index) => (
                                    <tr key={index} className=" even:bg-dark-green even:bg-opacity-10 selection:bg-light-green selection:text-white">
                                        <td>
                                            <Action id={dataRow[id]} />
                                        </td>
                                        <td className="p-4 text-sm text-slate-700 text-center w-14">{index + 1}</td>
                                        {Object.values(dataRow).map((dataCell, indexData) => (
                                            <td key={indexData} className="p-4 text-sm ">
                                                <TableCell data={dataCell} indexData={indexData} />
                                            </td>
                                        ))}
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan={`100%`} className='text-center text-sm p-4 bg-slate-100 text-slate-500'>
                                            No Data Matches
                                        </td>
                                    </tr>
                                )}
                        </tbody>
                    </table>
                </> : <Skeleton />
            }

        </>

    )

}

const TableCell = ({ data, indexData }) => {
    if (indexData < 6) {
        return data
    } else if (indexData === 6 && data === 'asset') {
        return <span className="text-light-green capitalize">{data}</span>
    } else if (indexData === 6 && data === 'vendor') {
        return <span className="text-[#015796] capitalize">{data}</span>
    } else {
        if (data === 'ready') {
            return (
                <div className='flex gap-x-1 py-1 px-2 items-center bg-light-green rounded-sm text-white justify-center'>
                    <Icon icon="akar-icons:check" className='text-base' />
                    <span className='text-sm capitalize'>{data}</span>
                </div>
            )
        } else if (data === 'repair') {
            return (
                <div className='flex gap-x-1 py-1 px-2 items-center bg-[#A90101] rounded-sm text-white justify-center'>
                    <Icon icon="fa6-solid:gears" className='text-base' />
                    <span className='text-sm capitalize'>{data}</span>
                </div>
            )
        }
    }
}
export default TableMasterData