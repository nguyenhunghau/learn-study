import React, { useState, useEffect } from "react";
import Header from '../../components/header/header';
import Footer from '../../components/footer';
import { Register } from './register'


import React, { useState } from 'react';
import { URL_REGISTER } from '../../constants/path';

export default function RegisterPage() {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    const registerAccount = (event) => {
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
                <div class="hold-transition register-page">
                    <div class="register-box">
                        <div class="register-logo">
                            <a href="../../index2.html"><b>Admin</b>LTE</a>
                        </div>

                        <div class="card">
                            <div class="card-body register-card-body">
                                <p class="login-box-msg">Register a new membership</p>

                                <form onSubmit={registerAccount} method="post">
                                    <div class="input-group mb-3">
                                        <input type="text" class="form-control" placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)} required />
                                        <div class="input-group-append">
                                            <div class="input-group-text">
                                                <span class="fas fa-signature"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="input-group mb-3">
                                        <input type="email" class="form-control" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                                        <div class="input-group-append">
                                            <div class="input-group-text">
                                                <span class="fas fa-envelope"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="input-group mb-3">
                                        <input type="text" class="form-control" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                                        <div class="input-group-append">
                                            <div class="input-group-text">
                                                <span class="fas fa-user"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="input-group mb-3">
                                        <input type="password" class="form-control" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                                        <div class="input-group-append">
                                            <div class="input-group-text">
                                                <span class="fas fa-lock"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="input-group mb-3">
                                        <input type="password" class="form-control" placeholder="Retype password" value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} required />
                                        <div class="input-group-append">
                                            <div class="input-group-text">
                                                <span class="fas fa-lock"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-8">
                                            <div class="icheck-primary">
                                                <input type="checkbox" id="agreeTerms" name="terms" value="agree" />
                                                <label for="agreeTerms">
                                                    I agree to the <a href="#">terms</a>
                                                </label>
                                            </div>
                                        </div>
                                        <div class="col-4">
                                            <button type="submit" class="btn btn-primary btn-block">Register</button>
                                        </div>
                                    </div>
                                </form>

                                <div class="social-auth-links text-center">
                                    <p>- OR -</p>
                                    <a href="#" class="btn btn-block btn-primary">
                                        <i class="fab fa-facebook mr-2"></i>
          Sign up using Facebook
        </a>
                                    <a href="#" class="btn btn-block btn-danger">
                                        <i class="fab fa-google-plus mr-2"></i>
          Sign up using Google+
        </a>
                                </div>

                                <a href="login.html" class="text-center">I already have a membership</a>
                            </div>
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
        </div>
    )
}