import axios from 'axios';
import { API_ROUTES } from './constant';

const BASE_URL = "http://5.161.122.193:7000/api/"

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const RegisterOwner = userdata => {
    return axiosInstance.post(API_ROUTES.REGISTEROWNER, userdata)
}

export const RegisterDirver = userdata => {
    return axiosInstance.post(API_ROUTES.REGISTERDRIVER, userdata)
}

export const LoginAPI = userdata => {
    return axiosInstance.post(API_ROUTES.LOGIN, userdata)
}