import React from "react";

export default function TabInformation() {
    return (
        <div class="card-body">
            <div class="chart tab-pane active" id="revenue-chart">
                <form class="form-horizontal">
                    <div class="form-group row">
                        <label for="inputName" class="col-sm-2 col-form-label">Tên</label>
                        <div class="col-sm-10">
                            <input type="email" class="form-control" id="inputName" placeholder="Name" />
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="inputEmail" class="col-sm-2 col-form-label">Email</label>
                        <div class="col-sm-10">
                            <input type="email" class="form-control" id="inputEmail" placeholder="Email" />
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="inputName2" class="col-sm-2 col-form-label">Phone</label>
                        <div class="col-sm-10">
                            <input type="number" class="form-control" id="inputName2" placeholder="Name" />
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="inputExperience" class="col-sm-2 col-form-label">Năm kinh nghiệm</label>
                        <div class="col-sm-10">

                            <input type="text" class="form-control" id="inputSkills" placeholder="Skills" />
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="inputExperience" class="col-sm-2 col-form-label">Nơi công tác</label>
                        <div class="col-sm-10">
                            <textarea class="form-control" id="inputExperience" placeholder="Experience"></textarea>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="inputSkills" class="col-sm-2 col-form-label">Môn dạy</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" id="inputSkills" placeholder="Skills" />
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="inputSkills" class="col-sm-2 col-form-label">Ngày sinh</label>
                        <div class="col-sm-10">
                            <input type="date" class="form-control" id="inputSkills" placeholder="Skills" />
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="inputSkills" class="col-sm-2 col-form-label">Địa chỉ</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" id="inputSkills" placeholder="Skills" />
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="inputSkills" class="col-sm-2 col-form-label">Mô tả</label>
                        <div class="col-sm-10">
                            <textarea class="form-control" id="inputExperience" placeholder="Experience"></textarea>
                        </div>
                    </div>
                    <div class="form-group row">
                        <div class="offset-sm-2 col-sm-10">
                            <div class="checkbox">
                                <label>
                                    <input type="checkbox" /> I agree to the <a href="#">terms and conditions</a>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="form-group row">
                        <div class="offset-sm-2 col-sm-10">
                            <button type="submit" class="btn btn-danger">Submit</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}