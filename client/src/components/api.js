import axios from 'axios';
import Notification from './notifycation';
import { getToken } from './component-function';
import { useCookies } from 'react-cookie';


axios.interceptors.request.use(
    function (config) {
        
        // const [cookies, setCookie, removeCookie] = useCookies(['cookie-name']);
        // if (getToken()) {
        //     config.headers["Authorization"] = "Bearer " + getToken();
        // }
        config.headers["Content-Type"] = 'application/json';
        // if(cookies.get('XSRF-TOKEN')) {
        //     config.headers["X-XSRF-TOKEN"] = cookies.get('XSRF-TOKEN');
        // }   
        return config;
    },
    function (err) {
        return Promise.reject(err);
    }
);

var API = function () {

    async function get(props) {
        try {
            const result = await axios.get(props.url);
            if(result.data.error) {
                throw new Error("Error when get data from server");
            }
            return result.data;
        } catch (error) {
            // Notification.show({
            //     title: 'Error',
            //     type: 'danger',
            //     message: 'Get data from url fail ' + props.url
            // })
            throw error;
        }
    }

    async function post(props) {
        try {
            const result = await axios.post(props.url, props.body);
            return result.data;
        } catch (error) {
            Notification.show({
                title: 'Error',
                type: 'danger',
                message: 'Get data from url fail ' + props.url
            });
            throw error;
        }
    }
    return { get: get, post: post };
}();
export default API;