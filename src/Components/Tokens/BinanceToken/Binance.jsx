import React, { useEffect , useState } from "react";
import BinanceForm from "./BinanceForm";
import SelectorTokenForm from "../../SelectorTokenForm/SelectorTokenForm";
import { useWeb3ModalAccount } from "@web3modal/ethers5/react";
import { tokenList } from "../../../utils/contast/contast";

function Binance(props) {

  const {chainId} = useWeb3ModalAccount()
  const [chainName, setChainName] = useState(null);
  useEffect(() => {
    const selectChain = tokenList.find(token => token.chainIdNum === chainId);
    if (selectChain) {
      setChainName(selectChain.name);
    }
  }, [chainId]);

  return (
    <>
      <div className="mt-[2rem]  bg-[#FFFFFF] h-[1143px] w-full mb-10  border  border-l-0 rounded-tr-lg rounded-br-lg px-5">
        <div className="pt-[3rem]  pl-[24px]  mr-20">
          <div className="flex flex-col gap-[16px] ">
            <span className="font-metropolis font-semibold text-2xl leading-6">
              Create {chainName} Token
            </span>

            <p className="font-metropolis font-medium text-base leading-[21px] ">
              Lorem ipsum dolor sit amet consectetur. Aenean bibendum interdum
              faucibus viverra pellentesque sque.
            </p>
          </div>
        </div>

        {/* //**************** Binanace Form ********************* */}
        <div className="pl-[1.5rem] mt-10 mr-20 ">
          <BinanceForm />
        </div>
      </div>
    </>
  );
}

export default Binance;
