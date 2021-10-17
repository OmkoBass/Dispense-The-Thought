import axios from "axios";

const backend = "http://localhost:5000";

const uploadImageToAWS = async (file) => {
  let formData = new FormData();
  formData.append("image", file);

  try {
    const uploadRequest = await axios.post(`${backend}/upload`, formData);

    const statusCode = uploadRequest.status;

    if (uploadRequest.status === 200) {
      return { response: true, error: null };
    } else {
      return { response: null, error: statusCode };
    }
  } catch (e) {
    return { response: null, error: e };
  }
};

const getThoughts = async () => {
  try {
    const getThoughtsRequest = await axios.get(`${backend}/thoughts`);

    const statusCode = getThoughtsRequest.status;

    if (statusCode === 200) {
      return { response: getThoughtsRequest.data, error: null };
    } else {
      return { response: null, error: statusCode };
    }
  } catch (e) {
    return { response: null, error: e };
  }
};

export { uploadImageToAWS, getThoughts };
