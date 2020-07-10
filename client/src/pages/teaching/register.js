import React, { useState, useEffect, useRef } from "react";
import Header from '../../components/header/header';
import Footer from '../../components/footer';
import TabInformation from '../account/tab-information';
import RegisterItem from './register-item';
import API from '../../components/api'
import { getCode } from '../../components/component-function'
import { URL_GET_ACCOUNT, URL_ADD_TEACHING } from '../../constants/path'

export const RegisterTeaching = (props) => {
    const [account, setAccount] = useState({ addressId: '35' });
    const [teaching, setTeaching] = useState({ numPeriod: 3, addressId: '35', unitEntity: { id: 1 } });
    const info = useRef(null);

    const changeTeaching = async (data) => {
        setTeaching(data);
        console.log(data)
    }

    const addTeaching = async () => {
        try {
            if (getCode()) {
                teaching['accountEntity'] = { code: getCode() };
            }
            console.log(teaching);
            const data = await API.post({ url: URL_ADD_TEACHING, body: JSON.stringify(teaching) });
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        document.title = "Đăng kí lớp dạy";
        getAccount();
    }, []);
    const getAccount = async () => {
        const data = await API.get({ url: URL_GET_ACCOUNT + (props.match.params.code || getCode()) });
        setAccount(data);
    }

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
                    <form onSubmit={addTeaching}>
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
                                    {account.name ? <TabInformation changeAccount={setAccount} account={account} /> : ''}
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
                                    <RegisterItem changeTeaching={changeTeaching} teaching={teaching} />
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-12">
                                <input type="submit" value="Tạo lớp mới" class="btn btn-success float-right" />
                            </div>
                        </div>
                    </form>
                </section>
                <div />
            </div>
            <Footer />
        </div>
    )
}