import React, { useState } from "react";
import { Button, Input, Modal, Form } from "antd";
import ContrarctAddress from "../../img/ContractAddress.png";
import RightImg from "../../img/RightImg.png";
import SupportImg from "../../img/SupportImg.png";
import UnitImg from "../../img/UnitImg.png";
import { UnitTestCasemodalApi } from "../../utils/api/api";
import { toast } from "react-toastify";

const BinanceDeployeModal = ({ isOpen, setIsOpen }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
    // setIsOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    // setIsOpen(false);
  };

  const handleUnitTestCaseApi = async (values) => {
    try {
      const result = await UnitTestCasemodalApi(values);
      return result
    } catch (error) {
      console.log('error', error);
    }
  };

  const handleSubmit = async (values) => {
    try {
      const result = await handleUnitTestCaseApi(values);
      console.log("result", result);
      handleOk();
      // toast.success('Thanks For Response')
    } catch (error) {
      console.error("Error occurred while submitting unit test case:", error);
      // toast.error("Error occurred while submitting unit test case");
    }
  };


  const DeployeAddress = JSON.parse(sessionStorage.getItem("DeployeContract"));
  return (
    <>
      <Button type="primary" onClick={showModal}>
        Open Modal
      </Button>
      <Modal
        // open={isOpen}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        maskClosable={false}
        footer={null}
        width={600}
      >
        <Form onFinish={handleSubmit}>
          <div className=" w-full mt-10">
            <div className="flex justify-center items-center flex-col gap-2">
              <img src={RightImg} alt="" className="w-[3.5rem] h-[3.5rem]" />
              <span className="font-metropolis font-semibold text-2xl leading-24">
                Token Created Successfully
              </span>
            </div>

            <div className="gap-4 mt-12">
              <span className="text-lg">
                To get <b>Free</b>{" "}
              </span>

              <div className="flex h-10 gap-20  mt-4">
                <div className="flex  gap-2 items-center">
                  <img src={SupportImg} alt="" className="h-full" />
                  <span className="font-metropolis font-semibold text-xl">
                    Support
                  </span>
                </div>

                <div className="flex  gap-2 items-center">
                  <img src={UnitImg} alt="" className="h-full" />
                  <span className="font-metropolis font-semibold text-xl">
                    Unit Test Cases
                  </span>
                </div>
              </div>
            </div>

            <div className="flex  gap-6 mt-8 h-10 ">
              <Form.Item
                name="emailId"
                className="w-full h-full"
                rules={[
                  {
                    required: true,
                    message: "Please enter your email address",
                  },
                  {
                    type: "email",
                    message: "Please enter a valid email address",
                  },
                ]}
              >
                <Input placeholder="Enter Email Id" />
              </Form.Item>

              <Form.Item
                name="phoneNumber"
                className="w-full h-full"
                rules={[
                  {
                    required: true,
                    message: "Please enter your contact number",
                  },
                  {
                    pattern: /^[0-9]+$/,
                    message: "Please enter a valid contact number",
                  },
                ]}
              >
                <Input placeholder="Enter Contact No." />
              </Form.Item>
            </div>

            <div className="flex  gap-6 mt-12 h-10  justify-center">
              <button
                className="w-full rounded-3xl border-2 border-[#0B6ECC] text-[#015586]"
                onClick={(e) => {
                  e.preventDefault();
                  handleCancel();
                }}
              >
                Close
              </button>
              <button className="bg-green-300 w-full rounded-3xl bg-gradient-to-b from-[#0074B7]  to-[#003351] text-white"
              type="submit"
              >
                Submit
              </button>
            </div>
          </div>
        </Form>
      </Modal>
    </>
  );
};
export default BinanceDeployeModal;
