import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import API from '../../components/api'
import { URL_REGISTER } from '../../constants/path';

export const Register = () => {

    const [name, setName] = useState();
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [passwordConfirm, setPasswordConfirm] = useState();
    const [email, setEmail] = useState();

    const register = async(event) => {
        event.preventDefault();
        try {
            const data = await API.post({ url: URL_REGISTER, 
                body: JSON.stringify({"name": name, "email": email, 
                "username": username, "passwordConfirm": passwordConfirm, "password": password }) });
                Notification.show({
                    title: 'Success',
                    type: 'success',
                    message: 'PLease check email to active account'
                })
            // loginSuccess(data);
        } catch (error) {
            Notification.show({
                title: 'Error',
                type: 'danger',
                message: 'Username or password wrong'
            })
        }
    }

    return (
        <div class="hold-transition register-page">
            <div class="register-box">

                <div class="card">
                    <div class="card-body register-card-body">
                        <h2 class="login-box-msg">Đăng kí thành viên mới</h2>

                        <form onSubmit={register}>
                            <div class="input-group mb-3">
                                <input type="text" class="form-control" placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)} required />
                                <div class="input-group-append">
                                    <div class="input-group-text">
                                        <span class="fas fa-user"></span>
                                    </div>
                                </div>
                            </div>
                            <div class="input-group mb-3">
                                <input type="email" class="form-control" placeholder="Email"  value={email} onChange={(e) => setEmail(e.target.value)} required/>
                                <div class="input-group-append">
                                    <div class="input-group-text">
                                        <span class="fas fa-envelope"></span>
                                    </div>
                                </div>
                            </div>
                            <div class="input-group mb-3">
                                <input type="text" class="form-control" placeholder="Username"  value={username} onChange={(e) => setUsername(e.target.value)} required/>
                                <div class="input-group-append">
                                    <div class="input-group-text">
                                        <span class="fas fa-envelope"></span>
                                    </div>
                                </div>
                            </div>
                            <div class="input-group mb-3">
                                <input type="password" class="form-control" placeholder="Password"  value={password} onChange={(e) => setPassword(e.target.value)} required/>
                                <div class="input-group-append">
                                    <div class="input-group-text">
                                        <span class="fas fa-lock"></span>
                                    </div>
                                </div>
                            </div>
                            <div class="input-group mb-3">
                                <input type="password" class="form-control" placeholder="Retype password"  value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} required/>
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

                        <Link to="login" class="text-center">Tôi đã có tài khoản</Link>
                    </div>
                </div>
            </div>

        </div>
    )
}