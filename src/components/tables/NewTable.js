import React from 'react';

const NewTable = ({ dataBody, column }) => {
    console.log(column);
    return (
        <table className='table-auto w-full'>
            <thead>
                <tr className="sticky top-0">
                    {column.map(col => (
                        <th key={col.field} className={`p-4 bg-dark-green text-white font-semibold text-sm text-center
                                border border-l-[1px] border-white`}>
                            {col.header}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {dataBody.map((data, index) => (
                    <tr key={`data-${index}`} className=" even:bg-dark-green even:bg-opacity-10">
                        {column.map(col => (
                            <td key={col.field} className="p-4 text-sm text-slate-700
                                             selection:bg-light-green selection:text-white">
                                {data[col.field]}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default React.memo(NewTable);
