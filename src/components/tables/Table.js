import { Icon } from '@iconify/react';
import React, { useState } from 'react';
import Action from './Action';
import LoadingTable from './LoadingTable';
import PaginationTable from './PaginationTable';

const Table = ({ dataBody, column, handleActionEdit, handleActionDelete, handleClickField, id, clickField, loading, pagination }) => {
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    if (pagination) {
        return (
            <>
                <table className='table-auto w-full'>
                    <thead>
                        <tr>
                            {(handleActionDelete || handleActionEdit) ? <th className={`p-4 bg-dark-green text-white font-semibold 
                            text-sm text-center border border-l-[1px] border-white w-16`}>#</th> : ''
                            }
                            <th className={`p-4 bg-dark-green text-white font-semibold 
                            text-sm text-center border border-l-[1px] border-white w-14`}>No</th>
                            {column.map(col => (
                                <th key={col.field} className={`p-4 bg-dark-green text-white font-semibold text-sm text-center
                                border border-l-[1px] border-white`}>
                                    {col.header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {!loading ?
                            dataBody.length !== 0 ?
                                // slice(0,)
                                dataBody.slice(page === 1 ? 0 : limit, limit * page).map((dataRow, index) => (
                                    <tr key={index} className=" even:bg-dark-green even:bg-opacity-10">
                                        {(handleActionDelete || handleActionEdit) ?
                                            <td>
                                                <Action>
                                                    {handleActionEdit ? (
                                                        <button className={`text-yellow-500 hover:text-yellow-400`}
                                                            onClick={() => handleActionEdit(dataRow[id])}>
                                                            <div className='flex gap-x-3 items-center' >
                                                                <Icon icon={`clarity:note-edit-solid`} className='text-xl' />
                                                                <span className='text-base'>Edit</span>
                                                            </div>
                                                        </button>
                                                    ) : ''}
                                                    {handleActionDelete ? (
                                                        <button className={`text-[#AF183C] hover:text-red-600`}
                                                            onClick={() => handleActionDelete(dataRow[id])}>
                                                            <div className='flex gap-x-3 items-center'>
                                                                <Icon icon={`bxs:trash-alt`} className='text-xl' />
                                                                <span className='text-base'>Delete</span>
                                                            </div>
                                                        </button>
                                                    ) : ''}
                                                </Action>
                                            </td> : ''
                                        }
                                        <td className="p-4 text-sm text-slate-700 text-center w-14  selection:bg-light-green selection:text-white">
                                            {index + 1}
                                        </td>
                                        {column.map(col => (
                                            <td key={col.field} className="p-4 text-sm text-slate-600
                                            selection:bg-light-green selection:text-white">
                                                {handleClickField && (col.field === clickField || col.field === id) ? (
                                                    <button onClick={() => { handleClickField(dataRow[id]) }}
                                                        className="text-gold hover:underline">
                                                        {dataRow[col.field]}
                                                    </button>
                                                ) : dataRow[col.field]}
                                            </td>
                                        ))}
                                    </tr>
                                )) :
                                <tr>
                                    <td colSpan={`100%`} className='text-center text-sm p-4 bg-slate-100 text-slate-500'>
                                        No Data Matches
                                    </td>
                                </tr>
                            : <LoadingTable />}
                    </tbody>
                </table>
                <PaginationTable lengthData={dataBody.length} limit={limit} setLimit={setLimit} page={page} setPage={setPage} />
            </>
        )
    }
    return (
        <table className='table-auto w-full'>
            <thead>
                <tr>
                    {(handleActionDelete || handleActionEdit) ? <th className={`p-4 bg-dark-green text-white font-semibold 
                            text-sm text-center border border-l-[1px] border-white w-16`}>#</th> : ''
                    }
                    <th className={`p-4 bg-dark-green text-white font-semibold 
                    text-sm text-center border border-l-[1px] border-white w-14`}>No</th>
                    {column.map(col => (
                        <th key={col.field} className={`p-4 bg-dark-green text-white font-semibold text-sm text-center
                                border border-l-[1px] border-white`}>
                            {col.header}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {!loading ?
                    dataBody.length !== 0 ?
                        dataBody.map((dataRow, index) => (
                            <tr key={index} className=" even:bg-dark-green even:bg-opacity-10">
                                {(handleActionDelete || handleActionEdit) ?
                                    <td>
                                        <Action>
                                            {handleActionEdit ? (
                                                <button className={`text-yellow-500 hover:text-yellow-400`}
                                                    onClick={() => handleActionEdit(dataRow[id])}>
                                                    <div className='flex gap-x-3 items-center' >
                                                        <Icon icon={`clarity:note-edit-solid`} className='text-xl' />
                                                        <span className='text-base'>Edit</span>
                                                    </div>
                                                </button>
                                            ) : ''}
                                            {handleActionDelete ? (
                                                <button className={`text-[#AF183C] hover:text-red-600`}
                                                    onClick={() => handleActionDelete(dataRow[id])}>
                                                    <div className='flex gap-x-3 items-center'>
                                                        <Icon icon={`bxs:trash-alt`} className='text-xl' />
                                                        <span className='text-base'>Delete</span>
                                                    </div>
                                                </button>
                                            ) : ''}
                                        </Action>
                                    </td> : ''
                                }
                                <td className="p-4 text-sm text-slate-700 text-center w-14  selection:bg-light-green selection:text-white">
                                    {index + 1}
                                </td>
                                {column.map(col => (
                                    <td key={col.field} className="p-4 text-sm text-slate-600
                            selection:bg-light-green selection:text-white">
                                        {handleClickField && (col.field === clickField || col.field === id) ? (
                                            <button onClick={() => { handleClickField(dataRow[id]) }}
                                                className="text-gold hover:underline">
                                                {dataRow[col.field]}
                                            </button>
                                        ) : dataRow[col.field]}
                                    </td>
                                ))}
                            </tr>
                        )) :
                        <tr>
                            <td colSpan={`100%`} className='text-center text-sm p-4 bg-slate-100 text-slate-500'>
                                No Data Matches
                            </td>
                        </tr>
                    : <LoadingTable />}
            </tbody>
        </table>
    );
}

export default React.memo(Table);
