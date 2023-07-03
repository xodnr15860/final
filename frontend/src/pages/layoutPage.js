import React from 'react';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import {Outlet} from 'react-router';

const LayoutPage = () => {
    // const test = () => {
    //     window.sessionStorage.setItem('nickname', '12345');
    //     window.sessionStorage.setItem('admin', 'N')
    // }

    // const remove = () =>{
    //     window.sessionStorage.removeItem('nickname');
    //     window.sessionStorage.removeItem('admin');
    // }
    
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            {/* <button type = {"button"} onClick={test}>
                test
            </button>
            <button type = {"button"} onClick={remove}>
                remove
            </button> */}
            <div className="flex-1 overflow-auto m-auto w-full">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default LayoutPage;