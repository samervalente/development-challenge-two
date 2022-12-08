import axios from "axios";

const instance = axios.create({
  baseURL: "https://fgdbj81vpk.execute-api.us-east-1.amazonaws.com/production",
});

export default instance;
