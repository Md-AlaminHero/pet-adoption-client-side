import axios from "axios";

const axiosInstance = axios.create({
    // baseURL:`https://pet-adoption-server-gilt.vercel.app`
    baseURL:`https://pet-adoption-server-side-three.vercel.app`
   
})

const UseAxios = () => {
    return axiosInstance;
};

export default UseAxios;