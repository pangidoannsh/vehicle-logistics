import React, { useRef, useState } from 'react';
import FormInput from '../../../../components/inputs/FormInput';
import Select from '../../../../components/inputs/Select';

const InvoiceCreate = ({ optionsPO }) => {
    const [valuePO, setvaluePO] = useState({ oid: null, ponumber: "nothing selected" });
    const invoiceDateRef = useRef(null);
    const shippedDateRef = useRef(null);
    const dueDateRef = useRef(null);
    const topRef = useRef(null);
    const totalQtyRef = useRef(null);
    const lineTotalRef = useRef(null);
    const salesTaxRef = useRef(null);
    const shippingRef = useRef(null);
    const totalRef = useRef(null);
    const financeChargeRef = useRef(null);
    const creditsRef = useRef(null);
    const paymentsRef = useRef(null);
    const descRef = useRef(null);

    const handleSelectPo = pocustomer => {
        console.log(pocustomer);
    }
    return (
        <div className='flex flex-col gap-6'>
            <div className="grid grid-cols-8 gap-6">
                <div className="col-span-2">
                    <FormInput type="date" label="shipped Date" refrence={invoiceDateRef} tagId="invoicedate" />
                </div>
                <div className="col-span-2">
                    <Select catchSelect={handleSelectPo} useSelect={[valuePO, setvaluePO]} options={optionsPO}
                        keyId="oid" keyName="ponumber" label="PO Number" />
                </div>
                <div className="col-span-1">
                    <FormInput type="text" label="Sales Tax" refrence={salesTaxRef} tagId="salestax" />
                </div>
                <div className="col-span-1">
                    <FormInput type="text" label="Shipping" refrence={shippingRef} tagId="shipping" />
                </div>
                <div className="col-span-2">
                    <FormInput type="text" label="Total" refrence={totalRef} tagId="total" />
                </div>
                <div className="col-span-2">
                    <FormInput type="date" label="Shipped Date" refrence={shippedDateRef} tagId="shippeddate" />
                </div>
                <div className="col-span-2">
                    <FormInput type="date" label="Due Date" refrence={dueDateRef} tagId="duedate" />
                </div>
                <div className="col-span-1">
                    <FormInput type="text" label="Financial Charger" refrence={financeChargeRef} tagId="finance_charge" />
                </div>
                <div className="col-span-1">
                    <FormInput type="text" label="Credits" refrence={creditsRef} tagId="credits" />
                </div>
                <div className="col-span-2">
                    <FormInput type="text" label="Payments" refrence={paymentsRef} tagId="payments" />
                </div>
                <div className="col-span-1">
                    <FormInput type="text" label="TOP" refrence={topRef} tagId="top" />
                </div>
                <div className="col-span-1">
                    <FormInput type="text" label="Total QTY" refrence={totalQtyRef} tagId="totalqty" />
                </div>
                <div className="col-span-2">
                    <FormInput type="text" label="Line Total" refrence={lineTotalRef} tagId="linetotal" />
                </div>
                <div className="flex flex-col gap-1 col-span-4">
                    <label htmlFor="desc">Description</label>
                    <textarea id="desc" className='border rounded focus:outline-none p-2' rows="2"></textarea>
                </div>
            </div>
        </div>
    );
}

export default InvoiceCreate;
