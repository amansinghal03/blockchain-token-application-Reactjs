import React, { useState } from "react";
import { Radio, Select } from "antd";
import SelectorTokenFormStyle from "../../Styles/SelectorTokenFormStyle";

function SelectorTokenForm(props) {
  const [placement, SetPlacement] = useState("topLeft");
  const placementChange = (e) => {
    SetPlacement(e.target.value);
  };
  return (
    <>
      <div className="bg-green-500 ">
        <Radio.Group className="bg-red-100 gap-[32px] flex px-10">
          <Radio.Button value="topLeft" className="rounded-3xl px-4">
            Create Token
          </Radio.Button>
          <Radio.Button value="topRight" className="rounded-3xl px-4">
            Create Token Presale
          </Radio.Button>
          <Radio.Button value="bottomLeft" className="rounded-3xl px-4">
            Create Token Locker
          </Radio.Button>
        </Radio.Group>
      </div>

      <SelectorTokenFormStyle />
    </>
  );
}

export default SelectorTokenForm;
