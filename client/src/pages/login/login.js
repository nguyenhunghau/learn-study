import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import API from '../../components/api'
import { URL_LOGIN } from '../../constants/path';
import { useHistory } from 'react-router-dom';
import { createCookie } from '../../components/component-function';
import Notification from '../../components/notifycation';

export const Login = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    const loginSuccess = (data) => {
        createCookie('token', data.token, 1000);
        localStorage['token'] = data.token;
        localStorage['username'] = username;
        localStorage['code'] = data.code;
        history.push("/");
    }

    async function onSubmit(event) {
        event.preventDefault();
        try {
            const data = await API.post({ url: URL_LOGIN, body: JSON.stringify({ "username": username, "password": password })});
            loginSuccess(data);
        } catch (error) {
            Notification.show({
                title: 'Error',
                type: 'danger',
                message: 'Username or password wrong'
            })
        }
    }

    return (
        <div class="login-page">
            <div class="login-box">
                <div class="card">
                    <div class="card-body login-card-body">
                        <h2 class="login-box-msg">Đăng nhập</h2>

                        <form onSubmit={onSubmit} method="post">
                            <div class="input-group mb-3">
                                <input type="text" class="form-control" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                                <div class="input-group-append">
                                    <div class="input-group-text">
                                        <span class="fas fa-user"></span>
                                    </div>
                                </div>
                            </div>
                            <div class="input-group mb-3">
                                <input type="password" class="form-control" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
                                <div class="input-group-append">
                                    <div class="input-group-text">
                                        <span class="fas fa-lock"></span>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-8">
                                    <div class="icheck-primary">
                                        <input type="checkbox" id="remember" />
                                        <label for="remember">
                                            Remember Me
                                    </label>
                                    </div>
                                </div>
                                <div class="col-4">
                                    <button type="submit" class="btn btn-primary btn-block">Sign In</button>
                                </div>
                            </div>
                        </form>

                        <div class="social-auth-links text-center mb-3">
                            <a href="#" class="btn btn-block btn-primary">
                                <i class="fab fa-facebook mr-2"></i> Sign in using Facebook
        </a>
                            <a href="#" class="btn btn-block btn-danger">
                                <i class="fab fa-google-plus mr-2"></i> Sign in using Google+
        </a>
                        </div>

                        <p class="mb-1">
                            <Link to="forgot-password">Quên mật khẩu</Link>
                        </p>
                        <p class="mb-0">
                            <Link to="register" class="text-center">Đăng kí thành viên mới</Link>
                        </p>
                    </div>
                </div>

            </div>
        </div>
    )
}