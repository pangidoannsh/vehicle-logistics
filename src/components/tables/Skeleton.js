const Skeleton = () => {
    return (
        <>
            {/* Title */}
            <div className="flex px-2 py-4 gap-x-2 items-center divider-bottom">
                <div className={`w-6 h-6 rounded bg-slate-400 `} />
                <div className='flex font-medium'>
                    <div className='h-4 w-40 rounded bg-slate-400'></div>
                </div>
            </div>
            {/* Filter */}
            <div className="flex pt-6 pb-4">
                <div className='flex py-2 px-4 border-template '>
                    <div className='h-5'></div>
                </div>
            </div>
            {/* Table */}
            <table className='table-auto w-[100%]'>
                <thead>
                    <tr >
                        <th className='h-[53px] bg-slate-400'></th>
                        <th className='h-[53px] bg-slate-400'></th>
                        <th className='h-[53px] bg-slate-400'></th>
                        <th className='h-[53px] bg-slate-400'></th>
                        <th className='h-[53px] bg-slate-400'></th>
                        <th className='h-[53px] bg-slate-400'></th>
                    </tr>
                </thead>
                <tbody>
                    {[{}, {}, {}, {}, {}, {}, {}, {}, {}, {}].map((x, index) => (
                        <tr key={index}>
                            <td className='p-4 divider-bottom'>
                                <div className='bg-slate-400 rounded h-3 w-32'></div>
                            </td>
                            <td className='p-4 divider-bottom'>
                                <div className='bg-slate-400 rounded h-3 w-32'></div>
                            </td>
                            <td className='p-4 divider-bottom'>
                                <div className='bg-slate-400 rounded h-3 w-32'></div>
                            </td>
                            <td className='p-4 divider-bottom'>
                                <div className='bg-slate-400 rounded h-3 w-32'></div>
                            </td>
                            <td className='p-4 divider-bottom'>
                                <div className='bg-slate-400 rounded h-3 w-32'></div>
                            </td>
                            <td className='p-4 divider-bottom'>
                                <div className='bg-slate-400 rounded h-3 w-32'></div>
                            </td>
                        </tr>
                    ))}

                </tbody>
            </table>
        </>
    )
}

export default Skeleton;