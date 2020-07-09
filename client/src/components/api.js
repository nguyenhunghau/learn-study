import axios from 'axios';
import Notification from './notifycation';

var API = function () {

    async function get(props) {
        const requestOptions = {
            contentType: 'application/json',
            headers: {
                'Authorization': 'Bearer ' + localStorage['token']
            }
        };
        try {
            const result = await axios.get(props.url, requestOptions);
            return result.data;
        } catch (error) {
            Notification.show({
                title: 'Error',
                type: 'danger',
                message: 'Get data from url fail ' + props.url
            });
        }
    }

    async function post(props) {
        const requestOptions = {
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage['token'] }
        };
        try {
            const result = await axios.post(props.url, props.body, requestOptions);
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