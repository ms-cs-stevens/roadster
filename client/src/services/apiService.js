import { createToken } from "../firebase/firebaseFunctions";
import axios from "axios";

async function getHeaders() {
  const token = await createToken();
  const payloadHeader = {
    headers: {
      "Content-Type":"application/json",
      Authorization: `Bearer ${token}`
    }
  }
  return payloadHeader;
}

const exportedFunctions = {
  async createResource(url, payload) {
    const payloadHeader = await getHeaders();
    try {
      const res = await axios.post(url, payload, payloadHeader);
      return res.data;
    } catch (e) {
      console.error(e);
    }
  },

  async getResource(url) {
    const payloadHeader = await getHeaders();
    try {
      const res = await axios.get(url, payloadHeader);
      return res.data;
    } catch(e){
      console.error(e);
    }
  }
}

export default exportedFunctions;
