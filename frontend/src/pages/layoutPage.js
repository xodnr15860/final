import React from "react";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import { Outlet } from "react-router";
import GoodDayCB from "../components/ChatBot/GoodDayCB";

const LayoutPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-1 overflow-auto">
        <Outlet />
        <GoodDayCB />
      </div>
      <Footer />
    </div>
  );
};

export default LayoutPage;
