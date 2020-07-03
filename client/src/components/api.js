import { store } from 'react-notifications-component';
import axios from 'axios';
import 'react-notifications-component/dist/theme.css';
import 'animate.css';

var API = function() {
    const notification = {
        type: "success",
        insert: "top",
        container: "top-left",
        animationIn: ["animated", "fadeIn"],
        animationOut: ["animated", "fadeOut"],
        dismiss: {
            duration: 3000
        }
    };

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
            store.addNotification({
                ...notification,
                title: 'Error',
                type: 'danger',
                message: 'Get data from url fail ' + props.url
            })
        }
    }

    async function post(props){
        const requestOptions = {
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage['token'] }
        };
        try {
            const result = await axios.post(props.url, props.body, requestOptions);
            return result.data;
        } catch (error) {
            store.addNotification({
                ...notification,
                title: 'Error',
                type: 'danger',
                message: 'Get data from url fail ' + props.url
            })
        }
    }
    return {get: get, post: post};
}();
export default API;