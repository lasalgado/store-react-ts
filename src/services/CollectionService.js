import axios from "axios"
import { API, STORE_END_POINT } from './config';

// axios.interceptors.response.use(
//     response => response,
//     error => {
//       // We really want to throw the error so it is handled and we
//       // don't get an unhandledrejection error. By throwing here, we
//       // are handling the rejection, and bubbling up to the closest
//       // error handler (try/catch or catch method call on a promise).
//       throw error
//     }
//   )

export const fetchCollections = async () => {
    try {
        const response = await API.get(`${STORE_END_POINT.STORE_COLLECTIONS}`);
        const { data } = response;
        if (response.status === 200) return data;
        return { hasError: true, message: response.statusText}
    } catch (error) {
        return { hasError: true, message: error.message };
    }
}