import React from "react";
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

    const requestOptions = {
        contentType: 'application/json',
        headers: {
            'Authorization': 'Bearer ' + localStorage['token']
        }
    };

    const get = (url, callBack) => {
        axios.get(url, requestOptions)
            .then(function (response) {
                // store.addNotification({
                //     ...notification,
                //     title: 'Error',
                //     type: 'success',
                //     message: 'Get data ok'
                // })
                callBack(response.data);
            }).catch(function (error) {
                store.addNotification({
                    ...notification,
                    title: 'Error',
                    type: 'danger',
                    message: 'Get data from url fail ' + url
                })
            });
    }
    return {get: get};
}();
export default API;