import axios from "axios";

const jwtToken = JSON.parse(sessionStorage.getItem("loginResultJwtToken"));
const userId = JSON.parse(sessionStorage.getItem("loginResultId"));

const baseUrl = process.env.REACT_APP_BASE_URL;

export const SignMessageApi = async () => {
  console.log('baseurl', baseUrl);

  try {
    const response = await axios.get(`${baseUrl}v1/auth/get`);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const LoginApi = async (signature) => {
  try {
    const response = await axios.post(`${baseUrl}v1/auth/login`, {
      signature: signature,
    });
    return response?.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const CreateContractApi = async (values,deployedAddress ) => {
  const tokenName = values?.tokenName;
  const symbol = values?.symbol;
  const initialSupply = values?.initialSupply;
  const decimal = values?.decimal;
  const advanceSetting = values?.advanceSetting;
  const ownerAddress = values?.ownerAddress;
  const otherConfig = values?.otherConfig;
  const type = values?.type;
  try {

    const response = await axios.post(
      `${baseUrl}v1/tokenContract/create/contract`,
      {
        tokenName: tokenName,
        symbol: symbol,
        initialSupply: initialSupply,
        decimal: decimal,
        type: type,
        deployAddress: deployedAddress,
        advanceSetting: advanceSetting,
        ownerAddress: ownerAddress,
        otherConfig: {
          canMint: otherConfig.canMint,
          canPause: otherConfig.canPause,
          canBurn: otherConfig.canBurn,
          canBlacklist: otherConfig.canBlacklist,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          _id: userId,
        },
      }
    );

    console.log("response->", response);
    return response?.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};



export const UnitTestCasemodalApi = async (values) => {

  console.log('jwt', jwtToken);
  console.log('id', userId);
  try {
    const response = await axios.post(
      `${baseUrl}v1/userinfo/testCasesDetails`,
      {
        emailId: values.emailId,
        phoneNumber: values.phoneNumber,
      },
      {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          _id: userId,
        },
      }
    );
    return response
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
