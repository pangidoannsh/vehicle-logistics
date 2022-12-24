import React from 'react';
import { moneyFormat, unformat } from '../../utils';

const Input = ({ label, tagId, setValue, value }) => {
    const handleChange = e => {
        e.preventDefault();
        setValue(unformat(e.target.value))
        console.log(unformat(e.target.value));
    }
    return (
        <div className="flex flex-col gap-y-2 text-slate-700 relative">
            <label htmlFor={tagId} className="text-sm">{label}</label>
            <div className="relative">
                <input type="text" className={`text-sm py-2 px-4 border rounded duration-500 w-full outline-none
                focus:border-light-green focus:shadow-none uppercase peer`} id={tagId} value={moneyFormat(value)}
                    onChange={handleChange} />
                <div className="absolute bg-white -top-1 -left-1 text-sm opacity-0 peer-focus:opacity-100
                 peer-focus:text-light-green ">Rp</div>
            </div>
        </div>
    );
}
const MoneyInput = React.memo(Input);
export default MoneyInput;
