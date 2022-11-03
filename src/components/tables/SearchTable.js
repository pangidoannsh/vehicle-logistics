import React from 'react'
/*
    SearchTable berguna untuk mencari data table dengan cara memfilter isi dari 1 row table, contohnya seperti
    mencari nama dari salah satu data pada kolom table

    cara penggunaannya:
    SearchTable memiliki parameter berupa props yang harus diisi 
    - setData (useState set dari data yg akan dicari, pada kasus table ini seperti datashow) 
    - dataBody (merupakan sumber data asli yang berasal dari consume API)
*/
export default function SearchTable(props) {
    const { setData, dataBody } = props
    const handleSearch = e => {
        setData(
            dataBody.filter(dataRow => {
                return Object.values(dataRow).findIndex(dataCell => {
                    return dataCell.toLowerCase().includes(e.target.value.toLowerCase())
                }) !== -1
            }
            ).map(filter => { return filter })
        )
    }
    return (
        <>
            {/* Filter */}
            <div className="flex pt-6 pb-4">
                <input type="text" className={`text-base py-2 px-4 border-template text-slate-600`}
                    placeholder='entry a search...' onChange={handleSearch} />
            </div>
        </>
    )
}
