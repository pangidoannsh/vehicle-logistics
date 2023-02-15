import React, { useCallback } from 'react';

const PaginationTable = ({ lengthData, limit, setLimit, page, setPage }) => {
    const handleLimit = useCallback(e => {
        setLimit(e.target.value)
        if (Math.ceil(lengthData / e.target.value) < page) {
            setPage(Math.ceil(lengthData / e.target.value));
        }
    }, [lengthData, limit, page],)

    return (
        <>
            <div className="flex gap-x-4">
                <div className="flex text-slate-500 items-center gap-x-2">
                    <label htmlFor="listpagination">Display</label>
                    <select className='border border-black/20 py-1 px-2 rounded-sm active:outline-none focus:outline-none'
                        onChange={handleLimit}>
                        <option className='ring ring-green-500' value={10}>10</option>
                        <option className='ring ring-green-500' value={20}>20</option>
                        <option className='ring ring-green-500' value={30}>30</option>
                    </select>
                </div>
                <div className="flex gap-x-2">
                    <button className={`bg-dark-green ${page === 1 ? 'bg-opacity-60' : ''} 
                    text-sm py-1 px-2 rounded-sm text-white`} disabled={page === 1}
                        onClick={() => setPage(page - 1)}>Previous</button>
                    <div className='flex'>
                        {[...Array(Math.ceil(lengthData / limit))].slice(0, 10).map((num, index) => (
                            <button key={index} className={`${page === (index + 1) ? 'bg-dark-green text-white' : 'text-slate-400'} 
                            rounded-sm  text-center w-7 text-sm py-1`} onClick={() => setPage(index + 1)}>
                                {index + 1}
                            </button>
                        ))}
                    </div>
                    <button className={`bg-dark-green text-sm py-1 px-2 rounded-sm text-white 
                    ${page === Math.ceil(lengthData / limit) ? ' bg-opacity-60' : ''}`}
                        onClick={() => setPage(page + 1)} disabled={page === Math.ceil(lengthData / limit)}>Next</button>
                </div>
            </div>
        </>
    );
}

export default PaginationTable;
