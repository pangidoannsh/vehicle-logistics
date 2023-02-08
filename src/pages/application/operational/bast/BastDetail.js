import React from 'react';
import { moneyFormat } from '../../../../utils';
import UnitBast from './UnitBast';
const headerDisplay = [
    { field: "ponumber", header: "PO Number" },
    { field: "customer", header: "Customer" },
    // { field: "totalamount", header: "Total Amount" },
    { field: "receivername", header: "Receiver Name" },
    { field: "loadinglocation", header: "Loading Location" },
]
const amountDisplay = data => {
    return `Rp ${moneyFormat(data)}`;
}
const BastDetail = ({ dataDetail, dataUnitBast = [] }) => {
    return (
        <>
            {headerDisplay.map(data => (
                <div className='grid grid-cols-8 px-2 py-4 gap-x-2' key={data.field}>
                    <div className="col-span-1">{data.header}</div>
                    <div className="col-span-7 uppercase">
                        {data.field === "totalamount" ? amountDisplay(dataDetail[data.field]) : dataDetail[data.field]}
                    </div>
                </div>
            ))}
            <UnitBast data={dataUnitBast} />
        </>
    );
}

export default BastDetail;
