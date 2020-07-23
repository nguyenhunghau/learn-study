import React from 'react';
import { Component } from "react";

const Footer = () => {

    return (
        <footer class="page-footer font-small blue pt-4">

            {/* Footer Links */}
            <div class="container-fluid text-center text-md-left">

                {/* Grid row */}
                <div class="row" style={{'margin-left': '100px'}}>

                    {/* Grid column */}
                    <div class="col-md-6 mt-md-0 mt-3">

                        {/* Content */}
                        <h5 class="text-uppercase">Ứng dụng học tập</h5>
                        <p>Nơi hoàn hảo chắp cánh ước mơ</p>

                    </div>
                    {/* Grid column */}

                    <hr class="clearfix w-100 d-md-none pb-3" />

                    {/* Grid column */}
                    <div class="col-md-3 mb-md-0 mb-3">

                        {/* Links */}
                        <h5 class="text-uppercase">Links</h5>

                        <ul class="list-unstyled">
                            <li>
                                <a href="#!">Link 1</a>
                            </li>
                            <li>
                                <a href="#!">Link 2</a>
                            </li>
                            <li>
                                <a href="#!">Link 3</a>
                            </li>
                            <li>
                                <a href="#!">Link 4</a>
                            </li>
                        </ul>

                    </div>
                    {/* Grid column */}

                    {/* Grid column */}
                    <div class="col-md-3 mb-md-0 mb-3">

                        {/* Links */}
                        <h5 class="text-uppercase">Links</h5>

                        <ul class="list-unstyled">
                            <li>
                                <a href="#!">Link 1</a>
                            </li>
                            <li>
                                <a href="#!">Link 2</a>
                            </li>
                            <li>
                                <a href="#!">Link 3</a>
                            </li>
                            <li>
                                <a href="#!">Link 4</a>
                            </li>
                        </ul>

                    </div>
                    {/* Grid column */}

                </div>
                {/* Grid row */}

            </div>
            {/* Footer Links */}

            {/* Copyright */}
            <div class="footer-copyright text-center py-3">© 2020 Copyright:
    <a href="https://mdbootstrap.com/"> learn-study.com</a>
            </div>
        </footer>
        // <footer class="main-footer">
        //     <strong>Copyright &copy; 2014-2019 <a href="http://adminlte.io">AdminLTE.io</a>.</strong>
        //     All rights reserved.
        // <div class="float-right d-none d-sm-inline-block">
        //         <b>Version</b> 3.0.3-pre
        // </div>
        // </footer>
    )
}
export default Footer;