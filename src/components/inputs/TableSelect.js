import { Icon } from '@iconify/react';
import React from 'react';

const TableSelect = (props) => {
    const { dataBody, column, handleAdd, handleDelete } = props
    return (
        <table className="table-auto w-full">
            <thead>
                <tr>
                    <th className={`p-4 bg-dark-green text-white font-semibold 
                                    text-sm text-center border border-l-[1px] border-white w-14`}>No</th>
                    {column.map(data => (
                        <th key={data.field} className="p-2 bg-dark-green text-white font-semibold 
                                        text-sm text-center border border-l-[1px] border-white">{data.header}</th>
                    ))}
                    {handleDelete ? (
                        <th className={`p-4 bg-dark-green text-white font-semibold 
                            text-sm text-center border border-l-[1px] border-white`}>#</th>
                    ) : ''}
                </tr>
            </thead>
            <tbody>
                {dataBody.map((dataSelect, index) => (
                    <tr key={`row ${index}`}>
                        <td className="text-center text-slate-600">{index + 1}</td>
                        {column.map(col => (
                            <td key={col.field} className="p-4 text-sm text-slate-700">{dataSelect[col.field]}</td>
                        ))}
                        {handleDelete ? (
                            <td className='px-4 py-2 text-center'>
                                <button className='rounded border border-[#AF183C] p-1' onClick={() => handleDelete(dataSelect.oid)}>
                                    <Icon icon="bxs:trash-alt" className=' text-[#AF183C]' />
                                </button>
                            </td>
                        ) : ''}
                    </tr>
                ))}
                <tr className=" bg-dark-green/10 w-full">
                    <td className="text-center text-slate-600">{dataBody.length + 1}</td>
                    <td className="text-end py-2 px-4">
                        <button className="p-1 rounded border border-light-green"
                            onClick={handleAdd}>
                            <Icon icon="akar-icons:more-horizontal" className=" text-light-green" />
                        </button>
                    </td>
                    <td colSpan={'100%'}></td>
                </tr>
            </tbody>
        </table>
    );
}

export default React.memo(TableSelect);
