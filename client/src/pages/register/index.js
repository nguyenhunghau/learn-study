import React, { useState, useEffect } from "react";
import Header from '../../components/header/header';
import Footer from '../../components/footer';
import { Register } from './register'
import { URL_REGISTER } from '../../constants/path';

export default function RegisterPage() {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    const registerAccount = (event) => {
        event.preventDefault();
        const re = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,32}$/g);
        const isOk = re.test(password);
        if(!isOk) {
            Notification.show({
                title: 'Error',
                type: 'danger',
                message: 'Mật khẩu phải bao gồm kí tự thường, kí tự hoa và số'
            })
            return;
        }
        if(password !== passwordConfirm) {
            Notification.show({
                title: 'Error',
                type: 'danger',
                message: 'Mật khẩu xác nhận không khớp'
            })
            return;
        }

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ "username": username, "password": password, "name": name, "email": email, "passwordConfirm": passwordConfirm })
        };

        fetch(URL_REGISTER, requestOptions)
            .then(response => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response.json();
            })
            .then(data => {
                window.location.href = "login";
            }).catch(function (error) {
                alert('Register fail');
            });
    }


    return (
        <div className={'wrapper'}>
            <Header />
            <div class="content-wrapper">
                <section class="content">
                    <Register />
                </section>
            </div>
            <Footer />
        </div>
    )
}