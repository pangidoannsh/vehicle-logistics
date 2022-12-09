import React, { useEffect } from 'react';

const PaginationTable = ({ lengthData, limit, setLimit, page, setPage }) => {
    return (
        <div className='flex justify-between pt-6 text-sm'>
            <div className="text-slate-400">showing
                {lengthData > 0 ? ` 1 to ${limit < lengthData ? limit : lengthData} of ` : ''} {lengthData} data</div>
            <div className="flex gap-x-4">
                <div className="flex text-slate-500 items-center gap-x-2">
                    <label htmlFor="listpagination">Display</label>
                    <select className='border border-black/20 py-1 px-2 rounded-sm active:outline-none focus:outline-none'
                        onChange={e => setLimit(e.target.value)}>
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={30}>30</option>
                        <option value={lengthData}>All</option>
                    </select>
                </div>
                <div className="flex gap-x-1">
                    <button className='bg-dark-green text-sm py-1 px-2 rounded-sm text-white' disabled={page === 1}>Previous</button>
                    <div className='flex'>
                        {[...Array(Math.ceil(lengthData / limit))].map((num, index) => (
                            <button key={index} className={`${page === (index + 1) ? 'bg-dark-green text-white' : 'text-slate-400'} 
                            rounded-sm  text-center w-7 text-sm py-1`} onClick={() => setPage(index + 1)}>
                                {index + 1}
                            </button>
                        ))}
                    </div>
                    <button className='bg-dark-green text-sm py-1 px-2 rounded-sm text-white' onClick={() => setPage(page + 1)}>Next</button>
                </div>
            </div>
        </div>
    );
}

export default PaginationTable;
