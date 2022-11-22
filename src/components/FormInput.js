import { useState } from 'react';

const FormInput = (props) => {
    const { label, tagId, setValue, value } = props
    // const [isValue, setIsValue] = useState(false);
    const handleChange = e => {
        setValue(e.target.value)
        // if (e.target.value !== '') {
        //     setIsValue(true)
        // } else {
        //     setIsValue(false)
        // }
    }
    return (
        <div className='flex flex-col gap-y-2 text-slate-700'>
            <label htmlFor={tagId} className={`text-sm `}>{label}</label>
            <input type="text" className={`text-sm py-2 px-4 border-template-input `}
                id={tagId} onChange={handleChange} value={value} />
        </div>
    );
}

export default FormInput;
