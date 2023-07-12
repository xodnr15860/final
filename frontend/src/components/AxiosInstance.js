import axios from "axios";

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(
  function(config) {
    const memberNo = sessionStorage.getItem("memberNo");
    config.headers["memberNo"] = `${memberNo}`;
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);

export default axiosInstance;
