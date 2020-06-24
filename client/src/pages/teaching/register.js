import React, { useState, useEffect } from "react";
import Header from '../../components/header/header';
import Footer from '../../components/footer';

export const RegisterTeaching = () => {
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
                                <div class="card-body">
                                    <div class="form-group">
                                        <label for="inputName">Project Name</label>
                                        <input type="text" id="inputName" class="form-control" />
                                    </div>
                                    <div class="form-group">
                                        <label for="inputDescription">Project Description</label>
                                        <textarea id="inputDescription" class="form-control" rows="4"></textarea>
                                    </div>
                                    <div class="form-group">
                                        <label for="inputStatus">Status</label>
                                        <select class="form-control custom-select">
                                            <option selected disabled>Select one</option>
                                            <option>On Hold</option>
                                            <option>Canceled</option>
                                            <option>Success</option>
                                        </select>
                                    </div>
                                    <div class="form-group">
                                        <label for="inputClientCompany">Client Company</label>
                                        <input type="text" id="inputClientCompany" class="form-control" />
                                    </div>
                                    <div class="form-group">
                                        <label for="inputProjectLeader">Project Leader</label>
                                        <input type="text" id="inputProjectLeader" class="form-control" />
                                    </div>
                                </div>
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
                                <div class="card-body">
                                    <div class="form-group">
                                        <label for="inputEstimatedBudget">Môn dạy</label>
                                        <select class="form-control custom-select" multiple>
                                            <option selected>Toán</option>
                                            <option>Văn</option>
                                            <option>Tiếng Anh</option>
                                            <option>TIn</option>
                                        </select>
                                    </div>
                                    <div class="form-group">
                                        <label for="inputSpentBudget">Lớp dạy</label>
                                        <select class="form-control custom-select" multiple>
                                            <option selected>Lớp 1</option>
                                            <option>Lớp 2</option>
                                        </select>
                                    </div>
                                    <div class="form-group">
                                        <label for="inputEstimatedDuration">Địa chỉ dạy</label>
                                        <input type="number" id="inputEstimatedDuration" class="form-control" />
                                    </div>
                                    <div class="form-group">
                                        <label for="inputEstimatedDuration">Thời gian dạy</label>
                                        <input type="number" id="inputEstimatedDuration" class="form-control" />
                                    </div>
                                    <div class="form-group">
                                        <label for="inputEstimatedDuration">Học phí</label>
                                        <input type="number" id="inputEstimatedDuration" class="form-control" />
                                        <select class="form-control custom-select">
                                            <option selected>Buổi</option>
                                            <option>Giờ</option>
                                            <option>Tháng</option>
                                            <option>Năm</option>
                                        </select>
                                    </div>
                                    <div class="form-group">
                                        <label for="inputDescription">Mô tả thêm</label>
                                        <textarea id="inputDescription" class="form-control" rows="4"></textarea>
                                    </div>
                                </div>
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