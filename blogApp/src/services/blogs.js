import axios from "axios";
const baseUrl = "/api/blogs";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const create = async (newBlog) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };

  try {
    const response = await axios.post(baseUrl, newBlog, config);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const update = async (updateBlog, id) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };

  try {
    const response = await axios.put(`${baseUrl}/${id}`, updateBlog, config);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const deleteBlog = async (id) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };

  try {
    const response = await axios.delete(`${baseUrl}/${id}`, config);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const addComment = async (id, comment) => {
  const config = {
    headers: {
      Authorization: token
    }
  }
  try {
    const response = await axios.post(`${baseUrl}/${id}/comments`, comment, config);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}

export default { getAll, setToken, create, update, deleteBlog, addComment };
