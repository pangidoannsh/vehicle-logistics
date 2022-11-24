import Action from "./Action";
import LoadingTable from "./LoadingTable";

function Table(props) {
    const { dataBody, dataHead, id, loading, handleClick, actionInData, noAction } = props
    /* 
        - dataBody => data yang akan ditampilkan pada table body <tbody>
        - dataHead => data yang akan menjadi header dari table <thead>
        - id => merupakan unique key dari data yang ada pada table
        - loading => penanda bahwa prorgam sudah selesai consume API
        - actionInData => ini optional, bisa ada bisa tidak, fungsinya untuk memberikan action seperti show detail yang dapat
            diberikan pada salah satu kolom data  
    */
    return (
        <>
            {/* Table */}
            <table className="table-auto w-full">
                <thead>
                    <tr className="sticky top-0">
                        {!noAction && <th className={`p-4 bg-dark-green text-white font-semibold 
                            text-sm text-center border border-l-[1px] border-white w-16`}>#</th>
                        }
                        <th className={`p-4 bg-dark-green text-white font-semibold 
                            text-sm text-center border border-l-[1px] border-white w-14`}>No</th>
                        {dataHead.map((item, index) => (
                            <th key={index} className={`p-2 bg-dark-green text-white font-semibold text-sm text-center
                                border border-l-[1px] border-white`}>
                                {item}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {!loading ?
                        dataBody.length !== 0 ?
                            dataBody.map((dataRow, index) =>
                            (
                                <tr key={index} className=" even:bg-dark-green even:bg-opacity-10">
                                    {!noAction &&
                                        <td>
                                            <Action id={dataRow[id]} />
                                        </td>
                                    }
                                    <td className="p-4 text-sm text-slate-700 text-center w-14  selection:bg-light-green selection:text-white">{index + 1}</td>
                                    {Object.values(dataRow).map((dataCell, indexData) => (
                                        <td key={indexData} className="p-4 text-sm text-slate-700
                                             selection:bg-light-green selection:text-white">
                                            {actionInData ? indexData != actionInData ? dataCell : (
                                                <button onClick={() => { handleClick(dataRow[id]) }}
                                                    className="text-gold hover:underline">
                                                    {dataCell}
                                                </button>
                                            ) : dataCell}

                                        </td>
                                    ))}
                                </tr>
                            )) :
                            // if data.length == 0
                            (
                                <tr>
                                    <td colSpan={`100%`} className='text-center text-sm p-4 bg-slate-100 text-slate-500'>
                                        No Data Matches
                                    </td>
                                </tr>
                            ) :
                        // if loading
                        <LoadingTable />}
                </tbody>
            </table>
        </>

    )

}

export default Table