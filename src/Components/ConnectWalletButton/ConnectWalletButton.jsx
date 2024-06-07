import React, { useState, useEffect, useCallback } from "react";
import {
  useDisconnect,
  useWeb3Modal,
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from "@web3modal/ethers5/react";
import { toast } from "react-toastify";
import { ethers } from "ethers";
import { LoginApi, SignMessageApi } from "../../utils/api/api";

function ConnectWalletButton() {
  const { open } = useWeb3Modal();
  const { disconnect } = useDisconnect();
  const { address, chainId, isConnected } = useWeb3ModalAccount();
  const [errorMessage, setErrorMessage] = useState(null);
  const [justDisconnected, setJustDisconnected] = useState(false);
  const { walletProvider } = useWeb3ModalProvider();

  const [onSignMessage, setOnSignMessage] = useState("");

  const GetSignMessageApi = async () => {
    try {
      const result = await SignMessageApi();
      setOnSignMessage(result?.message);
    } catch (error) {
      console.error("Error fetching sign message:", error);
    }
  };

  const handleSignMessage = useCallback(async () => {
    try {
      if (onSignMessage) {
        const provider = new ethers.providers.Web3Provider(walletProvider);
        const signer = provider.getSigner();
        const signature = await signer?.signMessage(onSignMessage);
        console.log(signature);
        const result = await LoginApi(signature);
        sessionStorage.setItem("loginResultJwtToken",JSON.stringify(result?.jwt_token));
        sessionStorage.setItem("loginResultId",JSON.stringify(result?.user?.id));

        if(result.jwt_token){
          toast.success('Wallet Connect Successfully')
        } 
      }
    } catch (error) {
      console.error(error);
      disconnect();
      toast.error('Wallet Connect Error')
      sessionStorage.removeItem("loginResultJwtToken");
      sessionStorage.removeItem("loginResultId");
    }
  }, [onSignMessage]);

  useEffect(() => {
    if (isConnected) {
      const token = JSON.parse(sessionStorage.getItem("loginResultJwtToken"));
      if (!token) {
        GetSignMessageApi();
        handleSignMessage();
      }
      setJustDisconnected(false);
    } else if (justDisconnected) {
      toast("Wallet disconnected successfully!");
      setJustDisconnected(false);
      sessionStorage.removeItem("loginResultJwtToken");
      sessionStorage.removeItem("loginResultId");
    } 
  }, [isConnected, justDisconnected, onSignMessage]);

  //*************************** Connect WalletConnect ***************************** */
  const handleConnectWallet = async () => {
    await open();
  };

  //************************* Disconnect Wallet *************************** */
  const handleDisconnectWallet = async () => {
    await disconnect();
    setJustDisconnected(true);
    sessionStorage.removeItem("loginResultJwtToken");
    sessionStorage.removeItem("loginResultId");
  };

  //********************** Show Address in button ****************************** */
  const truncateAddress = (address, length) => {
    return address.slice(0, length) + "...";
  };

  return (
    <>
      <button
        className={`bg-gradient-to-b from-[#003B73] via-[#003B73]  to-[#006FD9]  px-[1.875rem] h-[3rem] flex items-center gap-2 justify-center rounded-3xl`}
        onClick={() =>
          isConnected ? handleDisconnectWallet() : handleConnectWallet()
        }
      >
        <span className="font-poppins font-medium text-base leading-[21px] text-white ">
          {isConnected
            ? `${truncateAddress(address, 6)} Disconnect`
            : "Connect wallet"}
        </span>
      </button>
    </>
  );
}

export default ConnectWalletButton;
