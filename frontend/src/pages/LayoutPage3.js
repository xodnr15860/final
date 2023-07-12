import React from 'react';
import AdminSidebar from '../components/sidebar/AdminSidebar';
import { Outlet } from 'react-router';

const LayoutPage3 = () => {
    return (
        <>
            {/* <div> */}
            <div className='flex'>
                <AdminSidebar />
                <div className='flex-1 flex items-center justify-items-start'>
                    {/* <div> */}
                    <Outlet />
                </div>
            </div>    
        </>
    );
};

export default LayoutPage3;