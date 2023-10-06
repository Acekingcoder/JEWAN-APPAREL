import axios from "axios";

const myApi = axios.create({
  baseURL: "http://localhost:8000",
  withCredentials: true,
});

export default myApi;
