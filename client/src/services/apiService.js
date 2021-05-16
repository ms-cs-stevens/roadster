import { createToken } from "../firebase/firebaseFunctions";
import { apiUrl } from "../config";
import axios from "axios";

async function getHeaders() {
  const token = await createToken();
  const payloadHeader = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  return payloadHeader;
}

const exportedFunctions = {
  async createResource(url, payload) {
    const payloadHeader = await getHeaders();
    try {
      const res = await axios.post(`${apiUrl}/${url}`, payload, payloadHeader);
      return res.data;
    } catch (e) {
      console.error(e);
    }
  },

  async getResource(url) {
    const payloadHeader = await getHeaders();
    try {
      const res = await axios.get(`${apiUrl}/${url}`, payloadHeader);
      return res.data;
    } catch (e) {
      console.error(e);
    }
  },

  async editResource(url, payload) {
    const payloadHeader = await getHeaders();
    try {
      const res = await axios.patch(`${apiUrl}/${url}`, payload, payloadHeader);
      return res.data;
    } catch (e) {
      console.error(e);
    }
  },

  async deleteResource(url, payload) {
    const payloadHeader = await getHeaders();
    try {
      const res = await axios.delete(
        `${apiUrl}/${url}`,
        payload,
        payloadHeader
      );
      return res.data;
    } catch (e) {
      console.error(e);
    }
  },
};

export default exportedFunctions;
