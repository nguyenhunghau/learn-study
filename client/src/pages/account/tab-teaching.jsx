import React, { useState, useEffect } from 'react';
import Header from '../../components/header/header';
import ClassItem from '../teaching/class-item';
import { URL_GET_CLASS_BY_ACCOUNT } from '../../constants/path';
import API from '../../components/api'
import { findAddress } from '../../components/address'
import { getCode } from '../../components/component-function'
import Select from 'react-select';

const TabTeaching = (props) => {

    const [classList, setClassList] = useState([{ accountEntity: {} }]);

    const getData = async () => {

        try {
            const classData = await API.get({ url: URL_GET_CLASS_BY_ACCOUNT + "?accountCode=" + props.code });
            let classArray = [];
            classData.map(item => {
                classArray.push({ ...item.teaching, subjectName: item.subjectName, level: item.levelName, address: findAddress({ addressId: item.teaching.addressId }) });
            });
            setClassList(classArray);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getData();
    }, []);

    return (
        <div class="card-body">
            <div class="chart tab-pane" id="sales-chart">
                <div class="card card-solid">
                    <div class="card-body pb-0" id="list-class">
                        {
                            classList.map(item =>
                                <ClassItem data={item} />
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
export default TabTeaching;