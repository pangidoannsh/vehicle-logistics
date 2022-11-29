import { Icon } from "@iconify/react";

const FormInput = (props) => {
    const { label, tagId, setValue, value, sizeLabel } = props

    const handleChange = e => {
        setValue(e.target.value)
    }
    return (
        <div className="flex flex-col gap-y-2 text-slate-700 relative">
            <label htmlFor={tagId} className={`${sizeLabel ? sizeLabel : 'text-sm'} `}>{label}</label>
            <input type="text" className={`text-sm py-2 px-4 border rounded duration-500 w-full outline-none focus:border-light-green
            focus:shadow-none `}
                id={tagId} onChange={handleChange} value={value} />
        </div>
    );
}

export default FormInput;
