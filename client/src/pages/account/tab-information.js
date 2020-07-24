import React, { useState, useEffect, useRef } from "react";
import { URL_DOWNLOAD, UPDATE_ACCOUNT } from '../../constants/path'
import Address from '../../components/address'
import API from '../../components/api'
import { getCode } from '../../components/component-function';
import { connect } from 'react-redux';

function mapStateToProps(state) {
    return {
        account: state.account.account
    };
}

const mapDispatchToProps = dispatch => {
    return {
        handleChangeRadio: (targetValue) => {
            return {
                type: "CHANGE_RADIO", value: { 'gender': targetValue }
            }
        }
    }
};

function TabInformation(prop) {
    console.log(prop);
    const [account, setAccount] = useState({addressId: 1}); //useState(prop.account);
    const [certificate, setCertificate] = useState();
    const [gender, setGender] = useState();
    const [photo, setPhoto] = useState();
    // const [htmlInputPhoto, setHtmlInputPhoto] = useState();
    const htmlInputPhoto = account.photo ?
        <input type="file" onChange={(e) => imageSource = e.target.files[0]} />
        : <input type="file" onChange={(e) => imageSource = e.target.files[0]} required />;
    var imageSource, certificateSource = null;
    const classTextbox = getCode() === account.code ? 'form-control' : 'form-control';


    const submit = () => {
        alert('submit');
    }

    const updateProfile = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('photo', imageSource);
        formData.append('certificate', certificateSource);
        formData.append('account', new Blob([JSON.stringify(account)], {
            type: "application/json"
        }));
        const data = await API.post({ url: UPDATE_ACCOUNT, body: formData });
        prop.changeAccount(data);
    }

    const handleChangeRadio = (event) => {
        prop.handleChangeRadio(event.target.value);
        // setAccount({ ...account, 'gender': event.target.value })
    }

    const changeAddess = (addressId) => {
        setAccount({ ...account, "addressId": addressId });
    }

    return (
        <div class="card-body">
            <div class="chart tab-pane active" id="revenue-chart">
                <form class="form-horizontal" onSubmit={updateProfile} method="POST" enctype="multipart/form-data" id="fileUploadForm">
                    <div class="form-group row">
                        <label for="inputName" className={'col-sm-2 col-form-label'}>Tên <span style={{ 'color': 'red' }}>*</span></label>
                        <div class="col-sm-10">
                            <input type="text" className={classTextbox} id="inputName" name="name" placeholder="Name" value={account.name} onChange={(e) => setAccount({ ...account, "name": e.target.value })} data="abc" />
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="inputEmail" class="col-sm-2 col-form-label">Giới Tính <span style={{ 'color': 'red' }}>*</span></label>
                        <div class="col-sm-10 row" style={{ "margin-top": "7px" }}>
                            <div class="col-sm-3">
                                <input type="radio" checked={account.gender === 'NAM'} value="NAM" name="gender" onChange={handleChangeRadio} />Nam
                        </div>
                            <div class="col-sm-3">
                                <input type="radio" checked={account.gender === 'NU'} value="NU" name="gender" onChange={handleChangeRadio} />Nữ
                        </div>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="inputEmail" class="col-sm-2 col-form-label">Email <span style={{ 'color': 'red' }}>*</span></label>
                        <div class="col-sm-10">
                            <input type="email" className={classTextbox} id="inputEmail" placeholder="Email" value={account.email} onChange={(e) => setAccount({ ...account, "email": e.target.value })} data="abc" />
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="inputName2" class="col-sm-2 col-form-label">Số điện thoại <span style={{ 'color': 'red' }}>*</span></label>
                        <div class="col-sm-10">
                            <input type="number" className={classTextbox} id="inputName2" placeholder="012345678" value={account.phone} onChange={(e) => setAccount({ ...account, "phone": e.target.value })} data="abc" />
                        </div>
                    </div>

                    {(() => {
                        if (prop.profile) {
                            return <><div class="form-group row">
                                <label for="inputName2" class="col-sm-2 col-form-label">Ảnh thẻ <span style={{ 'color': 'red' }}>*</span></label>
                                <div class="col-sm-10">
                                    {htmlInputPhoto}
                                    {account.photo ? <a target="_blank" href={`${URL_DOWNLOAD}${account.photo}`}>{account.photo.substring(account.photo.lastIndexOf('/') + 1)}</a> : ''}
                                </div>
                            </div>
                                <div class="form-group row">
                                    <label for="inputName2" class="col-sm-2 col-form-label">Bằng cấp</label>
                                    <div class="col-sm-10">
                                        <input type="file" onChange={(e) => certificateSource = e.target.files[0]} />
                                        {account.certificate ? <a target="_blank" href={`${URL_DOWNLOAD}${account.certificate}`}>Avatar</a> : ''}
                                    </div>
                                </div></>
                        }
                    })()}

                    {/* <div class="form-group row">
                        <label for="inputSkills" class="col-sm-2 col-form-label">Môn dạy <span style={{'color':'red'}}>*</span></label>
                        <div class="col-sm-10">
                        </div>
                    </div> */}
                    <div class="form-group row">
                        <label for="inputSkills" class="col-sm-2 col-form-label">Ngày sinh <span style={{ 'color': 'red' }}>*</span></label>
                        <div class="col-sm-10">
                            <input type="date" className={classTextbox} placeholder="Ngày Sinh" value={account.birthday} onChange={(e) => setAccount({ ...account, "birthday": e.target.value })} data="abc" />
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="inputSkills" class="col-sm-2 col-form-label">CMND <span style={{ 'color': 'red' }}>*</span></label>
                        <div class="col-sm-10">
                            <input type="number" className={classTextbox} placeholder="241468211" value={account.personalId} onChange={(e) => setAccount({ ...account, "personalId": e.target.value })} data="abc" />
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="inputSkills" class="col-sm-2 col-form-label">Địa chỉ <span style={{ 'color': 'red' }}>*</span></label>
                        <div class="col-sm-10 row">
                            <Address value={account.addressId.toString()} onChange={changeAddess} />
                            {/* <input type="text" class="form-control" placeholder="Địa chỉ" value={address} onChange={(e) => setAddress(e.target.value)} data="abc" /> */}
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="inputSkills" class="col-sm-2 col-form-label">Học trường <span style={{ 'color': 'red' }}>*</span></label>
                        <div class="col-sm-10">
                            <input type="text" className={classTextbox} placeholder="Đại Học Sư Phạm" value={account.school} onChange={(e) => setAccount({ ...account, "school": e.target.value })} data="abc" />
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="inputSkills" class="col-sm-2 col-form-label">Chuyên nghành <span style={{ 'color': 'red' }}>*</span></label>
                        <div class="col-sm-10">
                            <input type="text" className={classTextbox} placeholder="Giáo viên tiếng anh..." value={account.major} onChange={(e) => setAccount({ ...account, "major": e.target.value })} data="abc" />
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="inputSkills" class="col-sm-2 col-form-label">Mô tả</label>
                        <div class="col-sm-10">
                            <textarea className={classTextbox} id="inputExperience" placeholder="Mô tả" value={account.description} onChange={(e) => setAccount({ ...account, "description": e.target.value })}></textarea>
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

export default connect(mapStateToProps, mapDispatchToProps)(TabInformation);