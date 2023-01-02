import React from 'react';
import { moneyFormat } from '../../../../../utils';
import UnitManifest from './UnitManifest';

const headerDisplay = [
    { field: "ponumber", header: "PO Number" },
    { field: "customer", header: "Customer" },
    { field: "totalamount", header: "Total Amount" }
]
const amountDisplay = data => {
    return `Rp ${moneyFormat(data)}`;
}
const ManifestDetail = ({ dataDetail, dataUnitManifest, setDataUnitManifest, setAlert }) => {
    return (
        <>
            {headerDisplay.map(data => (
                <div className='grid grid-cols-8 px-2 py-4 gap-x-2' key={data.field}>
                    <div className="col-span-1">{data.header}</div>
                    <div className="col-span-7">
                        {data.field === "totalamount" ? amountDisplay(dataDetail[data.field]) : dataDetail[data.field]}
                    </div>
                </div>
            ))}
            <UnitManifest data={dataUnitManifest} setData={setDataUnitManifest} setAlert={setAlert} />
        </>
    );
}

export default ManifestDetail;
