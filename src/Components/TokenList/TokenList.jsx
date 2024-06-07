import React, { useState } from "react";
import { Input } from "antd";
import { CiSearch } from "react-icons/ci";
import SearchBarStyle from "../../Styles/SearchBarStyle";
import { tokenList } from "../../utils/contast/contast";
import {
  useSwitchNetwork,
  useWeb3ModalAccount,
} from "@web3modal/ethers5/react";
import { toast } from "react-toastify";

// const switchToChain = async (chainId) => {
//   console.log("chainid in switch", chainId);
//   try {
//     await window.ethereum.request({
//       method: "wallet_switchEthereumChain",
//       params: [{ chainId }],
//     });
//   } catch (error) {
//     console.error("Error switching chain:", error);
//   }
// };

function TokenList() {
  const switchNetwork = useSwitchNetwork();
  const { chainId, isConnected } = useWeb3ModalAccount();
  const [selectedToken, setSelectedToken] = useState(null);

  const handleTokenSelect = async (selected) => {
    if (!isConnected) {
      toast.error("Please connect your wallet first.");
      return;
    }

    if (selected.chainIdNum !== chainId) {
      try {
        const network = await switchNetwork.switchNetwork(selected.chainIdNum);
        setSelectedToken(selected);
        toast.success("Switch Chain Successfully");
      } catch (error) {
        console.error("Error switching network:", error);
        toast.error("Rejected Switching Chain Request");
      }
    }
  };

  return (
    <>
      <div className="mt-[2rem] bg-[#F6F6F6] lg:block hidden h-full w-full mb-10 border border-r-0 rounded-tl-lg rounded-bl-lg ">
        <div className="pt-[3rem]  px-[1.5rem] ">
          <div className="flex flex-col gap-[16px] ">
            <span className="font-metropolis font-semibold text-2xl leading-6">
              Choose from Tokens List
            </span>

            <p className="font-metropolis font-medium text-base leading-[21px]">
              Lorem ipsum dolor sit amet consectetur. Aenean bibendum interdum
              faucibus viverra pellentesque integer. sque.
            </p>

            <div className="">
              <Input
                size="large"
                placeholder="Search Token"
                prefix={<CiSearch size={25} />}
                style={{ borderRadius: "50px", height: "40px" }}
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-[1rem] mt-8">
            {tokenList.map((item, index) => (
              <div
                className={`w-[178px] flex items-center border hover:bg-[#0074B7] hover:text-white gap-2 h-[32px] pl-3 rounded-md cursor-pointer ${
                  item.chainIdNum === chainId ? "bg-[#0074B7] text-white" : ""
                }`}
                key={index}
                onClick={() => handleTokenSelect(item)}
              >
                <img src={item.icon} alt="" className="object-cover w-5 h-5 " />
                <span className="font-metropolis font-semibold text-base leading-[14.28px]">
                  {item.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <SearchBarStyle />
    </>
  );
}

export default TokenList;
