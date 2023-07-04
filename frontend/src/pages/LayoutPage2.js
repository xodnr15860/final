import React from 'react';
import Sidebar from '../components/sidebar/Sidebar';
import { Outlet } from 'react-router';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';

const LayoutPage2 = () => {
    return (
        <>
            <Header />
            <div className='flex'>
                <Sidebar />
                <div className='flex-1 flex items-center justify-items-start'>
                    <Outlet />
                </div>
            </div>    
            <Footer />
        </>
    );
};

export default LayoutPage2;