import React, { useState, useEffect } from "react";
import Header from '../../components/header/header';
import Footer from '../../components/footer';
import { Register } from './register'
import { URL_REGISTER } from '../../constants/path';

export default function changePassword() {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    const changePassword = (event) => {
        event.preventDefault();
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