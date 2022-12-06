import { Icon } from '@iconify/react'
import React, { useRef, useState } from 'react'
import SearchTable from '../../../components/tables/SearchTable';
import Table from '../../../components/tables/Table';

const Branch = () => {
    const [dataShow, setDataShow] = useState([]);
    const [dataBody, setDataBody] = useState([]);


    const headTable = useRef([
        "Branch Id", "Branch Name", "Address", "Phone Number", "Email"
    ]);
    

  return (
    <>
    {/* Content */}
    <div className="p-4">
        <div className="card drop-shadow-lg bg-white px-4 pb-4 pt-2">
        {/* Title */}
            <div className="flex px-2 py-4 gap-x-2 items-center divider-bottom">
            <Icon icon="fa-solid:truck" className={`text-xl text-gold `} />
            <span className="text-lg text-dark-green font-medium">Branch</span>
            </div>

            {/* Search searchFunct={customSearch} */}
            <SearchTable setData={setDataShow} dataBody={dataBody} />
            {/* Table */}
            <Table dataBody={dataShow} dataHead={headTable.current} id="branchid" />
        </div>
    </div>


     </>
  )
}

export default Branch