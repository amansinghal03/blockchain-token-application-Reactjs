// import useSigner from "../../hooks/useSinger";
import standardErc20 from "../../contracts/StandaredERC20";
import { ethers } from "ethers";
import useSigner from "../../hooks/useSinger";

const deployBinanceContract = async (value) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { signer, address, provider } = useSigner();

  try {
    const {
      ownerAddress,
      address_service,
      symbol,
      tokenname,
      otherConfig,
      decimal,
      initialSupply,
      advanceSetting,
    } = value;

    const signer = await provider.getSigner();
    const factory = new ethers.ContractFactory(
      standardErc20.abi,
      standardErc20.bytecode,
      signer
    );

    const contract = await factory.deploy(
      ownerAddress,
      tokenname,
      symbol,
      decimal,
      initialSupply,
      address_service,
      otherConfig.canMint,
      otherConfig.canPause,
      otherConfig.canBurn,
      otherConfig.canBlacklist
    );
    await contract.deployed();
    console.log("Contract deployed to:", contract.address);
  } catch (error) {
    console.error("Error deploying contract:", error);
    alert("Reject user request");
  }
};

export default deployBinanceContract;
