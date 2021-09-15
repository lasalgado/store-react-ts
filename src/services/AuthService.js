import { API, STORE_END_POINT } from './config';

const AuthService = {
    login: async (payload) => {
        const response = await API.post(`${STORE_END_POINT.LOGIN}`, payload);
        const { data } = response;
        if (response.status === 200) return data;
        return { hasError: true, message: response.statusText}
    },
    get_user: async (payload) => {
         const response = await  API.get(`${STORE_END_POINT.GET_USER}`, payload)
         const { data } = response;
         if (response.status === 200) return data;
         return { hasError: true, message: response.statusText}
    },
    signup: (payload) => {
        return API.post(`${STORE_END_POINT.REGISTER}`, payload)
                .then(response => response.data);
    }
};

export default AuthService;
