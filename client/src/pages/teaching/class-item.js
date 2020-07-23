import React, { useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import styles from './teaching.module.css';
import { URL_IMAGE } from '../../constants/path';
import { Link } from "react-router-dom";
import { makeClassCode } from '../../components/component-function'
import { URL_GET_ACCOUNT } from '../../constants/path'
import API from '../../components/api';

export default function ClassItem(props) {

    const data = props.data;
    const [edit, setEdit] = useState(<a href="#" class="btn btn-sm bg-teal mr--10">
        <i class="fas fa-comments"></i>Trò chuyện
                                    </a>);
    useEffect(() => {
        if (data.accountEntity && data.accountEntity.code) {
            checkPermission();
        }
    }, [data]);

    const checkPermission = async () => {
        try {
            const account = await API.get({ url: URL_GET_ACCOUNT + data.accountEntity.code });
            if (!account.username) {
                return;
            }
            setEdit(<Link to={"/teaching-register?code=" + makeClassCode(data.id, data.title)} class="btn btn-sm bg-teal mr--10">
                        <i class="fas fa-edit"></i>Chỉnh sửa
                    </Link>);
        } catch (error) {
            console.log(error);
        }
        return;
    };

    return (
        <div class="row d-flex align-items-stretch">
            <div class="col-12 col-sm-12 col-md-12 d-flex align-items-stretch">
                <div class="card bg-light job-item">
                    <div className={`card-header text-muted border-bottom-0 ${styles.title_teaching}`}>
                        <a href={"detail?id=" + data.id}>{data.title || <Skeleton />}</a>
                    </div>
                    <div class="card-body pt-0">
                        <div class="row">
                            <div class="col-2 text-center">
                                {data.accountEntity && data.accountEntity.photo ?
                                    <img src={`${URL_IMAGE}${data.accountEntity.photo}`} alt="" className={styles.fluid}></img> :
                                    <Skeleton height={200} width={200} />}

                            </div>
                            <div class="col-6">
                                <h2 class="lead name-teaching">{data.accountEntity.name || <Skeleton />}</h2>
                                <p class="text-muted text-sm"><b>Môn dạy: </b> {data.subjectEntity && data.subjectEntity.name}</p>
                                <ul class="ml-4 mb-0 fa-ul text-muted">
                                    <li class="small"><span class="fa-li"><i class="fas fa-map-marker-alt text-danger"></i></span><b>Địa chỉ dạy: </b> {data.address ? `${data.address}` : <Skeleton />} </li>
                                    <li class="small"><span class="fa-li"><i class="fas fa-school text-danger"></i></span><b>Giáo viên trường: </b> {data.accountEntity.school ? `${data.accountEntity.school}` : <Skeleton />}</li>
                                    <li class="small"><span class="fa-li"><i class="fas fa-level-up-alt text-danger"></i></span><b>Lớp dạy: </b> {data.level ? `${data.level}` : <Skeleton />}</li>
                                    <li class="small"><span class="fa-li"><i class="far fa-calendar text-danger"></i></span><b>Ngày mở lớp: </b> {data.dateStart ? `${data.dateStart}` : <Skeleton />}</li>
                                    {/* <li class="small"><span class="fa-li"><i class="fas fa-lg fa-phone"></i></span> {data.accountEntity.experience ? `Kinh nghiệm: ${data.accountEntity.experience}` : <Skeleton />} năm</li> */}
                                </ul>
                            </div>
                            <div class="col-3">
                                <div class="text-right">
                                    {edit}
                                    <Link to={`/profile/${data.accountEntity.code}`} class="btn btn-sm btn-primary">
                                        <i class="fas fa-user"></i> Xem trang cá nhân
                                                </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}