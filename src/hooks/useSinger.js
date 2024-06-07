import { ethers } from "ethers";
import {
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from "@web3modal/ethers5/react";
import { useEffect, useState } from "react";

const useSigner = () => {
  const [signer, setSigner] = useState({});
  const { address, chainId, isConnected } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();

  useEffect(() => {
    if (isConnected) {
      const provider = new ethers.providers.Web3Provider(walletProvider);
      const signer = provider.getSigner();
      setSigner({ isConnected, chainId, provider, address, signer });
    } else {
      setSigner({ isConnected, chainId });
    }
  }, [isConnected, chainId]);

  return signer;
};

export default useSigner;
