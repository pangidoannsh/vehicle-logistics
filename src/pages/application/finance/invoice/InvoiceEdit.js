import { Icon } from '@iconify/react';
import { useState } from 'react';
import { useRef } from 'react'
import FormInput from '../../../../components/inputs/FormInput';
import { api } from '../../../../config';

export default function InvoiceEdit({ dataCurent, setIsOpen, setAlert, setDataInvoice }) {
    const [loadingSubmit, setloadingSubmit] = useState(false);
    const { invoicedate, shipmentdate, duedate, shipping, financialchanges, credits, payments, top, description, invoicenumber } = dataCurent;
    const invoiceDateRef = useRef(null)
    const shippedDateRef = useRef(null)
    const dueDateRef = useRef(null)
    const shippingRef = useRef(null)
    const financeRef = useRef(null)
    const creditsRef = useRef(null)
    const paymentsRef = useRef(null)
    const topRef = useRef(null)
    const descRef = useRef(null)

    function handleUpdate(e) {
        e.preventDefault();
        setloadingSubmit(true);
        setAlert(prev => ({ ...prev, isActived: false }));
        const dataUpdate = {
            invoicedate: invoiceDateRef.current.value,
            shipmentdate: shippedDateRef.current.value,
            duedate: dueDateRef.current.value,
            duedate: dueDateRef.current.value,
            shipping: shippingRef.current.value,
            financial_changes: financeRef.current.value,
            credits: creditsRef.current.value,
            payments: paymentsRef.current.value,
            top: topRef.current.value,
            description: descRef.current.value,
        }
        // console.log(dataUpdate);
        api.put(`invoice/${invoicenumber}`, dataUpdate).then(res => {
            console.log(res.data);
            setAlert({
                isActived: true,
                code: 1,
                title: "Updated",
                message: "Update Data Invoice Success"
            })
            setTimeout(() => {
                setAlert(prev => ({ ...prev, isActived: false }));
            }, 3000);
            setDataInvoice(prev => prev.map(data => data.invoicenumber === invoicenumber ? res.data : data));
            setIsOpen(false);
        }).catch(err => {
            console.log(err.respnose);
            setAlert({
                isActived: true,
                code: 0,
                title: "Error " + err.response.status,
                message: "Update Data Invoice Failed"
            })
        }).finally(() => setloadingSubmit(false))
    }
    return (
        <>
            <div className="grid grid-cols-3 gap-6 pb-2">
                <FormInput label="Invoice Date" tagId="invoicedate" type="date"
                    refrence={invoiceDateRef} defaultValue={invoicedate ? invoicedate.split(" ")[0] : ''} />
                <FormInput label="Shipped Date" tagId="shippeddate" type="date"
                    refrence={shippedDateRef} defaultValue={shipmentdate ? shipmentdate.split(" ")[0] : ''} />
                <FormInput label="Due Date" tagId="duedate" type="date"
                    refrence={dueDateRef} defaultValue={duedate ? duedate.split(" ")[0] : ''} />
                <FormInput label="Shipping" tagId="shipping" type="number"
                    refrence={shippingRef} defaultValue={shipping} />
                <FormInput label="Financial Changes" tagId="finance" type="number"
                    refrence={financeRef} defaultValue={financialchanges} />
                <FormInput label="Credits" tagId="credits" type="number"
                    refrence={creditsRef} defaultValue={credits} />
                <FormInput label="Payments" tagId="payments" type="number"
                    refrence={paymentsRef} defaultValue={payments} />
                <FormInput label="TOP" tagId="top" type="number"
                    refrence={topRef} defaultValue={top} />
                <div className="flex flex-col gap-1 col-span-3">
                    <label htmlFor="desc" className='text-sm text-slate-600'>
                        Description
                        <span className='text-xs'>(optional)</span>
                    </label>
                    <textarea id="desc" className='border rounded focus:outline-none p-2' rows="2" ref={descRef}
                        defaultValue={description}></textarea>
                </div>

            </div>
            <div className="flex justify-end gap-4 px-4 pt-6">
                <button className="text-gold py-2 px-4" onClick={() => setIsOpen(false)}>Close</button>
                <button type="Submit" onClick={handleUpdate}
                    className={`bg-gold hover:bg-yellow-600 text-white rounded flex items-center gap-x-1 py-2 px-4 
                focus:ring focus:ring-yellow-200 active:ring active:ring-yellow-200`}>
                    {
                        !loadingSubmit ? 'Update' :
                            <div className='px-3'><Icon icon="eos-icons:loading" className='text-2xl' /></div>
                    }
                </button>
            </div>
        </>
    )
}
