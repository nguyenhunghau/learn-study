import React, { useState, useEffect } from "react";
import Header from '../../components/header/header';
import ClassItem from './class-item';
import { URL_GET_CLASS_LIST, URL_GET_SUBJECT_LIST, URL_GET_UNIT_LIST, URL_GET_LEVEL_LIST } from '../../constants/path';
import API from '../../components/api'
import Address, {findAddress} from '../../components/address'

export const TeachingClass = () => {

    const [classList, setClassList] = useState([{ accountEntity: {} }]);
    const [subjectList, setSubjectList] = useState([]);
    const [unitList, setUnitList] = useState([]);
    const [level, setLevel] = useState([]);
    const [teachingSearch, setTeachingSearch] = useState({});
    let subjectData = [];

    useEffect(() => {
        document.title = "Danh sách các lớp dạy";
        getListData();
    }, []);

    const handleDataClass = (classData, subjectData, levelData) => {
        classData.map(item => {
            let subjectArray = (item.subjectIds || '').split(',');
            item.subjectName = subjectData.filter(subject => subjectArray.indexOf(subject.id + "") >= 0).map(subject => subject.name).join(', ');
            
            let levelArray = (item.levelIds || '').split(',');
            item.level = levelData.filter(levelItem => levelArray.indexOf(levelItem.id + "") >= 0).map(levelItem => levelItem.name).join(', ');
            item.address = findAddress({addressId: item.addressId});
        });
        console.log(classData);
        setClassList(classData);
    }

    const changeTeaching = (value, field) => {
        var teachingNew = {...teachingSearch};
        teachingNew[field] = value;
    }

    async function getListData() {
        try {
            const subjectAPI = API.get({ url: URL_GET_SUBJECT_LIST});
            const unitData = API.get({ url: URL_GET_UNIT_LIST});
            const levelAPI = API.get({ url: URL_GET_LEVEL_LIST });
            const subjectData = await subjectAPI;
            const levelData = await levelAPI;
            setSubjectList(subjectData);
            setUnitList(await unitData);
            setLevel(levelData);
            const classData = await API.get({ url: URL_GET_CLASS_LIST});
            handleDataClass(classData, subjectData, levelData);
        } catch(error) {
            console.log(error);
        }
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
                    <div class="row">
                        <div class="col-md-3">
                            <div class="card card-primary">
                                <div class="card-header">
                                    <h3 class="card-title" style={{ 'font-weight': 'bold', 'text-align': 'center', 'width': '100%' }}>Tìm kiếm</h3>
                                </div>
                                <div class="card-body pb-0">

                                    <form action="../../index3.html" method="post">
                                        <div class="input-group mb-3">
                                            <input type="email" class="form-control" placeholder="Keyword" />
                                            <div class="input-group-append">
                                                <div class="input-group-text">
                                                    <span class="fas fa-envelope"></span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="mb-3">
                                            <Address changeAddress={(addressId) => changeTeaching(addressId, 'addressId')} divClass={'form-group address-item'} value={1002} />
                                        </div>
                                        
                                        <div class="input-group mb-3">
                                            <select class="form-control custom-select">
                                                {
                                                    subjectList.map(item =>
                                                        <option value={item.id}>{item.name}</option>
                                                    )
                                                }
                                                <option>Chọn Môn Học</option>
                                            </select>
                                            <div class="input-group-append">
                                                <div class="input-group-text">
                                                    <span class="fas fa-lock"></span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="input-group mb-3">
                                            <select class="form-control custom-select">
                                                <option>Chọn Level</option>
                                                {
                                                    unitList.map(item =>
                                                        <option value={item.id}>{item.name}</option>
                                                    )
                                                }
                                            </select>
                                            <div class="input-group-append">
                                                <div class="input-group-text">
                                                    <span class="fas fa-lock"></span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="input-group mb-3">
                                            <input type="date" onfocus="(this.type='date')" class="form-control" placeholder="Ngày mở lớp" />
                                            <div class="input-group-append">
                                                <div class="input-group-text">
                                                    <span class="fas fa-lock"></span>
                                                </div>
                                            </div>
                                        </div>
                                    </form>

                                    <div class="social-auth-links text-center mb-3">
                                        <a href="#" class="btn btn-block btn-primary">
                                            <i class="fa fa-search mr-2"></i> Tìm kiếm
        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-9">
                            <div class="card card-solid">
                                <div class="card-body pb-0" id="list-class">
                                    {/* <Skeleton count={10} /> */}
                                    {
                                        classList.map(item =>
                                            <ClassItem data={item} />
                                        )
                                    }

                                    {/* <div class="row d-flex align-items-stretch">
                                        <div class="col-12 col-sm-12 col-md-12 d-flex align-items-stretch">
                                            <div class="card bg-light">
                                                <div class="card-header text-muted border-bottom-0">
                                                    Digital Strategist
                                        </div>
                                                <div class="card-body pt-0">
                                                    <div class="row">
                                                        <div class="col-7">
                                                            <h2 class="lead"><b>Nicole Pearson</b></h2>
                                                            <p class="text-muted text-sm"><b>About: </b> Web Designer / UX / Graphic Artist / Coffee Lover </p>
                                                            <ul class="ml-4 mb-0 fa-ul text-muted">
                                                                <li class="small"><span class="fa-li"><i class="fas fa-lg fa-building"></i></span> Address: Demo Street 123, Demo City 04312, NJ</li>
                                                                <li class="small"><span class="fa-li"><i class="fas fa-lg fa-phone"></i></span> Phone #: + 800 - 12 12 23 52</li>
                                                            </ul>
                                                        </div>
                                                        <div class="col-5 text-center">
                                                            <img src="../../dist/img/user1-128x128.jpg" alt="" class="img-circle img-fluid"></img>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="card-footer">
                                                    <div class="text-right">
                                                        <a href="#" class="btn btn-sm bg-teal">
                                                            <i class="fas fa-comments"></i>
                                                        </a>
                                                        <a href="#" class="btn btn-sm btn-primary">
                                                            <i class="fas fa-user"></i> View Profile
                                                </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div> */}
                                    <div class="card-footer">
                                        <nav aria-label="Contacts Page Navigation">
                                            <ul class="pagination justify-content-center m-0">
                                                <li class="page-item active"><a class="page-link" href="#">1</a></li>
                                                <li class="page-item"><a class="page-link" href="#">2</a></li>
                                                <li class="page-item"><a class="page-link" href="#">3</a></li>
                                                <li class="page-item"><a class="page-link" href="#">4</a></li>
                                                <li class="page-item"><a class="page-link" href="#">5</a></li>
                                                <li class="page-item"><a class="page-link" href="#">6</a></li>
                                                <li class="page-item"><a class="page-link" href="#">7</a></li>
                                                <li class="page-item"><a class="page-link" href="#">8</a></li>
                                            </ul>
                                        </nav>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}