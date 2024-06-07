import React from "react";
import Header from "../Components/Header/Header";
import SliderImg from "../Components/SliderImg/SliderImg";
import TokenList from "../Components/TokenList/TokenList";
import Footer from "../Components/Footer/Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Binance from "../Components/Tokens/BinanceToken/Binance";

function RoutesPage(props) {
  return (
    <>
      <div className="flex items-center flex-col justify-center w-full ">
        <Header />
        <SliderImg />

        <div className="flex px-5 md:px-[4.6875rem] w-full md:w-[80%]">
          <TokenList />
          <Binance />
        </div>
        
        <Footer />

        <ToastContainer position="top-left" />
      </div>
    </>
  );
}

export default RoutesPage;
