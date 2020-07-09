import React, { useState, useEffect } from "react";
import Header from '../../components/header/header';
import Footer from '../../components/footer';
import TabInformation from '../account/tab-information';
import RegisterItem from './register-item';
import API from '../../components/api'
import { getCode } from '../../components/component-function'
import { URL_GET_ACCOUNT } from '../../constants/path'

export const RegisterTeaching = (props) => {
    const [account, setAccount] = useState({ addressId: '35' });
    const getAccount = async () => {
        const data = await API.get({ url: URL_GET_ACCOUNT + (props.match.params.code || getCode()) });
        setAccount(data);
    }

    useEffect(() => {
        getAccount();
    })
    return (
        <div className={'wrapper'}>
            <Header />
            <div class="content-wrapper">
                <section class="content-header">
                    <div class="container-fluid">
                        <div class="row mb-2">
                            <div class="col-sm-6">
                                <h1>Contacts</h1>
                            </div>
                            <div class="col-sm-6">
                                <ol class="breadcrumb float-sm-right">
                                    <li class="breadcrumb-item"><a href="#">Home</a></li>
                                    <li class="breadcrumb-item active">Contacts</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </section>

                <section class="content">
                    <div class="row">
                        <div class="col-md-6">
                            <div class="card card-primary">
                                <div class="card-header">
                                    <h3 class="card-title">Thông tin cá nhân</h3>

                                    <div class="card-tools">
                                        <button type="button" class="btn btn-tool" data-card-widget="collapse" data-toggle="tooltip" title="Collapse">
                                            <i class="fas fa-minus"></i></button>
                                    </div>
                                </div>
                                <TabInformation  changeAccount={setAccount} account={account}/>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="card card-secondary">
                                <div class="card-header">
                                    <h3 class="card-title">Lớp dạy</h3>

                                    <div class="card-tools">
                                        <button type="button" class="btn btn-tool" data-card-widget="collapse" data-toggle="tooltip" title="Collapse">
                                            <i class="fas fa-minus"></i></button>
                                    </div>
                                </div>
                                <RegisterItem />
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12">
                            <a href="#" class="btn btn-secondary">Cancel</a>
                            <input type="submit" value="Tạo lớp mới" class="btn btn-success float-right" />
                        </div>
                    </div>
                </section>
                <div />
            </div>
            <Footer />
        </div>
    )
}