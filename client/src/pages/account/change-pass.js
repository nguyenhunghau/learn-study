import React, { useState, useEffect } from "react";
import Header from '../../components/header/header';
import Footer from '../../components/footer';
import { URL_CHANGE_PASSWORD } from '../../constants/path';
import { Link } from "react-router-dom";
import Notification from '../../components/notifycation';
import API from '../../components/api'

class ChangePassword extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            oldPass: '',
            newPass: '',
            confirmPass: ''
        }
    }

    handleSubmit = async(event) => {
        event.preventDefault();
        const re = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,32}$/g);
        const isOk = re.test(this.state.newPass);
        if(!isOk) {
            Notification.show({
                title: 'Error',
                type: 'danger',
                message: 'Mật khẩu phải bao gồm kí tự thường, kí tự hoa và số'
            })
            return;
        }
        if(this.state.newPass !== this.state.confirmPass) {
            Notification.show({
                title: 'Error',
                type: 'danger',
                message: 'Mật khẩu xác nhận không khớp'
            })
            return;
        }
        try {
            const data = await API.post({ url: URL_CHANGE_PASSWORD, body: 
                JSON.stringify({password: this.state.oldPass, passwordConfirm: this.state.newPass}) });
            alert(data);
        } catch (error) {

        }
    }

    render() {
        return (
            <div class="login-page" >
                <div class="login-box">
                    <div class="card">
                        <div class="card-body login-card-body">
                            <h2 class="login-box-msg">Đổi mật khẩu</h2>

                            <form onSubmit={this.handleSubmit}>
                                <div class="input-group mb-3">
                                    <input type="password" class="form-control" placeholder="Mật khẩu cũ" value={this.state.oldPass} onChange={e => this.setState({ oldPass: e.target.value })} required />
                                    <div class="input-group-append">
                                        <div class="input-group-text">
                                            <span class="fas fa-lock"></span>
                                        </div>
                                    </div>
                                </div>
                                <div class="input-group mb-3">
                                    <input type="password" class="form-control" placeholder="Mật khẩu mới" value={this.state.newPass} onChange={e => this.setState({ newPass: e.target.value })} required />
                                    <div class="input-group-append">
                                        <div class="input-group-text">
                                            <span class="fas fa-lock"></span>
                                        </div>
                                    </div>
                                </div>
                                <div class="input-group mb-3">
                                    <input type="password" class="form-control" placeholder="Xác nhận Mật khẩu" value={this.state.confirmPass} onChange={e => this.setState({ confirmPass: e.target.value })} required />
                                    <div class="input-group-append">
                                        <div class="input-group-text">
                                            <span class="fas fa-lock"></span>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-12">
                                        <button type="submit" class="btn btn-primary btn-block">Đổi mật khẩu</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>

                </div>
            </div >
        );
    }
}
export default ChangePassword;