import { Icon } from '@iconify/react';
import React from 'react';
import Header from '../../../../components/Header';
import Navbar from '../../../../components/Navbar';

const Manifest = () => {
    return (
        <div id='container'>
            <Navbar />
            <div className="flex-1">
                <Header />
                <div className="content">
                    {/* After Header */}
                    <div className="flex justify-end items-center px-4 py-3 divider-top bg-white">
                        <button className={`bg-light-green hover:bg-green-700 text-white rounded flex
                                items-center gap-x-1 py-[2px] px-4 `} >
                            <Icon icon="fluent:add-12-filled" className="text-base" />
                            <span className='text-base'>Create</span>
                        </button>
                    </div>
                    {/* Content */}
                    <div className="p-4 pb-14">
                        <div className="card bg-white p-6">
                            {/* Title */}
                            <div className="flex px-2 py-4 gap-x-2 items-center divider-bottom">
                                <Icon icon="eos-icons:init-container" className={`text-2xl text-gold `} />
                                <span className='text-lg text-dark-green font-medium'>Manifest</span>
                            </div>
                            {/* Search */}
                            {/* <SearchTable setData={setDataShow} dataBody={dataBody} /> */}
                            {/* Table */}
                            {/* <Table dataBody={dataShow} dataHead={headTable} id={data_id}
                                loading={loading} handleClick={handleOpenModalDetail} actionInData={1}
                            /> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Manifest;
