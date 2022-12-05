import { Icon } from "@iconify/react"
import React from "react";

/*
    SearchTable berguna untuk mencari data table dengan cara memfilter isi dari 1 row table, contohnya seperti
    mencari nama dari salah satu data pada kolom table

    cara penggunaannya:
    SearchTable memiliki parameter berupa props yang harus diisi 
    - setData (useState set dari data yg akan dicari, pada kasus table ini seperti datashow) 
    - dataBody (merupakan sumber data asli yang berasal dari consume API)
*/
const SearchTable = props => {
    const { setData, dataBody, customSearchFunction, dataSkipSearch } = props
    /* dataSkipSearch dapat diisi atau tidak, jika diisi maka ketika melakukan searching, data yng index nya sama dengan
        dataSkipSearch, tidak akan menjadi patokan pencarian data
    */

    const handleSearch = e => {
        if (customSearchFunction) {
            customSearchFunction(e)
        } else {
            setData(
                dataBody.filter(dataRow => {
                    return Object.values(dataRow).findIndex((dataCell, index) => {
                        if (index !== dataSkipSearch) {
                            return dataCell.toString().toLowerCase().includes(e.target.value.toLowerCase())
                        }
                    }) !== -1
                }
                ).map(filter => { return filter })
            )
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

export default React.memo(SearchTable);
