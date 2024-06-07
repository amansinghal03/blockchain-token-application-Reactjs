import Aptos from '../../img/Aptos.png'
import Arbitrum from "../../img/Arbitrum.png";
import Binance from "../../img/Binance.png";
import Ethereum from "../../img/Ethereum.png";
import Polygon from "../../img/Polygon.png";



export const TooltipTexts = {
  canBurn:
    "This check specifies whether your tokens can be burned to decrease the supply",
  canMint:
    "Minting specifies the opposite, whether more tokens can be created to increase the initial supply.",
  canPause:
    "This check specifies whether your token and all associated operations can be halted and resumed whenever needed. This pausing operation can be used in case of a software vulnerability or a malicious attack. Be aware that enabling pausing gives authority to whoever is allowed to pause or unpause, such as the creator of the token, and this central authority may not suit certain use cases.",
};

export const checkboxOptions = [
  { label: "Can Burn", value: "canBurn", tooltip: TooltipTexts.canBurn },
  { label: "Can Mint", value: "canMint", tooltip: TooltipTexts.canMint },
  { label: "Can Pause", value: "canPause", tooltip: TooltipTexts.canPause },
  // { label: "Can Black list", value: "canBlacklist", tooltip: "Hello" },
];


export const tokenList = [
  {
    id: 1,
    chainId: '0x1',
    chainIdNum:1,
    icon: Ethereum,
    name: "Ethereum",
    type: "ethereum",
    currency: "ETH",
    explorerUrl: "https://etherscan.io",
    rpcUrl: "https://cloudflare-eth.com",
  },

  {
    id: 2,
    chainId: '0x89',
    chainIdNum:137,
    icon: Polygon,
    name: "Polygon",
    type: "polygon",
    currency: "MATIC",
    explorerUrl: "https://polygonscan.com",
    rpcUrl: "https://polygon-rpc.com",
  },

  {
    id: 3,
    chainId: '0x38',
    chainIdNum:56,
    icon: Binance,
    name: "Binance",
    type: "binance",
    currency: "BNB",
    explorerUrl: "https://bscscan.com",
    rpcUrl: "https://bsc-dataseed.binance.org",
  },

  // {
  //   id: 4,
  //   chainId: '0x13881',
  //   icon: Arbitrum,
  //   chainIdNum:42161,
  //   name: "Arbitrum",
  //   type: "arbitrum",
  //   currency: "MATIC",
  // },

  {
    id: 4,
    chainId: '11155111',
    chainIdNum:11155111,
    icon: Arbitrum,
    name: "Sepolia",
    type: "sepolia",
    // currency: "MATIC",
  },

];

//**************** Increment or Decrement Button******************* */
export const handleIncrementDecrement = (currentValue, minValue, maxValue) => {
    const handleIncrement = () => {
      return Math.min(currentValue + 1, maxValue);
    };
  
    const handleDecrement = () => {
      return Math.max(currentValue - 1, minValue);
    };
  
    return {
      handleIncrement,
      handleDecrement,
    };
  };
  