import axios from "axios";
const url = "api/users";

const getAll = async () => {
    const response = await axios.get(url)
    return response.data
}

export default getAll