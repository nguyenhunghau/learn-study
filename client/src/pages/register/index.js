import React, { useState, useEffect } from "react";
import Header from '../../components/header/header';
import Footer from '../../components/footer';
import {Register} from './register'

export default function RegisterPage () {
    return (
        <div className={'wrapper'}>
            <Header />
            <div class="content-wrapper">
                <section class="content">
                    <Register />
                </section>
            </div>
            <Footer />
        </div>
    )
}