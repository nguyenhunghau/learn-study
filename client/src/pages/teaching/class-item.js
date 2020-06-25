import React from 'react';

export default function ClassItem (props) {

    return (
        <div class="row d-flex align-items-stretch">
            <div class="col-12 col-sm-12 col-md-12 d-flex align-items-stretch">
                <div class="card bg-light job-item">
                    <div class="card-header text-muted border-bottom-0">
                        Title: cần mở lớp dạy gấp
                                        </div>
                    <div class="card-body pt-0">
                        <div class="row">
                            <div class="col-4 text-center">
                                <img alt="" class="img-circle img-fluid"></img>
                            </div>
                            <div class="col-8">
                                <h2 class="lead">Nguyễn Hùng Hậu</h2>
                                <p class="text-muted text-sm"><b>Môn dạy: </b> Tiếng Anh</p>
                                <ul class="ml-4 mb-0 fa-ul text-muted">
                                    <li class="small"><span class="fa-li"><i class="fas fa-lg fa-building"></i></span> Địa chỉ dạy: Bình Thạnh, TPHCM</li>
                                    <li class="small"><span class="fa-li"><i class="fas fa-lg fa-phone"></i></span> Giáo viên trường: THCS Hòa Phú</li>
                                    <li class="small"><span class="fa-li"><i class="fas fa-lg fa-phone"></i></span> Level: lớp 6 -8, luyện thi</li>
                                    <li class="small"><span class="fa-li"><i class="fas fa-lg fa-phone"></i></span> Ngày mở lớp: 2020/05/13</li>
                                    <li class="small"><span class="fa-li"><i class="fas fa-lg fa-phone"></i></span> Kinh nghiệm: 2 năm</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="card-footer">
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
    )
}