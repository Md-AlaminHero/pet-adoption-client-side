import axios from "axios";

const axiosInstance = axios.create({
    // baseURL:`https://pet-adoption-server-gilt.vercel.app`
    baseURL:`http://localhost:3000/`
   
})

const UseAxios = () => {
    return axiosInstance;
};

export default UseAxios;