import React from 'react';
import Skeleton from 'react-loading-skeleton';
import './teaching.css';
import { URL_IMAGE } from '../../constants/path';

export default function ClassItem(props) {

    const data = props.data;
    return (
        <div class="row d-flex align-items-stretch">
            <div class="col-12 col-sm-12 col-md-12 d-flex align-items-stretch">
                <div class="card bg-light job-item">
                    <div class="card-header text-muted border-bottom-0">
                        <a href={"detail?id=" + data.id}>{data.title || <Skeleton />}</a>
                    </div>
                    <div class="card-body pt-0">
                        <div class="row">
                            <div class="col-3 text-center">
                                {data.accountEntity.photo? 
                                <img src={`${URL_IMAGE}${data.accountEntity.photo}`} alt="" className={'fluid'}></img>:
                                 <Skeleton height = {200} width = {200}/>}
                                
                            </div>
                            <div class="col-6">
                                <h2 class="lead">{data.accountEntity.name || <Skeleton />}</h2>
                                <p class="text-muted text-sm"><b>Môn dạy: </b> {data.subjectName}</p>
                                <ul class="ml-4 mb-0 fa-ul text-muted">
                                    <li class="small"><span class="fa-li"><i class="fas fa-lg fa-building"></i></span> {data.address ? `Địa chỉ dạy: ${data.address}` : <Skeleton />} </li>
                                    <li class="small"><span class="fa-li"><i class="fas fa-lg fa-phone"></i></span> {data.accountEntity.school ? `Giáo viên trường: ${data.accountEntity.school}` : <Skeleton />}</li>
                                    <li class="small"><span class="fa-li"><i class="fas fa-lg fa-phone"></i></span> {data.level ? `Level: ${data.level}` : <Skeleton />}</li>
                                    <li class="small"><span class="fa-li"><i class="fas fa-lg fa-phone"></i></span> {data.dateStart ? `Ngày mở lớp: ${data.dateStart}` : <Skeleton />}</li>
                                    {/* <li class="small"><span class="fa-li"><i class="fas fa-lg fa-phone"></i></span> {data.accountEntity.experience ? `Kinh nghiệm: ${data.accountEntity.experience}` : <Skeleton />} năm</li> */}
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