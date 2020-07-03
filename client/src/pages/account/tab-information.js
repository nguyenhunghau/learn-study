import React, { useState } from "react";
import Select from 'react-select';
import { URL_GET_ACCOUNT, UPDATE_ACCOUNT } from '../../constants/path'
import Address from '../../components/address'

export default function TabInformation(prop) {

    const [account, setAccount] = useState(prop.account);
    const [certificate, setCertificate] = useState();
    const [gender, setGender] = useState();
    const [photo, setPhoto] = useState();

    var imageSource, certificateSource = null; 

    const updateProfile = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('photo', imageSource);
        formData.append('certificate', certificateSource);
        formData.append('account', new Blob([JSON.stringify(account)], {
            type: "application/json"
        }));

        const requestOptions = {
            method: 'POST',
            headers: { 
                'Authorization': 'Bearer ' + localStorage['token'] },
            body: formData
        };

        fetch(UPDATE_ACCOUNT, requestOptions)
        .then(response => {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response.json();
        })
        .then(data => {
            prop.changeAccount(data);
            // alert('Update profile success');
        }).catch(function(error) {
            // alert('Username or Password wrong');
        });
    }

    const handleChangeRadio = (event) => {
        setAccount({...account, 'gender': event.target.value})
    }

    const changeAddess = (addressId) => {
        setAccount({...account, "addressId": addressId});
    }

    return (
        <div class="card-body">
            <div class="chart tab-pane active" id="revenue-chart">
                <form class="form-horizontal" onSubmit={updateProfile} method="POST" enctype="multipart/form-data" id="fileUploadForm">
                    <div class="form-group row">
                        <label for="inputName" class="col-sm-2 col-form-label">Tên <span style={{'color':'red'}}>*</span></label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" id="inputName" name="name" placeholder="Name" value={account.name} onChange={(e) => setAccount({... account, "name": e.target.value})} data="abc" />
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="inputEmail" class="col-sm-2 col-form-label">Giới Tính <span style={{'color':'red'}}>*</span></label>
                        <div class="col-sm-10 row" style={{"margin-top": "7px"}}>
                            <div class="col-sm-3">
                                <input type="radio" checked={account.gender === 'NAM'}  value="NAM" name="gender" onChange={handleChangeRadio} />Nam
                        </div>
                            <div class="col-sm-3">
                                <input type="radio" checked={account.gender === 'NU'} value="NU" name="gender"  onChange={handleChangeRadio}/>Nữ
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
                            <input type="file"  onChange={(e) => imageSource = e.target.files[0]} required />
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="inputName2" class="col-sm-2 col-form-label">Bằng cấp</label>
                        <div class="col-sm-10">
                            <input type="file" onChange={(e) => certificateSource = e.target.files[0]} />
                        </div>
                    </div>
                    {/* <div class="form-group row">
                        <label for="inputSkills" class="col-sm-2 col-form-label">Môn dạy <span style={{'color':'red'}}>*</span></label>
                        <div class="col-sm-10">
                        </div>
                    </div> */}
                    <div class="form-group row">
                        <label for="inputSkills" class="col-sm-2 col-form-label">Ngày sinh <span style={{'color':'red'}}>*</span></label>
                        <div class="col-sm-10">
                            <input type="date" class="form-control" placeholder="Ngày Sinh" value={account.birthday}  onChange={(e) => setAccount({... account, "birthday": e.target.value})} data="abc" />
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="inputSkills" class="col-sm-2 col-form-label">CMND <span style={{'color':'red'}}>*</span></label>
                        <div class="col-sm-10">
                            <input type="number" class="form-control" placeholder="241468211" value={account.personalId}  onChange={(e) => setAccount({... account, "personalId": e.target.value})} data="abc" />
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="inputSkills" class="col-sm-2 col-form-label">Địa chỉ <span style={{'color':'red'}}>*</span></label>
                        <div class="col-sm-10 row">
                            <Address value={account.addressId.toString()} onChange={changeAddess}/>
                            {/* <input type="text" class="form-control" placeholder="Địa chỉ" value={address} onChange={(e) => setAddress(e.target.value)} data="abc" /> */}
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="inputSkills" class="col-sm-2 col-form-label">Học trường <span style={{'color':'red'}}>*</span></label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" placeholder="Đại Học Sư Phạm" value={account.school}  onChange={(e) => setAccount({... account, "school": e.target.value})} data="abc" />
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="inputSkills" class="col-sm-2 col-form-label">Chuyên nghành <span style={{'color':'red'}}>*</span></label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" placeholder="Giáo viên tiếng anh..." value={account.major}  onChange={(e) => setAccount({... account, "major": e.target.value})} data="abc" />
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="inputSkills" class="col-sm-2 col-form-label">Mô tả</label>
                        <div class="col-sm-10">
                            <textarea class="form-control" id="inputExperience" placeholder="Mô tả" value={account.description}  onChange={(e) => setAccount({... account, "description": e.target.value})}></textarea>
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