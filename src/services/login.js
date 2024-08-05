import axios from 'axios'
const url = 'api/login'

const login = async (loginDetails) => {
  const loginResponse = await axios.post(url, loginDetails)
  return loginResponse.data
}

export default login