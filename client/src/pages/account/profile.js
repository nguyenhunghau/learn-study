import React, { useState, useEffect } from "react";
import Header from '../../components/header/header';
import TabInformation from './tab-information';
import TabActivity from './tab-activity';
import TabTimeline from './tab-timeline';
import { Tab, Tabs } from "react-bootstrap";
import userLogo from '../../components/img/avatar.png';
import { URL_IMAGE } from '../../constants/path';
import { URL_GET_ACCOUNT, UPDATE_ACCOUNT } from '../../constants/path'
import API from '../../components/api'

export const Profile = () => {
    const [logo, setLogo] = useState(userLogo);
    const [account, setAccount] = useState({addressId: '35'});

    // const changeImage = (newLogo) => {
    //     setLogo(`${URL_IMAGE}${newLogo}`);
    // }

    useEffect(() => {
        API.get({ url: URL_GET_ACCOUNT + localStorage['username'], callBack: setAccount });
    }, []);

    return (
        <div className={'wrapper'}>
            <Header />
            <div class="content-wrapper">
                <section class="content-header">
                    <div class="container-fluid">
                        <div class="row mb-2">
                            <div class="col-sm-6">
                                <h1>Profile</h1>
                            </div>
                            <div class="col-sm-6">
                                <ol class="breadcrumb float-sm-right">
                                    <li class="breadcrumb-item"><a href="#">Home</a></li>
                                    <li class="breadcrumb-item active">User Profile</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </section>

                <section class="content">
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-md-3">

                                <div class="card card-primary card-outline">
                                    <div class="card-body box-profile">
                                        <div class="text-center">
                                            <img class="profile-user-img img-fluid img-circle"
                                                src={`${URL_IMAGE}${account.photo}`}
                                                alt="User profile picture" />
                                        </div>

                                        <h3 class="profile-username text-center">Nguyen Hung Hau</h3>
                                        <ul class="list-group list-group-unbordered mb-3">
                                            <li class="list-group-item">
                                                <b>Số lớp đã tạo</b> <a class="float-right">1,322</a>
                                            </li>
                                            <li class="list-group-item">
                                                <b>Đánh giá</b> <a class="float-right">543</a>
                                            </li>
                                        </ul>

                                        <a href="#" class="btn btn-primary btn-block"><b>Follow</b></a>
                                    </div>
                                </div>

                                <div class="card card-primary">
                                    <div class="card-header">
                                        <h3 class="card-title">About Me</h3>
                                    </div>
                                    <div class="card-body">
                                        <strong><i class="fas fa-book mr-1"></i> Education</strong>

                                        <p class="text-muted">
                                            B.S. in Computer Science from the University of Tennessee at Knoxville
                                        </p>

                                        <hr />

                                        <strong><i class="fas fa-map-marker-alt mr-1"></i> Location</strong>

                                        <p class="text-muted">Malibu, California</p>

                                        <hr />

                                        <strong><i class="fas fa-pencil-alt mr-1"></i> Skills</strong>

                                        <p class="text-muted">
                                            <span class="tag tag-danger">UI Design</span>
                                            <span class="tag tag-success">Coding</span>
                                            <span class="tag tag-info">Javascript</span>
                                            <span class="tag tag-warning">PHP</span>
                                            <span class="tag tag-primary">Node.js</span>
                                        </p>

                                        <hr />

                                        <strong><i class="far fa-file-alt mr-1"></i> Notes</strong>

                                        <p class="text-muted">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam fermentum enim neque.</p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-9">
                                <div class="card" id="tab_profile">
                                    <Tabs defaultActiveKey="Profile" id="uncontrolled-tab-example">
                                        <Tab eventKey="Profile" title="Profile">
                                            {account.name? <TabInformation changeAccount={setAccount} account={account}/>: ''}
                                        </Tab>
                                        <Tab eventKey="Activity" title="Activity">
                                            <TabActivity />
                                        </Tab>
                                        <Tab eventKey="Timeline" title="Timeline">
                                            <TabTimeline />
                                        </Tab>
                                    </Tabs>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}