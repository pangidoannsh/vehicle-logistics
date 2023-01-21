import { Icon } from '@iconify/react';
import React from 'react';

const ButtonCreate = ({ loading, onClick }) => {
    return (
        <button className={`bg-light-green hover:bg-green-700 text-white rounded flex
                                items-center gap-x-1 py-[2px] px-4 `} onClick={onClick}>
            {!loading ? <>
                <Icon icon="fluent:add-12-filled" className="text-base" />
                <span className='text-base'>Create</span>
            </> :
                <div className='px-4 py-1'><Icon icon="eos-icons:loading" /></div>
            }
        </button>
    );
}

export default ButtonCreate;
