import React, { useState, useEffect } from "react";
import Header from '../../components/header/header';
import ClassItem from './class-item';
import { URL_GET_CLASS_LIST, URL_GET_SUBJECT_LIST, URL_GET_UNIT_LIST, URL_GET_LEVEL_LIST } from '../../constants/path';
import API from '../../components/api'
import Address, { findAddress } from '../../components/address'
import Select from 'react-select';

export const TeachingClass = () => {

    const [classList, setClassList] = useState([{ accountEntity: {} }]);
    const [subjectList, setSubjectList] = useState([]);
    const [unitList, setUnitList] = useState([]);
    const [level, setLevel] = useState([]);
    const [teachingSearch, setTeachingSearch] = useState({});

    const [subjectValue, setSubjectValue] = useState();
    const [subjectOptions, setSubjectOptions] = useState();
    const [levelOptions, setLevelOptions] = useState(); 
    const [levelValue, setLevelValue] = useState();
    let subjectData = [];
    const [pageArray, setPageArray] = useState([]);

    //Pagination
    const NUM_ITEM = 2;
    const [pageIndex, setPageIndex] = useState(0);

    useEffect(() => {
        document.title = "Danh sách các lớp dạy";
        createPagination();
        getListData();
    }, []);

    const createPagination = () => {
        var array = [];
        for(var i = 0; i < 5; i++) {
            array.push(i);
            // const activeClass = i == pageIndex? 'active': '';
            // array.push(<li className={`page-item ${activeClass}`} onClick={() => changePage(i)}><a class="page-link" href="#">{i + 1}</a></li>);
        }
        setPageArray(array);
    }

    const changePage = async(pageIndex) => {
        setPageIndex(pageIndex);
        const classData = await API.post({ url: URL_GET_CLASS_LIST, body: {...teachingSearch, pageIndex: pageIndex, numItem: NUM_ITEM}});
        handleDataClass(classData, subjectList, level);
    }

    const handleDataClass = (classData, subjectData, levelData) => {
        classData.map(item => {
            let subjectArray = (item.subjectIds || '').split(',');
            item.subjectName = subjectData.filter(subject => subjectArray.indexOf(subject.id + "") >= 0).map(subject => subject.name).join(', ');

            let levelArray = (item.levelIds || '').split(',');
            item.level = levelData.filter(levelItem => levelArray.indexOf(levelItem.id + "") >= 0).map(levelItem => levelItem.name).join(', ');
            item.address = findAddress({ addressId: item.addressId });
        });
        console.log(classData);
        setClassList(classData);
    }

    const changeTeaching = (value, field) => {
        var teachingNew = { ...teachingSearch };
        if (Array.isArray(value)) {
            teachingNew[field] = value.map(item => item.value).join(',');
            setTeachingSearch(teachingNew);
            return;
        }
        
        teachingNew[field] = value;
        setTeachingSearch(teachingNew);
    }

    async function getListData() {
        try {
            const subjectAPI = API.get({ url: URL_GET_SUBJECT_LIST });
            const unitData = API.get({ url: URL_GET_UNIT_LIST });
            const levelAPI = API.get({ url: URL_GET_LEVEL_LIST });
            const subjectData = await subjectAPI;
            const levelData = await levelAPI;
            setSubjectList(subjectData);
            setUnitList(await unitData);
            setLevel(levelData);

            setSubjectOptions(createOptionSelect(subjectData));
            const classData = await API.post({ url: URL_GET_CLASS_LIST, body: {pageIndex: pageIndex, numItem: NUM_ITEM}});
            handleDataClass(classData, subjectData, levelData);
        } catch (error) {
            console.log(error);
        }
    }

    const createOptionSelect = (data) => {
        let result = [];
        data.map(item => {
            result.push({
                value: item.id, label: item.name
            });
        })
        return result;
    }

    const searchClass = async() => {
        const classData = await API.post({ url: URL_GET_CLASS_LIST, body: teachingSearch});
        handleDataClass(classData, subjectList, level);
        setPageIndex(0);
    };

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
                                            <input type="email" value={teachingSearch.keyword} onChange={(e) => { changeTeaching(e.target.value, 'keyword') }} class="form-control" placeholder="Keyword" />
                                        </div>
                                        <div class="mb-3">
                                            <Address changeAddress={(addressId) => changeTeaching(addressId, 'addressId')} divClass={'form-group address-item'} value={1002} />
                                        </div>

                                        <div class="input-group mb-3 search-teaching">
                                            <Select placeholder="Chọn Môn Học"
                                                isMulti
                                                value={subjectValue}
                                                onChange={(subjectItem) => { setSubjectValue(subjectItem); changeTeaching(subjectItem, 'subjectIds') }}
                                                options={subjectOptions}
                                            />
                                        </div>
                                        <div class="input-group mb-3 search-teaching">
                                            <Select placeholder="Chọn lớp"
                                                isMulti
                                                value={levelValue}
                                                onChange={(levelItem) => { setLevelValue(levelItem); changeTeaching(levelItem, 'levelIds') }}
                                                options={levelOptions}
                                            />
                                        </div>
                                        <div class="input-group mb-3">
                                            <input type="date" value={teachingSearch.dateFrom}  onChange={(e) => { changeTeaching(e.target.value, 'dateFrom') }} onfocus="(this.type='date')" class="form-control" placeholder="Ngày mở lớp" />
                                            <input type="date" value={teachingSearch.dateTo}  onChange={(e) => { changeTeaching(e.target.value, 'dateTo') }} onfocus="(this.type='date')" class="form-control" placeholder="Ngày mở lớp" />
                                        </div>
                                    </form>

                                    <div class="social-auth-links text-center mb-3">
                                        <button class="btn btn-block btn-primary" onClick={searchClass}>
                                            <i class="fa fa-search mr-2"></i> Tìm kiếm
                                        </button>
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
                                                {
                                                    pageArray.map((key, index) => 
                                                        {
                                                            const activeClass = index == pageIndex? 'active': '';
                                                            return <li className={`page-item ${activeClass}`} onClick={() => changePage(index)}><a class="page-link">{index + 1}</a></li>;
                                                        }
                                                    )
                                                }
                                                {/* <li class="page-item active"><a class="page-link" href="#">1</a></li>
                                                <li class="page-item"><a class="page-link" href="#">2</a></li>
                                                <li class="page-item"><a class="page-link" href="#">3</a></li>
                                                <li class="page-item"><a class="page-link" href="#">4</a></li>
                                                <li class="page-item"><a class="page-link" href="#">5</a></li>
                                                <li class="page-item"><a class="page-link" href="#">6</a></li>
                                                <li class="page-item"><a class="page-link" href="#">7</a></li>
                                                <li class="page-item"><a class="page-link" href="#">8</a></li> */}
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