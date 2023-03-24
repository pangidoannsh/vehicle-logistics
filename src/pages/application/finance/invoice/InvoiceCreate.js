import { Icon } from '@iconify/react';
import React, { useContext, useRef, useState } from 'react';
import FormInput from '../../../../components/inputs/FormInput';
import MultiSelect from '../../../../components/inputs/MultiSelect';
import Select from '../../../../components/inputs/Select';
import Table from '../../../../components/tables/Table';
import { api } from '../../../../config';
import { UserContext } from '../../../../config/User';
import { useFetch } from '../../../../hooks';
import { AlertContext } from '../../../../layouts/Main';
import { moneyFormat } from '../../../../utils';

const columnTable = [
    { field: 'enginenumber', header: 'Engine Number' },
    { field: 'framenumber', header: 'Frame Number' },
    { field: 'unitbrand', header: 'Brand' },
    { field: 'type', header: 'Type' },
    { field: 'color', header: 'Color' },
    { field: 'year', header: 'Year' },
    { field: 'amount', header: 'Amount (Rp)' }
];
const displayBank = data => {
    return {
        oid: data.oid, bank: <>
            <div className="flex gap-6">
                <span>{data.bankcode}</span>
                <span>{data.bankname}</span>
            </div>
        </>
    }
}
const InvoiceCreate = ({ optionsPO, setIsOpen, reFetch }) => {
    const [alert, setAlert] = useContext(AlertContext);
    const [user] = useContext(UserContext);
    const [valuePO, setvaluePO] = useState({ oid: null, pocustomer: "nothing selected" });
    const [loadingTable, setloadingTable] = useState(false);
    const [loadingCreate, setloadingCreate] = useState(false);
    const [selectedUnit, setSelectedUnit] = useState([]);

    const [salesTax, setsalesTax] = useState(0);
    const [isSalesTax, setisSalesTax] = useState(false);

    const invoiceDateRef = useRef(null);
    const shippedDateRef = useRef(null);
    const dueDateRef = useRef(null);
    const topRef = useRef(null);
    const shippingRef = useRef(null);
    const financialChangesRef = useRef(null);
    const creditsRef = useRef(null);
    const paymentsRef = useRef(null);
    const descRef = useRef(null);

    const [optionsBank, setoptionsBank] = useFetch({ url: "/bank", howDataGet: displayBank })
    const [multiSelectBank, setMulitSelectBank] = useState([{ oid: null, bank: "nothing selected" }]);

    const handleSelectPo = oid => {

        setloadingTable(true)
        api.get(`/vehiclepo/${oid}?filter=unloading`).then(res => {
            setSelectedUnit(res.data);
            setsalesTax(res.data.reduce((n, { amount }) => n + amount, 0) * 11 / 100);
        }).catch(err => {
            console.log(err.response);
        }).finally(() => setloadingTable(false))
    }
    const handleCheckSalesTax = e => {
        setisSalesTax(e.target.checked);
    }
    const handleCreate = e => {
        if (financialChangesRef.current.value === "") {
            setAlert({
                isActived: true,
                code: 0,
                title: `Error`,
                message: "Please fill finance changes with number"
            })
        }
        const dataPost = {
            oidpocustomer: valuePO.oid,
            invoicedate: invoiceDateRef.current?.value,
            shippeddate: shippedDateRef.current?.value,
            duedate: dueDateRef.current?.value,
            shipping: shippingRef.current?.value,
            financial_changes: financialChangesRef.current?.value,
            credits: creditsRef.current?.value,
            payments: paymentsRef.current?.value,
            top: topRef.current?.value,
            description: descRef.current?.value,
            dataunit: selectedUnit.map(unit => unit.oid),
            bank: multiSelectBank.map(bank => bank.oid),
            salestax: isSalesTax
        }
        // console.log(dataPost);
        setloadingCreate(true);
        setAlert(prev => ({ ...prev, isActived: false }));

        api.post("/invoice", dataPost).then(res => {
            setAlert({
                isActived: true,
                code: 1,
                title: "Success",
                message: "Success Create Data Invoice"
            })
            reFetch();
            setIsOpen(false);
            setTimeout(() => setAlert(prev => ({ ...prev, isActived: false })), 3000);
        }).catch(err => {
            console.log(err.response);
            const statusCode = err.response.status;
            if (statusCode < 500) {
                setAlert({
                    isActived: true,
                    code: 0,
                    title: `Error ${statusCode}`,
                    message: "Please fill in all required inputs"
                })
            }
            else {
                setAlert({
                    isActived: true,
                    code: 0,
                    title: `Error ${statusCode}`,
                    message: "Server Error, please contact IT operator"
                })
            }
            setTimeout(() => setAlert(prev => ({ ...prev, isActived: false })), 2000);
        }).finally(() => setloadingCreate(false));
    }

    return (
        <div className='flex flex-col gap-6'>
            {/* Form */}
            <div className="grid grid-cols-4 gap-x-6 gap-y-3">
                <div className="col-span-2">
                    <Select label="Branch" useSelect={[{ oid: user.branch, branchname: user.branchname }]}
                        keyId="oid" keyName="branchname" disabled />
                </div>
                <div className="col-span-2">
                    <Select catchSelect={handleSelectPo} useSelect={[valuePO, setvaluePO]} options={optionsPO}
                        keyId="oid" keyName="pocustomer" label="PO Number" />
                </div>
                <FormInput type="date" label="Invoice Date" refrence={invoiceDateRef} tagId="invoicedate" />
                <FormInput type="date" label="Shipped Date" refrence={shippedDateRef} tagId="shippeddate" />
                <FormInput type="date" label="Due Date" refrence={dueDateRef} tagId="duedate" />
                <FormInput type="text" label="Shipping" refrence={shippingRef} tagId="shipping" defaultValue={0} />
                <FormInput type="number" label="Financial Changes" refrence={financialChangesRef} tagId="finance_changes" defaultValue={0} />
                <FormInput type="text" label="Credits" refrence={creditsRef} tagId="credits" defaultValue={0} />
                <FormInput type="text" label="Payments" refrence={paymentsRef} tagId="payments" defaultValue={0} />
                <FormInput type="text" label="TOP" refrence={topRef} tagId="top" defaultValue={0} />
                <div className="flex flex-col gap-1 col-span-4">
                    <label htmlFor="desc" className='text-sm text-slate-600'>
                        Description
                        <span className='text-xs'>(optional)</span>
                    </label>
                    <textarea id="desc" className='border rounded focus:outline-none p-2' rows="2" ref={descRef}></textarea>
                </div>
            </div>
            {/* Table Data Unit */}
            <div className="flex flex-col gap-3">
                <div className="flex justify-between px-2 py-4 items-center divider-bottom">
                    <div className="flex gap-x-2 items-center">
                        <Icon icon="fa6-solid:car-side" className={`text-2xl text-gold `} />
                        <span className='text-lg text-dark-green font-medium'>Data Unit</span>
                    </div>
                </div>
                <Table dataBody={selectedUnit.map(data => ({ ...data, amount: moneyFormat(data.amount) }))} column={columnTable} loading={loadingTable} />
            </div>
            {/* Total */}
            {selectedUnit.length !== 0 ? <>
                <div className="grid grid-cols-2 gap-6">
                    {/* Select Bank */}
                    <div>
                        <MultiSelect multiSelect={multiSelectBank} setMultiSelect={setMulitSelectBank}
                            options={optionsBank} keyId="oid" keyName="bank" label="Bank" />
                    </div>
                    <div className="flex flex-col gap-4">
                        <div className='flex items-center gap-2'>
                            <input type="checkbox" id='sales_tax' onChange={handleCheckSalesTax}
                                className="accent-light-green w-5 h-5 focus:ring focus:ring-green-200 cursor-pointer" />
                            <label htmlFor="sales_tax" className='cursor-pointer text-slate-600'>Sales Tax (11%)</label>
                        </div>
                        {/* Detail */}
                        <div className="flex flex-col gap-2 text-sm text-slate-700">
                            <div className='divider-bottom pb-2'>
                                <div className="flex justify-between">
                                    <span>Line Total</span>
                                    <span>Rp {moneyFormat(selectedUnit.reduce((n, { amount }) => n + amount, 0))}</span>
                                </div>
                                {isSalesTax ? <div className="flex justify-between">
                                    <span>Sales Tax Total(11%)</span>
                                    <span>Rp {moneyFormat(salesTax)}</span>
                                </div> : ''}
                            </div>
                        </div>
                        <div className="flex justify-between font-medium text-dark-green">
                            <span>Total Invoice</span>
                            <span>Rp {moneyFormat(
                                selectedUnit.reduce((n, { amount }) => n + amount, 0) + (isSalesTax ? salesTax : 0)
                            )}</span>
                        </div>
                        <div className="flex justify-between font-medium text-dark-green">
                            <span>Total Quantity</span>
                            <span>{selectedUnit.length}</span>
                        </div>
                        <div className="flex justify-end py-6">
                            <button className={`bg-light-green hover:bg-green-700 text-white rounded 
                                flex active:ring active:ring-green-200 focus:ring focus:ring-green-200 items-center 
                                gap-x-1 py-1 px-4 mt-6`} onClick={handleCreate} disabled={loadingCreate}>
                                {!loadingCreate ? <>
                                    <span className='text-base'>Save</span>
                                </> :
                                    <div className='px-4'><Icon icon="eos-icons:loading" className='text-2xl' /></div>
                                }
                            </button>
                        </div>
                    </div>
                </div>
            </> : ''}
        </div>
    );
}

export default InvoiceCreate;
