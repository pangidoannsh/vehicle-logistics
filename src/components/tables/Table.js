import { Icon } from '@iconify/react';
import React, { useState } from 'react';
import Action from './Action';
import LoadingTable from './LoadingTable';
import PaginationTable from './PaginationTable';

const Table = ({ dataBody, column, handleActionEdit, handleActionDelete, handleClickField, id,
    clickField, loading, pagination, children, center = [] }) => {
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    if (pagination) {
        return (
            <>
                <div className={`flex items-center ${children ? 'justify-between' : 'justify-end'}`}>
                    {children}
                    <PaginationTable lengthData={dataBody.length} limit={limit} setLimit={setLimit} page={page} setPage={setPage} />
                </div>
                {/* <PaginationTable lengthData={dataBody.length} limit={limit} setLimit={setLimit} page={page} setPage={setPage} noShowing /> */}
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
                                dataBody.slice((limit * (page - 1)), limit * page).map((dataRow, index) => (
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
                                        <td className="p-4 text-sm text-slate-700 text-center w-14">
                                            {index + 1 + (limit * (page - 1))}
                                        </td>
                                        {column.map(col => (
                                            <td key={col.field} className={`p-4 text-sm text-slate-600
                                            ${center.findIndex(data => data === col.field) !== -1 ? 'text-center' : ''}`}>
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
                <div className="flex justify-end text-slate-400 mt-6">showing
                    {dataBody.length > 0 ? ` 1 to ${limit < dataBody.length ? limit : dataBody.length} of ` : ''} {dataBody.length} data
                </div>
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
                                <td className="p-4 text-sm text-slate-700 text-center w-14">
                                    {index + 1}
                                </td>
                                {column.map(col => (
                                    <td key={col.field} className={`p-4 text-sm text-slate-600
                                            ${center.findIndex(data => data === col.field) !== -1 ? 'text-center' : ''}`}>
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
