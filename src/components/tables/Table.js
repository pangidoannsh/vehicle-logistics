import Action from "./Action";
import Skeleton from "./Skeleton";

function Table(props) {
    const { dataBody, dataHead, id, loading, handleClick, actionInData } = props
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
                                    <tr key={index} className=" even:bg-dark-green even:bg-opacity-10">
                                        <td>
                                            <Action id={dataRow[id]} />
                                        </td>
                                        <td className="p-4 text-sm text-slate-700 text-center w-14  selection:bg-light-green selection:text-white">{index + 1}</td>
                                        {Object.values(dataRow).map((dataCell, indexData) => (
                                            <td key={indexData} className="p-4 text-sm text-slate-700
                                             selection:bg-light-green selection:text-white">
                                                {actionInData ? indexData != actionInData ? dataCell : (
                                                    <button onClick={handleClick} name={dataRow[id]} className={`text-gold`}>
                                                        {dataCell}
                                                    </button>
                                                ) : dataCell}

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

export default Table