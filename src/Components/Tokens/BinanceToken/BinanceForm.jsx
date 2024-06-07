import { Form, InputNumber, Space } from "antd";
import React, { useState, useRef, useEffect } from "react";
import { Button, Checkbox, Input, Switch, Tooltip } from "antd";
import { BsEmojiSmile } from "react-icons/bs";
import TokenFormStyle from "../../../Styles/TokenFormStyle";
import { RxCross2 } from "react-icons/rx";
import EmojiPicker from "emoji-picker-react";
import { PiWaves } from "react-icons/pi";
import { FiPlus } from "react-icons/fi";
import { FiMinus } from "react-icons/fi";
import ButtonStyle from "../../../Styles/ButtonStyle";
import useSigner from "../../../hooks/useSinger";
import { ethers } from "ethers";
import standardErc20 from "../../../contracts/StandaredERC20";
import {
  TooltipTexts,
  checkboxOptions,
  handleIncrementDecrement,
  tokenList,
} from "../../../utils/contast/contast";
import { toast, useToast } from "react-toastify";
import { useWeb3ModalAccount } from "@web3modal/ethers5/react";
import { CreateContractApi } from "../../../utils/api/api";
import BinanceDeployeModal from "../../Modal/BinanceDeployeModal";
import Loading from "../../Loading/Loading";
import FormStyle from "../../../Styles/FormStyle";

