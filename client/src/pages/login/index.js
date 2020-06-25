import React, { useState, useEffect } from "react";
import Header from '../../components/header/header';
import Footer from '../../components/footer';
import {Login} from './login'

export default function LoginPage() {
    return (
        <div className={'wrapper'}>
            <Header />
            <div class="content-wrapper">
                <section class="content">
                    <Login />
                </section>
            </div>
        </div>
    )
}