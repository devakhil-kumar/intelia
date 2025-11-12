import { LoginAPI, RegisterDirver, RegisterOwner } from "./api"


export const RegisterOwnerService = async userData => {
    try {
        const response = await RegisterOwner(userData);
        console.log(response, 'response_________')
        console.log(response.data, 'response_________')
        return response.data
    } catch (error) {
        console.log(error, 'error++++++++')
        if (error.response && error.response.data) {
            const errorMessage = error.response.data.message ||
                error.response.data.error ||
                'Signup failed. Please try again.';
            throw new Error(errorMessage);
        } else if (error.request) {
            throw new Error('No response from server. Please check your connection.');
        } else {
            throw new Error('Signup failed. Please try again.');
        }
    }
}

export const RegisterDriverService = async userData => {
    try {
        const response = await RegisterDirver(userData);
        console.log(response, 'response_________')
        console.log(response.data, 'response_________')
        return response.data
    } catch (error) {
        console.log(error, 'error++++++++')
        if (error.response && error.response.data) {
            const errorMessage = error.response.data.message ||
                error.response.data.error ||
                'Signup failed. Please try again.';
            throw new Error(errorMessage);
        } else if (error.request) {
            throw new Error('No response from server. Please check your connection.');
        } else {
            throw new Error('Signup failed. Please try again.');
        }
    }
}


export const loginService = async userData => {
    try {
        const response = await LoginAPI(userData);
        return response.data;
    } catch (error) {
        console.log(error.response?.data?.message, 'resposenbchdfb')
        const errorMessage =
            error.response?.data?.message ||
            error.response?.data?.error;
        return Promise.reject(errorMessage);
    }
};