function BinanceForm(props) {
  const [showCreateOwner, setShowCreateOwner] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState("");
  const [advancedSetting, setAdvancedSetting] = useState(false);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  //*************************** Emoji Picker ******************* */

  // const toggleEmojiPicker = () => {
  //   setShowEmojiPicker(!showEmojiPicker);
  // };

  // const onEmojiClick = (event, emojiObject) => {
  //   setSelectedEmoji(emojiObject.emoji);
  //   toggleEmojiPicker();
  // };

  // const emojiPickerRef = useRef();

  // const handleClickOutside = (event) => {
  //   if (
  //     emojiPickerRef.current &&
  //     !emojiPickerRef.current.contains(event.target)
  //   ) {
  //     setShowEmojiPicker(false);
  //   }
  // };
  // useEffect(() => {
  //   document.addEventListener("click", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("click", handleClickOutside);
  //   };
  // }, []);

  // const suffix = (
  //   <div className="relative" ref={emojiPickerRef}>
  //     <BsEmojiSmile
  //       onClick={toggleEmojiPicker}
  //       style={{
  //         fontSize: 22,
  //         color: "#696969",
  //         cursor: "pointer",
  //       }}
  //     />
  //     <div
  //       className="absolute top-10 right-0"
  //       style={{ display: showEmojiPicker ? "block" : "none" }}
  //     >
  //       <EmojiPicker onEmojiClick={onEmojiClick} />
  //     </div>
  //   </div>
  // );

  //*************************************************8 */

  const onChangeOwner = (checked) => {
    setShowCreateOwner(checked);
    setAdvancedSetting(checked);
  };

  //**************** Increment or Decrement Button******************* */
  const [decimalValue, setDecimalValue] = useState(null);

  const { handleIncrement, handleDecrement } = handleIncrementDecrement(decimalValue,0,18);

  // const PlusSuffix = (
  //   <button
  //     className="bg-[#E8E8E8] h-full flex items-center justify-center px-2 cursor-pointer"
  //     onClick={(e) => {
  //       e.preventDefault();
  //       setDecimalValue(handleIncrement());
  //     }}
  //   >
  //     <FiPlus size={22} style={{ color: "#696969" }} />
  //   </button>
  // );

  // const MinusSuffix = (
  //   <button
  //     className="bg-[#E8E8E8] h-full flex items-center justify-center px-2 cursor-pointer"
  //     onClick={(e) => {
  //       e.preventDefault();
  //       setDecimalValue(handleDecrement());
  //     }}
  //   >
  //     <FiMinus size={22} style={{ color: "#696969" }} />
  //   </button>
  // );

  const handleCheckboxChange = (value) => {
    setSelectedCheckboxes((prevSelected) => {
      if (prevSelected.includes(value)) {
        return prevSelected.filter((checkbox) => checkbox !== value);
      } else {
        return [...prevSelected, value];
      }
    });
  };

  const { signer, address, provider } = useSigner();
  const { chainId, isConnected } = useWeb3ModalAccount();

  const handleContract = async (value) => {
    console.log("value in contract get ", value);
    try {
      setLoading(true);
      const {
        ownerAddress,
        address_service,
        symbol,
        tokenName,
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
        tokenName,
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

      sessionStorage.setItem(
        "DeployeContract",
        JSON.stringify(contract?.address)
      );
      setLoading(false);
      return contract?.address;
    } catch (error) {
      console.error("Error deploying contract:", error);
      setLoading(false);
    }
  };

  //*********************** Api Integreation ********************************/

  const handleApiCall = async (values, contractResult) => {
    try {
      const result = await CreateContractApi(values, contractResult);
      return result;
    } catch (error) {
      console.error("Error calling API:", error);
      throw new Error("An error occurred while calling the API.");
    }
  };

  //*******************************************************/
  const handleSubmit = async (values) => {
    console.log("handlesubit");

    if (!isConnected) {
      toast.error("Please connect your wallet first.");
      return;
    }
    const otherConfigObject = {
      canBurn: selectedCheckboxes.includes("canBurn"),
      canMint: selectedCheckboxes.includes("canMint"),
      canPause: selectedCheckboxes.includes("canPause"),
      canBlacklist: selectedCheckboxes.includes("canBlacklist"),
    };

    otherConfigObject.canBlacklist = false;
    const type = tokenList.filter((token) => token.chainIdNum === chainId)[0].type;
    const decimalValue = Number(values.decimal);

    const modifyObject = {
      tokenName: values.tokenName.trim(),
      symbol: values.symbol.trim(),
      decimal: decimalValue,
      initialSupply: values.initialSupply,
      advanceSetting: values.advanceSetting,
      otherConfig: otherConfigObject,
      type: type,
      address_service: process.env.REACT_APP_ADDRESS_SERVICE,
      ownerAddress: !advancedSetting ? address : values.ownerAddress,
    };
    console.log("modifying", modifyObject);

    try {
      //******************* For Api Test ***************** */
      // const contractResult = '0x369d5943a31771c4DB1635210B5afcA1b241Ca6F'
      // const apiResult = await handleApiCall(modifyObject, contractResult);
      // console.log('apiResult' , apiResult);
      //*************************************************** */

      const contractResult = await handleContract(modifyObject);
      if (contractResult) {
        const apiResult = await handleApiCall(modifyObject, contractResult);
        if (apiResult) {
          toast.success("Contract deployed  successful");
          setIsModalOpen(true);
        } else {
          toast.error("Deploye Api call failed");
        }
      } else {
        console.error(
          "Contract deployment failed or returned undefined result."
        );
        toast.error("Contract deployment failed or returned undefined result");
      }
    } catch (error) {
      console.error("Error handling contract submission:", error);
      toast.error("An error occurred while processing your request.");
    } finally {
      setLoading(false);
    }
  };

  //******************************************** */

  return (
    <>
      <Form onFinish={handleSubmit}>
        <div className="flex flex-col gap-[1.2rem ] ">
          {/* Token Name  */}
          <div className=" flex justify-between w-full items-start gap-2 sm:gap-8 flex-col sm:flex-row ">
            <div className="relative ">
              <div className="text-xl text-red-500 relative">*</div>
              <label
                htmlFor=""
                className="relative top-[-20px] font-metropolis font-semibold text-[14px] leading-6 ml-2"
                // style={{ whiteSpace: "nowrap" }}
              >
                {" "}
                TokenName
              </label>
            </div>
            <Form.Item
              name="tokenName"
              rules={[
                {
                  required: true,
                  message: "Please input your TokenName!",
                },

                {
                  validator: (_, value) => {
                    if (/^\s*$/.test(value)) {
                      return Promise.reject(new Error("No spaces allowed"));
                    }
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <div className="w-full">
                <Input
                  style={{
                    height: "47px",
                    width:"100%",
                    borderRadius: "8px",
                    border: "1px solid #E8E8E8",
                    // paddingLeft: "0px",
                  }}
                  placeholder="Enter Token Name"
                  // suffix={suffix}
                />
              </div>
            </Form.Item>
          </div>

          {/* Symbol Name */}
          <div className="flex justify-between w-full items-start gap-2 sm:gap-8 flex-col sm:flex-row ">
            <div className="relative ">
              <div className=" text-xl text-red-500 relative">*</div>
              <label
                htmlFor=""
                className="font-metropolis font-semibold text-[14px] leading-6 ml-2 relative top-[-20px]"
              >
                {" "}
                SymbolName
              </label>
            </div>

            <Form.Item
              name="symbol"
              rules={[
                {
                  required: true,
                  message: "Please input your SymbolName!",
                },
                {
                  validator: (_, value) => {
                    if (/^\s*$/.test(value)) {
                      return Promise.reject(new Error("No spaces allowed"));
                    }
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <div className="w-full">
                <Input
                  style={{
                    height: "47px",
                    borderRadius: "8px",
                    border: "1px solid #E8E8E8",
                  }}
                  placeholder="Enter Symbol"
                  // suffix={suffix}
                />
              </div>
            </Form.Item>
          </div>

          {/*  initial supply */}
          <div className=" flex justify-between w-full items-start gap-2 sm:gap-8 flex-col sm:flex-row ">
            <div className="relative ">
              <div className="text-xl text-red-500 relative">*</div>
              <label
                htmlFor=""
                className="font-metropolis font-semibold text-[14px] leading-6 ml-2 relative top-[-20px]"
              >
                {" "}
                Initialsupply
              </label>
            </div>

            <Form.Item
              name="initialSupply"
              rules={[
                {
                  required: true,
                  message: "Please input your Initialsupply!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    // const initial = value.split(".");
                    // if (
                    //   initial?.[1] &&
                    //   initial?.[1].length > getFieldValue("decimal")
                    // ) {
                    //   return Promise.reject(
                    //     new Error("Only Enter Decimal Input Length is allowed")
                    //   );
                    // }
                    if (value.includes(".")) {
                      return Promise.reject(
                        new Error("Point values are not allowed")
                      );
                    }
                    if (value > 21000000) {
                      return Promise.reject(
                        new Error("Enter Less than 21 Million allowed")
                      );
                    }
                    return Promise.resolve();
                  },
                }),
              ]}
            >
              <div className="w-full ">
                <div className=" flex justify-between w-full items-start gap-2 sm:gap-8 flex-col sm:flex-row ">
                  <div className="w-full">
                    <Input
                      style={{
                        height: "47px",
                        borderRadius: "8px",
                        border: "1px solid #E8E8E8",
                      }}
                      placeholder="0"
                      type="number"
                    />
                  </div>

                  <div className="w-full">
                    <Input
                      style={{
                        height: "47px",
                        borderRadius: "8px",
                        border: "1px solid #E8E8E8",
                        cursor: "default",
                      }}
                      prefix={<PiWaves size={25} />}
                      placeholder="21 Million"
                      className="bg-[#E8E8E8] cursor-default"
                      disabled={true}
                    />
                  </div>
                </div>
              </div>
            </Form.Item>
          </div>

          {/* Decimals  */}
          <div className="flex justify-between w-full items-start gap-2 sm:gap-8 flex-col sm:flex-row ">
            <div className="relative ">
              <div className="text-xl text-red-500 relative">*</div>
              <label
                htmlFor=""
                className="font-metropolis font-semibold text-[14px] leading-6 ml-2 relative top-[-20px]"
                style={{ whiteSpace: "nowrap" }}
              >
                {" "}
                Decimals(1-18)
              </label>
            </div>
            <Form.Item
              name="decimal"
              rules={[
                {
                  required: true,
                  message: "Please input your Decimal!",
                },
                {

                  validator: (_, value) => {
                    if (value === 0 || value === null) {
                      return Promise.resolve();
                    }
                    
                    if (value.includes(".")) {
                      return Promise.reject(
                        new Error("Point values are not allowed")
                      );
                    }

                    if (
                      !Number.isInteger(Number(value)) ||
                      value < 1 ||
                      value > 18
                    ) {
                      return Promise.reject(
                        "Please enter a valid number between 1 and 18!"
                      );
                    }
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <div className="w-full">
                <Input
                  style={{
                    height: "47px",
                    borderRadius: "8px",
                    border: "1px solid #E8E8E8",
                  }}
                  // suffix={PlusSuffix}
                  // prefix={MinusSuffix}
                  placeholder="0"
                  className="flex justify-center "
                  onChange={(e) => setDecimalValue(Number(e.target.value))}
                  value={decimalValue}
                  type="number"
                />
              </div>
            </Form.Item>
          </div>

          {/* advanced Settings */}
          <Form.Item name="advanceSetting" initialValue={advancedSetting}>
            <div className="flex gap-5">
              <span className="font-metropolis font-semibold text-2xl leading-5">
                Advanced Setting
              </span>
              <div>
                <Switch onChange={onChangeOwner} className="bg-[#F0F1F1]" />
              </div>
            </div>
          </Form.Item>

          {/*  */}

          {/* {showCreateOwner && ( */}
          <div
            className={`flex justify-between w-full max-sm:flex-col max-sm:items-baseline ${
              advancedSetting ? "" : "hidden"
            }`}
          >
            <div className="relative ">
              <label
                htmlFor=""
                className="font-metropolis font-semibold text-[14px] leading-6 ml-2 top-3 absolute"
              >
                {" "}
                Create/Owner
              </label>
            </div>

            <Form.Item
              name="ownerAddress"
              rules={[
                {
                  required: false,
                  message: "Please input owner address!",
                },
              ]}
            >
              <div className="w-[600px] max-sm:w-[300px]">
                <Input
                  style={{
                    height: "47px",
                    borderRadius: "8px",
                    border: "1px solid #E8E8E8",
                  }}
                  placeholder="0011X1........."
                />
              </div>
            </Form.Item>
          </div>
          {/* )} */}

          {/* Other Config  */}
          <div className="flex justify-between w-full items-start gap-2 sm:gap-8 flex-col sm:flex-row ">
            <div className="relative ">
              <label
                htmlFor=""
                className="font-metropolis font-semibold text-[14px] leading-6 ml-2 absolute top-1"
                style={{ whiteSpace: "nowrap" }}
              >
                {" "}
                Other Config
              </label>
            </div>
            <Form.Item
              name="otherConfig"
              rules={[
                {
                  validator: (_, value) => {
                    if (!value || value.length === 0) {
                      return Promise.reject(
                        "Please select at least one option!"
                      );
                    } else {
                      return Promise.resolve();
                    }
                  },
                },
              ]}
            >
              <div className="w-full  flex flex-wrap gap-[22px]">
                {checkboxOptions.map((option) => (
                  <Checkbox
                    value={option.value}
                    key={option.value}
                    onChange={() => handleCheckboxChange(option.value)}
                    checked={selectedCheckboxes.includes(option.value)}
                  >
                    <Tooltip
                      title={option.tooltip}
                      overlayStyle={{ maxWidth: "700px" }}
                    >
                      <span className="border-b-2 border-dashed">
                        {option.label}
                      </span>
                    </Tooltip>
                  </Checkbox>
                ))}
              </div>
            </Form.Item>
          </div>

          {/* Message one */}
          {/* <Form.Item name="message"> */}
          <div>
            <div className=" flex items-center justify-end w-full max-sm:flex-col max-sm:items-baseline">
              <div className="bg-[#807e7e] bg-opacity-10 p-4 w-[600px] max-sm:w-[300px] rounded-xl">
                <div className="flex items-center justify-between">
                  <div className="w-[90%]">
                    <p className="font-metropolis font-normal text-sm leading-6">
                      All tokens have been reviewed by the security audit
                      company and passed the contract security audit!
                    </p>
                  </div>
                  <span className="cursor-pointer">
                    <RxCross2 size={22} style={{ color: "#807e7e" }} />
                  </span>
                </div>
              </div>
            </div>
          </div>
          {/* </Form.Item> */}

          {/* Message Second */}
          {/* <Form.Item name="messageSecond"> */}
          <div className="mt-8">
            <div className=" flex items-center justify-end w-full max-sm:flex-col max-sm:items-baseline">
              <div className="bg-[#0074B7] bg-opacity-10 p-4 w-[600px] max-sm:w-[300px] rounded-xl">
                <div className="flex items-center ">
                  <p className="font-metropolis font-normal text-sm leading-6">
                    It only takes 10 seconds to create successfully, without
                    manual intervention, the token will be automatically
                    transferred to the address of the creator/owner after the
                    creation is successful. The token does not have any
                    copyright, it is automatically deployed to the main network
                    and verified!
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* </Form.Item> */}

          {/* */}
          <div className="mt-8 flex justify-center">
            <ButtonStyle>
              <Button
                type="submit"
                className={`bg-gradient-to-b from-[#006FD9] via-[#003B73] to-[#003B73] px-[1.875rem] h-[3rem] flex items-center gap-2 justify-center rounded-3xl hover:from-[#006FD9] hover:via-[#003B73] hover:to-[#003B73]`}
              >
                <span className="font-poppins font-medium text-base leading-[21px] text-white">
                  Create Token
                </span>
              </Button>
            </ButtonStyle>
          </div>

          {/* <BinanceDeployeModal isOpen={isModalOpen} setIsOpen= {setIsModalOpen}/> */}

          <BinanceDeployeModal />
        </div>
        {loading && <Loading />}
      </Form>

      <TokenFormStyle />
      <FormStyle/>
    </>
  );
}

export default BinanceForm;
