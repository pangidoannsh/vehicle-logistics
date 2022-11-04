const Skeleton = () => {
    return (
        <>
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