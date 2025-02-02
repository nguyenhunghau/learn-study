import React, { useState, useEffect } from 'react';
import {
    Link, useHistory
} from "react-router-dom";

import adminLTELogo from '../img/AdminLTELogo.png';
import {
    MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBDropdown,
    MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBIcon
} from "mdbreact";

import { removeCookie, readCookie, getCode } from '../component-function'
import { URL_GET_ACCOUNT } from '../../constants/path'
import API from '../../components/api'

import '../plugins/fontawesome-free/css/all.min.css';
import '../plugins/tempusdominus-bootstrap-4/css/tempusdominus-bootstrap-4.min.css';
import '../plugins/icheck-bootstrap/icheck-bootstrap.min.css';
import '../plugins/jqvmap/jqvmap.min.css';
import '../css/adminlte.css';
import styles from './header.module.css';

const Header = () => {

    const [isLogin, setIsLogin] = useState(false);
    const history = useHistory();
    const [headerUser, setHeaderUser] = useState(<li class="nav-item d-none d-sm-inline-block">
        <Link to="/login" className={`nav-link ${styles.user}`}>Đăng nhập</Link>
    </li>);

    const specialCaseNavbarStyles = {
        WebkitBoxOrient: "horizontal",
        flexDirection: "row"
    };

    const checkPermission = async () => {
        if (window.location.pathname !== '/login' && getCode()) {
            try {
                const data = await API.get({ url: URL_GET_ACCOUNT + getCode()});
                if(!data.username) {
                    return;
                }
                setHeaderUser(<MDBNavbarNav right style={specialCaseNavbarStyles}><MDBNavItem>
                    <MDBDropdown className={styles.user}>
                        <MDBDropdownToggle nav caret>
                            <MDBIcon icon="user" /> <div className="d-none d-md-inline">{data.name}</div>
                        </MDBDropdownToggle>
                        <MDBDropdownMenu right id="dropdown-account">
                            <MDBDropdownItem><MDBNavLink to="/profile"><MDBIcon icon="user-circle" /> Trang cá nhân</MDBNavLink></MDBDropdownItem>
                            <MDBDropdownItem><MDBNavLink to="/change-password"><MDBIcon icon="key" /> Đổi mật khẩu</MDBNavLink></MDBDropdownItem>
                            <MDBDropdownItem><MDBNavLink to="#" onClick={logout}><MDBIcon icon="sign-out-alt" /> Đăng xuất</MDBNavLink></MDBDropdownItem>
                        </MDBDropdownMenu>
                    </MDBDropdown>
                </MDBNavItem></MDBNavbarNav>);
            } catch (error) {
                console.log(error);
                // history.push('/login');
            }
            return;
        }
        // history.push('/login');
    }
    const checkActiveMenu = (link) => {
        if(window.location.pathname === link) {
            return 'active';
        }
        return '';
    }

    useEffect(() => {
        checkPermission();
    }, [])

    const logout = () => {
        //remove cookie
        removeCookie('token');
        localStorage.removeItem("username");
        window.location.href = "login";
    }

    return (
        <MDBNavbar style={{ background: '#3f5c80' }} double expand="md" fixed="top" className="fixed-sn light-blue-skin">
            <MDBCollapse isOpen={true} navbar>
                <MDBNavbarNav id="nav-main" left>
                    <MDBNavItem>
                        <MDBNavLink to="#">
                            <img src={adminLTELogo} style={{ height: '30px' }} />
                        </MDBNavLink>
                    </MDBNavItem>
                    <MDBNavItem>
                        <form class="form-inline ml-3">
                            <div class="input-group input-group-sm">
                                <input class="form-control form-control-navbar" type="search" placeholder="Search" aria-label="Search" />
                                <div class="input-group-append">
                                    <button class="btn btn-navbar" type="submit">
                                        <i class="fas fa-search"></i>
                                    </button>
                                </div>
                            </div>
                        </form>
                    </MDBNavItem>
                    <MDBNavItem>
                        <MDBNavLink activeClassName={checkActiveMenu('/')} className={styles.user} to="/">
                            <MDBIcon icon="/" className="d-inline-inline" />{" "}
                            <div className="d-none d-md-inline">Trang chủ</div>
                        </MDBNavLink>
                    </MDBNavItem>
                    <MDBNavItem>
                        <MDBNavLink activeClassName={checkActiveMenu('/teaching')} className={styles.user} to="/teaching">
                            <MDBIcon icon="chalkboard-teacher" />{" "}
                            <div className="d-none d-md-inline">Lớp hiện có</div>
                        </MDBNavLink>
                    </MDBNavItem>
                    <MDBNavItem>
                        <MDBNavLink activeClassName={checkActiveMenu('/teaching-register')} className={styles.user} to="/teaching-register">
                            <MDBIcon icon="registered" />{" "}
                            <div className="d-none d-md-inline">Đăng kí lớp dạy</div>
                        </MDBNavLink>
                    </MDBNavItem>
                </MDBNavbarNav>
                {headerUser}
            </MDBCollapse>
        </MDBNavbar>
    )
}
export default Header;