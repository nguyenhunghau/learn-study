import React from 'react';
import styles from './teaching.css';
import {URL_IMAGE} from '../../constants/path';

export default function ClassItem(props) {

    const data = props.data;
    return (
        <div class="row d-flex align-items-stretch">
            <div class="col-12 col-sm-12 col-md-12 d-flex align-items-stretch">
                <div class="card bg-light job-item">
                    <div class="card-header text-muted border-bottom-0">
                        <a href={"detail?id=" + data.id}>{data.title}</a>
                    </div>
                    <div class="card-body pt-0">
                        <div class="row">
                            <div class="col-3 text-center">
                                <img src={URL_IMAGE + data.accountEntity.photo} alt="" className={styles.fluid}></img>
                            </div>
                            <div class="col-6">
                                <h2 class="lead">{data.accountEntity.name}</h2>
                                <p class="text-muted text-sm"><b>Môn dạy: </b> {data.subjectName}</p>
                                <ul class="ml-4 mb-0 fa-ul text-muted">
                                    <li class="small"><span class="fa-li"><i class="fas fa-lg fa-building"></i></span> Địa chỉ dạy: {data.address}</li>
                                    <li class="small"><span class="fa-li"><i class="fas fa-lg fa-phone"></i></span> Giáo viên trường: {data.accountEntity.school}</li>
                                    <li class="small"><span class="fa-li"><i class="fas fa-lg fa-phone"></i></span> Level: {data.level}</li>
                                    <li class="small"><span class="fa-li"><i class="fas fa-lg fa-phone"></i></span> Ngày mở lớp: {data.dateStart}</li>
                                    <li class="small"><span class="fa-li"><i class="fas fa-lg fa-phone"></i></span> Kinh nghiệm: {data.accountEntity.experience} năm</li>
                                </ul>
                            </div>
                            <div class="col-3">
                                <div class="text-right">
                                    <a href="#" class="btn btn-sm bg-teal">
                                        <i class="fas fa-comments"></i> Chat
                                                        </a>
                                    <a href="#" class="btn btn-sm btn-primary">
                                        <i class="fas fa-user"></i> View Profile
                                                </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}