import axios from "axios";

const axiosInstance = axios.create({
    baseURL:`https://pet-adoption-server-gilt.vercel.app`
   
})

const UseAxios = () => {
    return axiosInstance;
};

export default UseAxios;