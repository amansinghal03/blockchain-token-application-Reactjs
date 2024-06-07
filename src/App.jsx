import "./App.css";
import RoutesPage from "./Routes/RoutesPage";
import { createWeb3Modal, defaultConfig } from "@web3modal/ethers5/react";

function App() {
  const projectId = "efc7b7cb58397c26f89c062843eadf98";
  const metadata = {
    name: "My Website",
    description: "My Website description",
    url: "https://mywebsite.com",
    icons: ["https://avatars.mywebsite.com/"],
  };

  const sepolia = {
    chainId: 11155111,
    name: "Sepolia",
    currency: "ETH",
    explorerUrl: "https://sepolia.etherscan.io",
    rpcUrl: "https://rpc.sepolia.org",
  };

  const ethereum = {
    chainId: 1,
    name: "Ethereum",
    currency: "ETH",
    explorerUrl: "https://etherscan.io",
    rpcUrl: "https://cloudflare-eth.com",
  };

  const polygon = {
    chainId: 137,
    name: "Polygon",
    currency: "MATIC",
    explorerUrl: "https://polygonscan.com",
    rpcUrl: "https://polygon-rpc.com",
  };

  const binance = {
    chainId: 56,
    name: "Binance",
    currency: "BNB",
    explorerUrl: "https://bscscan.com",
    rpcUrl: "https://bsc-dataseed.binance.org",
  };

  // const arbitrum = {
  //   chainId: 42161,
  //   name: "Arbitrum",
  //   currency: "MATIC",
  // };

  createWeb3Modal({
    ethersConfig: defaultConfig({ metadata }),
    chains: [sepolia, polygon, ethereum , binance ],
    projectId,
    enableAnalytics: true,
  });

  return (
    <>
      <RoutesPage />
    </>
  );
}

export default App;
