import React from "react";
import Header from "../components/header/Header";
import GoodDayCB from "../components/ChatBot/GoodDayCB";
import Footer from "../components/footer/Footer";
import Product from "../components/Product";

const ShopPage = () =>{
    return(
        <div className='flex flex-col min-h-screen'>
            <Header/>
            <div className='flex-1 overflow-auto mb-10'>
            
            <Product/>
            <GoodDayCB/>
            </div>
            <Footer/>
        </div>
    )
}

export default ShopPage;