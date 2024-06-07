import React, { useState } from "react";
import { AiOutlineHome } from "react-icons/ai";
import { GoDatabase } from "react-icons/go";
import { VscTools } from "react-icons/vsc";
import Discord from "../../img/Discord.png";
import Xtwitter from "../../img/Xtwitter.png";
import Logo from "../../img/logo.png";
import { Button, Flex } from "antd";
import HamBurger from "./HamBurger/HamBurger";
import ConnectWalletButton from "../ConnectWalletButton/ConnectWalletButton";
import OodlesLogo from '../../img/OodlesLogo.png'
import TelegramLogo from '../../img/TelegramLogo.png'

function Header(props) {
  const [activeButton, setActiveButton] = useState("Tokens");

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };


  const handleOodlesLink = () => {
    window.open('https://blockchain.oodles.io/', '_blank');
  }
  
  const handleTelegramLink = () => {
    window.open('https://telegram.me/oodlesBlockchain', '_blank');
  }

  return (
    <>
      <nav className="h-[5rem] bg-white shadow-md flex items-center w-full justify-center">
        <div className="w-full flex items-center  max-w-[1440px] px-[4.6875rem] justify-between">
          <div className="flex gap-4 items-center">
            <img src={Logo} alt="" className="max-md:w-8" />
            {/* <span className="font-metropolis font-semibold leading-6 text-2xl sm:text-[15px] md:text-2xl md:leading-3 max-customLogo:hidden max-md:hidden">
              Token App Logo
            </span> */}
          </div>

          <div className="flex items-center justify-between gap-7 max-customLogo:hidden">
            <div
              className={` hidden hover:bg-[#378DBF] hover:bg-opacity-15 w-[105px] h-[35px] flex items-center gap-2 justify-center rounded-2xl cursor-pointer ${
                activeButton === "Home"
                  ? "bg-[#378DBF] bg-opacity-15 text-[#0074B7]"
                  : "text-[#696969]"
              }`}
              onClick={() => handleButtonClick("Home")}
            >
              <AiOutlineHome
                size={22}
                style={{
                  color: activeButton === "Home" ? "#0074B7" : "#696969",
                }}
              />
              <span className="font-metropolis font-medium text-base leading-5 ">
                Home
              </span>
            </div>

            <div
              className={`hover:bg-[#378DBF] hover:bg-opacity-15 w-[105px] h-[35px] flex items-center gap-2 justify-center rounded-2xl cursor-pointer ${
                activeButton === "Tokens"
                  ? "bg-[#378DBF] bg-opacity-15 text-[#0074B7]"
                  : "text-[#696969]"
              }`}
              onClick={() => handleButtonClick("Tokens")}
            >
              <GoDatabase
                size={22}
                style={{
                  color: activeButton === "Tokens" ? "#0074B7" : "#696969",
                }}
              />
              <span className="font-metropolis font-medium text-base leading-5 ">
                Tokens
              </span>
            </div>

            <div
              className={`hidden hover:bg-[#378DBF] hover:bg-opacity-15 w-[105px] h-[35px] flex items-center gap-2 justify-center rounded-2xl cursor-pointer ${
                activeButton === "Tools"
                  ? "bg-[#378DBF] bg-opacity-15 text-[#0074B7]"
                  : "text-[#696969]"
              }`}
              onClick={() => handleButtonClick("Tools")}
            >
              <VscTools
                size={22}
                style={{
                  color: activeButton === "Tools" ? "#0074B7" : "#696969",
                }}
              />
              <span className="font-metropolis font-medium text-base leading-5 ">
                Tools
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between gap-8 ">
            <button className="bg-[#EAEAEA] w-[2.5rem] h-[2.5rem] flex items-center gap-2 justify-center rounded-full max-customLogo:hidden"
            onClick={handleOodlesLink}
            >
              {" "}
              <img src={OodlesLogo} alt=""  />
            </button>

            <button className="bg-[#EAEAEA] w-[2.5rem] h-[2.5rem] flex items-center gap-2 justify-center rounded-full max-customLogo:hidden"
            onClick={handleTelegramLink}
            >
              {" "}
              <img src={TelegramLogo} alt="" />
            </button>

            {/* //*************** Connect Wallet************************* */}
            <ConnectWalletButton />
          </div>
        </div>

        <div className="sm:hidden flex justify-start items-center px-2 h-[40px] w-[60px] rounded-xl cursor-pointer gap-0.5 ">
          <HamBurger />
        </div>
      </nav>
    </>
  );
}

export default Header;


