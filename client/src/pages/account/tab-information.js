import React, { useState, useEffect } from "react";
import Select from 'react-select';
import { URL_GET_ACCOUNT, UPDATE_ACCOUNT } from '../../constants/path'
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
    const [certificate, setCertificate] = useState();
    const [gender, setGender] = useState();
    const [photo, setPhoto] = useState();

    useEffect(() => {
        getListData(URL_GET_ACCOUNT + localStorage['username'], setAccount);
    }, []);

    const handleChange = (e) => {
        console.log(`Option selected:`, e.map(item => item.value).join())
    }

    const updateProfile = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('file', account.photo);

        const requestOptions = {
            method: 'POST',
            headers: { 
                'Content-Type': 'multipart/form-data;boundary=----WebKitFormBoundaryyrV7KO0BoCBuDbTL', //'application/json', 
                'Authorization': 'Bearer ' + localStorage['token'] },
            body: formData//JSON.stringify(account)
        };

        fetch(UPDATE_ACCOUNT, requestOptions)
        .then(response => {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response.json();
        })
        .then(data => {
            alert('Update profile success');
        }).catch(function(error) {
            alert('Username or Password wrong');
        });
    }

    const handleChangeRadio = (event) => {
        // alert(event.target.value);
        // account.gender = event.target.value;
        // setAccount(account)
        // console.log(account);
    }

    return (
        <div class="card-body">
            <div class="chart tab-pane active" id="revenue-chart">
                <form class="form-horizontal" onSubmit={updateProfile}>
                    <div class="form-group row">
                        <label for="inputName" class="col-sm-2 col-form-label">Tên <span style={{'color':'red'}}>*</span></label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" id="inputName" placeholder="Name" value={account.name} onChange={(e) => setAccount({... account, "name": e.target.value})} data="abc" />
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="inputEmail" class="col-sm-2 col-form-label">Giới Tính <span style={{'color':'red'}}>*</span></label>
                        <div class="col-sm-10 row" style={{"margin-top": "7px"}}>
                            <div class="col-sm-3">
                                <input type="radio" checked={account.gender === 'NAM'}  value="NAM" name="gioitinh" onChange={handleChangeRadio} />Nam
                        </div>
                            <div class="col-sm-3">
                                <input type="radio" checked={account.gender === 'NU'} value="NU" name="gioitinh"  onChange={handleChangeRadio}/>Nữ
                        </div>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="inputEmail" class="col-sm-2 col-form-label">Email <span style={{'color':'red'}}>*</span></label>
                        <div class="col-sm-10">
                            <input type="email" class="form-control" id="inputEmail" placeholder="Email" value={account.email}  onChange={(e) => setAccount({... account, "email": e.target.value})} data="abc" />
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="inputName2" class="col-sm-2 col-form-label">Số điện thoại <span style={{'color':'red'}}>*</span></label>
                        <div class="col-sm-10">
                            <input type="number" class="form-control" id="inputName2" placeholder="012345678" value={account.phone}  onChange={(e) => setAccount({... account, "phone": e.target.value})} data="abc" />
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="inputName2" class="col-sm-2 col-form-label">Ảnh thẻ <span style={{'color':'red'}}>*</span></label>
                        <div class="col-sm-10">
                            <input type="file" value={phone} onChange={(e) => setAccount({... account, "photo": e.target.files[0]})} data="abc" />
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
                            {/* <select class="form-control custom-select" value={subjectRegisterList} onChange={(e) => setSubjectRegisterList(e.target.value)} data="abc">
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
                                // options={options}
                            />
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="inputSkills" class="col-sm-2 col-form-label">Ngày sinh <span style={{'color':'red'}}>*</span></label>
                        <div class="col-sm-10">
                            <input type="date" class="form-control" placeholder="Ngày Sinh" value={birthday} onChange={(e) => setBirthday(e.target.value)} data="abc" />
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="inputSkills" class="col-sm-2 col-form-label">CMND <span style={{'color':'red'}}>*</span></label>
                        <div class="col-sm-10">
                            <input type="number" class="form-control" placeholder="241468211" value={cmnd} onChange={(e) => setCMND(e.target.value)} data="abc" />
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="inputSkills" class="col-sm-2 col-form-label">Địa chỉ <span style={{'color':'red'}}>*</span></label>
                        <div class="col-sm-10">
                            <Address />
                            {/* <input type="text" class="form-control" placeholder="Địa chỉ" value={address} onChange={(e) => setAddress(e.target.value)} data="abc" /> */}
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="inputSkills" class="col-sm-2 col-form-label">Học trường <span style={{'color':'red'}}>*</span></label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" placeholder="Đại Học Sư Phạm" value={school} onChange={(e) => setSchool(e.target.value)} data="abc" />
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="inputSkills" class="col-sm-2 col-form-label">Chuyên nghành <span style={{'color':'red'}}>*</span></label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" placeholder="Giáo viên tiếng anh..." value={major} onChange={(e) => setMajor(e.target.value)} data="abc" />
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