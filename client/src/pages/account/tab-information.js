import React, { useState, useEffect } from "react";
import Select from 'react-select';
import { URL_GET_ACCOUNT } from '../../constants/path'
import { getListData } from '../../components/component-function'
import Address from '../../components/address'

export default function TabInformation() {

    const [subjectIds, setSubjectIds] = useState();
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [major, setMajor] = useState('');
    const [school, setSchool] = useState('');
    const [subjectRegisterList, setSubjectRegisterList] = useState('');
    const [birthday, setBirthday] = useState('');
    const [address, setAddress] = useState('');
    const [description, setDescription] = useState('');
    const [cmnd, setCMND] = useState('');

    const [account, setAccount] = useState({});

    useEffect(() => {
        //getListData(URL_GET_ACCOUNT, setAccount);
    }, []);

    const options =
        [
            {
                value: 'foo', label: 'Foo'
            },
            {
                value: 'bar', label: 'Bar'
            },
            {
                value: 'baz', label: 'Baz'
            }
        ];

    const handleChange = (e) => {
        console.log(`Option selected:`, e.map(item => item.value).join())
    }

    return (
        <div class="card-body">
            <div class="chart tab-pane active" id="revenue-chart">
                <form class="form-horizontal">
                    <div class="form-group row">
                        <label for="inputName" class="col-sm-2 col-form-label">Tên <span style={{'color':'red'}}>*</span></label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" id="inputName" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="inputEmail" class="col-sm-2 col-form-label">Giới Tính <span style={{'color':'red'}}>*</span></label>
                        <div class="col-sm-10 row" style={{"margin-top": "7px"}}>
                            <div class="col-sm-3">
                                <input type="radio" checked="true" value="1" name="gioitinh" />Nam
                        </div>
                            <div class="col-sm-3">
                                <input type="radio" value="0" name="gioitinh" />Nữ
                        </div>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="inputEmail" class="col-sm-2 col-form-label">Email <span style={{'color':'red'}}>*</span></label>
                        <div class="col-sm-10">
                            <input type="email" class="form-control" id="inputEmail" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="inputName2" class="col-sm-2 col-form-label">Số điện thoại <span style={{'color':'red'}}>*</span></label>
                        <div class="col-sm-10">
                            <input type="number" class="form-control" id="inputName2" placeholder="012345678" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="inputName2" class="col-sm-2 col-form-label">Ảnh thẻ <span style={{'color':'red'}}>*</span></label>
                        <div class="col-sm-10">
                            <input type="file" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="inputName2" class="col-sm-2 col-form-label">Bằng cấp</label>
                        <div class="col-sm-10">
                            <input type="file" value={phone} onChange={(e) => setPhone(e.target.value)} />
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="inputSkills" class="col-sm-2 col-form-label">Môn dạy <span style={{'color':'red'}}>*</span></label>
                        <div class="col-sm-10">
                            {/* <select class="form-control custom-select" value={subjectRegisterList} onChange={(e) => setSubjectRegisterList(e.target.value)} required>
                                {
                                    subjectList.map(item =>
                                        <option value={item.id}>{item.name}</option>
                                    )
                                }
                                <option>Chọn Môn Học</option>
                            </select> */}
                            <Select placeholder="Chọn Môn Dạy"
                                isMulti={true}
                                value={subjectIds}
                                onChange={handleChange}
                                options={options}
                            />
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="inputSkills" class="col-sm-2 col-form-label">Ngày sinh <span style={{'color':'red'}}>*</span></label>
                        <div class="col-sm-10">
                            <input type="date" class="form-control" placeholder="Ngày Sinh" value={birthday} onChange={(e) => setBirthday(e.target.value)} required />
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="inputSkills" class="col-sm-2 col-form-label">CMND <span style={{'color':'red'}}>*</span></label>
                        <div class="col-sm-10">
                            <input type="number" class="form-control" placeholder="241468211" value={cmnd} onChange={(e) => setCMND(e.target.value)} required />
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="inputSkills" class="col-sm-2 col-form-label">Địa chỉ <span style={{'color':'red'}}>*</span></label>
                        <div class="col-sm-10">
                            <Address />
                            {/* <input type="text" class="form-control" placeholder="Địa chỉ" value={address} onChange={(e) => setAddress(e.target.value)} required /> */}
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="inputSkills" class="col-sm-2 col-form-label">Học trường <span style={{'color':'red'}}>*</span></label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" placeholder="Đại Học Sư Phạm" value={school} onChange={(e) => setSchool(e.target.value)} required />
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="inputSkills" class="col-sm-2 col-form-label">Chuyên nghành <span style={{'color':'red'}}>*</span></label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" placeholder="Giáo viên tiếng anh..." value={major} onChange={(e) => setMajor(e.target.value)} required />
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="inputSkills" class="col-sm-2 col-form-label">Mô tả</label>
                        <div class="col-sm-10">
                            <textarea class="form-control" id="inputExperience" placeholder="Mô tả" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                        </div>
                    </div>
                    <div class="form-group row">
                        <div class="offset-sm-2 col-sm-10">
                            <button type="submit" class="btn btn-danger">Cập Nhật</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}