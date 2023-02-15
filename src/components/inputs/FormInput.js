import React from 'react';
const FormInput = ({ label, tagId, refrence, type, setValue, defaultValue }) => {
    if (setValue) {
        return (
            <div className="flex flex-col gap-y-2 text-slate-700">
                <label htmlFor={tagId} className="text-sm">{label}</label>
                <input ref={refrence} type={type ? type : 'text'} className={`text-sm py-2 px-4 border rounded duration-500 w-full outline-none
             focus:border-light-green focus:shadow-none uppercase`} id={tagId} defaultValue={defaultValue}
                    onChange={e => { setValue(e.target.value.toUpperCase()) }} />
            </div>
        );
    }
    return (
        <div className="flex flex-col gap-y-2 text-slate-700">
            <label htmlFor={tagId} className="text-sm">{label}</label>
            <input ref={refrence} type={type ? type : 'text'} className={`text-sm py-2 px-4 border rounded duration-500 w-full outline-none
             focus:border-light-green focus:shadow-none uppercase`} id={tagId} defaultValue={defaultValue} />
        </div>
    );
}

export default React.memo(FormInput);
