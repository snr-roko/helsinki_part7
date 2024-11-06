import axios from "axios";
const url = "api/login";

const login = async (loginDetails) => {
  try {
    const loginResponse = await axios.post(url, loginDetails);
    return loginResponse.data;
  } catch (error) {
    throw error.response.data;
  }
};

export default login;
