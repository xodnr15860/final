import React from 'react';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import {Outlet} from 'react-router';

const LayoutPage = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <div className="flex-1 overflow-auto mb-10">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default LayoutPage;