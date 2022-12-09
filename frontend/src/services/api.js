import axios from "axios";

const instance = axios.create({
  baseURL: "https://o3q14h4cda.execute-api.us-east-1.amazonaws.com/v1/",
});

export default instance;
