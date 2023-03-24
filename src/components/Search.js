import { Icon } from '@iconify/react';
import React from 'react';
import { api } from '../config';

const Search = ({ pathUrl, setDataBody, setLoading, refetch }) => {
    function handleSearch(e) {
        setLoading(true);
        const value = e.target.value;
        console.log(value);
        if (value === "") {
            refetch()
        } else {

            api.get(`${pathUrl}?s=${value}`).then(res => {
                setDataBody(res.data)
            }).catch(err => {
                console.log(err);
            }).finally(() => setLoading(false));
        }
    }
    return (
        <>
            {/* Filter */}
            <div className="flex pt-6 pb-4">
                <div className="relative w-[25vw]">
                    <input id="search-input" type="text" className={`text-base py-2 pr-4 pl-8 text-slate-600 focus:outline-none 
                    border w-full border-slate-500 focus:border-light-green rounded peer`}
                        placeholder='entry a search...' onChange={handleSearch} />
                    <label htmlFor="search-input" className="absolute top-[10px] left-2 text-slate-400 peer-focus:text-light-green">
                        <Icon icon="ic:round-search" className="text-2xl" />
                    </label>
                </div>
            </div>
        </>
    )
}

export default Search;
{/* <Icon icon="ic:round-search" className="text-2xl" /> */ }
