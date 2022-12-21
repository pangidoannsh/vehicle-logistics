import React from 'react';

const displayList = [
    { field: "branch", title: "Branch" },
    { field: "ponumber", title: "PO Number" },
    { field: "customer", title: "Customers" },
    { field: "contractno", title: "Contract No" },
    { field: "contractname", title: "Contract Name" },
    { field: "contracttype", title: "Contract Type" },
    { field: "value", title: "Value" }
]
const ManifestDetail = () => {
    return (
        <>
            {/* <div className="grid grid-cols-7 gap-x-4">
                {displayList.map(detail => (
                    <div key={detail.field} className="flex flex-col items-center">
                        <div className="text-light-green px-2 pb-1 divider-bottom">{detail.title}</div>
                        <div className="text-slate-500">{detail.field}</div>
                    </div>
                ))}

            </div> */}
            <div className='grid grid-cols-12 px-2'>
                <div className="col-span-4 col-start-1">
                    <table className='w-full table-auto text-slate-700'>
                        <tbody>
                            {displayList.slice(0, 4).map(detail => (
                                <tr key={detail.field}>
                                    <td className='py-4'>{detail.title}</td>
                                    <td className='pr-2 py-4'>{detail.field}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="col-span-5 col-start-8 pt-4">
                    <table className='w-full table-auto text-slate-700'>
                        <tbody>
                            {displayList.slice(4, displayList.length).map(detail => (
                                <tr key={detail.field}>
                                    <td className='py-4'>{detail.title}</td>
                                    <td className='pr-2 py-4'>{detail.field}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default ManifestDetail;
