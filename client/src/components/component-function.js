import React from "react";

export const createCookie = (name, value, hour) => {
    var expires = "";
    if (hour) {
        var date = new Date();
        date.setTime(date.getTime() + (hour * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
    }
    document.cookie = name + "=" + value + expires + ";path=/";
}

export const removeCookie = (name) => {
    createCookie(name, "", -1);
}

export const readCookie = (name) => {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ')
            c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0)
            return c.substring(nameEQ.length, c.length);
    }
    return null;
}

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

export const getListData = (url, callBack) => {
    

    // fetch(url, requestOptions)
    //     .then(response => {
    //         if (!response.ok) {
    //             throw Error(response.statusText);
    //         }
    //         return response.json();
    //     })
    //     .then(data => {
    //         callBack(data);
    //     }).catch(function (error) {
    //         NotificationManager.error('Get data from url fail ' + url, 'Error!');
    //     });
    
}

export const checkPermission = () => {
    return localStorage[''];
}

export const getCode = () => {
    return localStorage['code'];
}

export const getToken = () => {
    return localStorage['token'];
}