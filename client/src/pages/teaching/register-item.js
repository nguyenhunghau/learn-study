import React, { useState, useEffect, useRef } from 'react';
import Select from 'react-select';
import Address from '../../components/address';
import API from '../../components/api';
import { URL_GET_SUBJECT_LIST, URL_GET_UNIT_LIST, URL_GET_LEVEL_LIST } from '../../constants/path';

const ReigsterItem = (props) => {
    const [teaching, setTeaching] = useState(() => props.teaching);
    const [subject, setSubject] = useState();
    const [unit, setUnit] = useState([]);
    const [level, setLevel] = useState([]);
    const [numPeriod, setNumPeriod] = useState([]);

    const [subjectValue, setSubjectValue] = useState();
    const [levelValue, setLevelValue] = useState();
    const [periodValue, setPeriodValue] = useState();
    const [unitValue, setUnitValue] = useState();
    const levelRef = useRef();
    levelRef.current = teaching;
    const [init, setInit] = useState(0);

    const handleChange = (e) => {
        console.log(`Option selected:`, e.map(item => item.value).join())
    }

    const changeSubject = (subjectItem) => {
        //setSubjectValue(subjectItem.value)
    }

    const getListData = async () => {
        const subjectAPI = API.get({ url: URL_GET_SUBJECT_LIST });
        const unitAPI = API.get({ url: URL_GET_UNIT_LIST });
        const levelAPI = API.get({ url: URL_GET_LEVEL_LIST });

        setSubject(createOptionSelect(await subjectAPI));
        const levelOption = createOptionSelect(await levelAPI);
        setLevel(levelOption);
        setLevelValue(createLevelValue(levelRef.current.levelIds, levelOption));
        const unitList = createOptionSelect(await unitAPI);
        setUnit(unitList);
        setUnitValue(unitList.filter(item => item.value === teaching.unitEntity.id)[0]);
        setNumPeriod(makeNumPeriod());
        //Make default value for teaching
        makeDefaultTeaching();
    }

    const makeDefaultTeaching = () => {
        const teachingNew = { ...teaching };
    }

    const makeNumPeriod = () => {
        var result = [];
        for (var i = 1; i <= 6; i++) {
            result.push(<option value={i}>{i + ' buổi'}</option>);
            if (i === props.teaching.numPeriod) {
                setPeriodValue({ value: i, label: i + ' buổi' });
            }
        }
        return result;
    }

    const createOptionSelect = (data) => {
        let result = [];
        data.map(item => {
            result.push({
                value: item.id, label: item.name
            });
        })
        return result;
    }

    useEffect(() => {
        if (props.teaching.id) {
            getListData();
        }

        setTeaching(props.teaching);
        console.log(props.teaching);
        setSubjectValue({ value: props.teaching.subjectEntity.id, label: props.teaching.subjectEntity.name });
    }, [props.teaching.id]);

    const createLevelValue = (levelIds, levelOption) => {
        let result = [];
        if (!levelIds) {
            return result;
        }
        let levelArray = levelIds.split(',');
        levelOption.map(item => {
            if (levelArray.indexOf(item.value.toString()) >= 0) {
                result.push(item);
            }
        });
        return result;
    }

    const changeTeaching = (e, attr) => {
        if (!e) {
            return false;
        }
        const newTeaching = { ...teaching };
        if (Array.isArray(e)) {
            newTeaching[attr] = e.map(item => item.value).join(',');
            setTeaching(newTeaching);
            props.changeTeaching(newTeaching);
            return;
        }
        if (e.value) {
            //This is select
            newTeaching[attr] = { id: e.value };
            setTeaching(newTeaching);
            props.changeTeaching(newTeaching);
            return;
        }
        newTeaching[attr] = e.target.value;
        setTeaching(newTeaching);
        props.changeTeaching(newTeaching);
    }

    return (
        <div class="card-body">
            <div class="form-group">
                <label for="inputEstimatedBudget">Tiêu đề</label>
                <input type="text" value={teaching.title} onChange={(e) => changeTeaching(e, 'title')} class="form-control" placeholder="Mở lớp dạy tiếng anh" required />
            </div>
            <div class="form-group row">
                <div class="col-6">
                    <label for="inputEstimatedBudget">Môn dạy</label>
                    <Select placeholder="Chọn Môn dạy"
                        value={subjectValue}
                        onChange={(subjectItem) => { setSubjectValue(subjectItem); changeTeaching(subjectItem, 'subjectEntity'); }}
                        options={subject}
                        isSearchable required />
                    </div>
                <div class="col-6">
                <label for="inputEstimatedDuration">Số buổi (/ tuần)</label>
                    <select class="form-control" value={teaching.numPeriod} onChange={(e) => changeTeaching(e, 'numPeriod')}>
                        {
                            numPeriod.map(item =>
                                item
                            )
                        }
                    </select>
                </div>
            </div>
            <div class="form-group">
                <label for="inputSpentBudget">Lớp dạy</label>
                <Select placeholder="Chọn Lớp"
                    isMulti
                    value={levelValue}
                    onChange={(levelItem) => { setLevelValue(levelItem); changeTeaching(levelItem, 'levelIds') }}
                    options={level}
                />
            </div>
            <div class="form-group">
                <label for="inputEstimatedDuration">Địa chỉ dạy</label>
                <div class="row">
                    <Address value={props.teaching.addressId} changeAddress={(addressId) => changeTeaching({ target: { value: addressId } }, 'addressId')} />
                </div>
            </div>
            <div class="form-group">
                <label for="inputEstimatedDuration">Thời gian dạy</label>
                <input type="text" value={teaching.timetable} onChange={(e) => changeTeaching(e, 'timetable')} class="form-control" placeholder="Ví dụ: T2 - T4 - T6; 17h - 19h" />
            </div>
            <div class="form-group">
                <label >Ngày mở lớp</label>
                <input type="date" value={teaching.dateStart} onChange={(e) => changeTeaching(e, 'dateStart')} class="form-control" required />
            </div>
            <div class="form-group">
                <label for="inputEstimatedDuration">Học phí</label>
                <div class="row">
                    <div class="form-group col-md-6">
                        <input type="number" class="form-control" value={teaching.cost} onChange={(e) => changeTeaching(e, 'cost')} />
                    </div>
                    /
                    <div class="form-group col-md-5">
                        <Select
                            value={unitValue}
                            onChange={(e) => { setUnitValue(e); changeTeaching(e, 'unitEntity') }}
                            options={unit}
                        />
                    </div>
                </div>
            </div>
            <div class="form-group">
                <label for="inputDescription">Mô tả thêm</label>
                <textarea class="form-control" rows="4" value={teaching.description} onChange={(e) => changeTeaching(e, 'description')}></textarea>
            </div>
        </div>
    )
}

export default ReigsterItem;