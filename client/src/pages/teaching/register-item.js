import React from 'react';
import Select from 'react-select';
import Address from '../../components/address'

const ReigsterItem = () => {

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
            <div class="form-group">
                <label for="inputEstimatedBudget">Môn dạy</label>
                <Select placeholder="Chọn Môn dạy"
                    isMulti={true}
                    // value={subjectIds}
                    onChange={handleChange}
                    options={options}
                />
            </div>
            <div class="form-group">
                <label for="inputSpentBudget">Lớp dạy</label>
                <Select placeholder="Chọn Lớp"
                    isMulti={true}
                    // value={subjectIds}
                    onChange={handleChange}
                    options={options}
                />
            </div>
            <div class="form-group">
                <label for="inputEstimatedDuration">Địa chỉ dạy</label>
                <div class="row">
                    <Address />
                </div>
            </div>
            <div class="form-group">
                <label for="inputEstimatedDuration">Thời gian dạy</label>
                <input type="number" id="inputEstimatedDuration" class="form-control" />
            </div>
            <div class="form-group">
                <label for="inputEstimatedDuration">Học phí</label>
                <div class="row">
                    <div class="form-group col-md-6">
                        <input type="number" id="inputEstimatedDuration" class="form-control" />
                    </div>
                    <div class="form-group col-md-6">
                        <select class="form-control custom-select col-md-6">
                            <option selected>Buổi</option>
                            <option>Giờ</option>
                            <option>Tháng</option>
                            <option>Năm</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="form-group">
                <label for="inputDescription">Mô tả thêm</label>
                <textarea id="inputDescription" class="form-control" rows="4"></textarea>
            </div>
        </div>
    )
}

export default ReigsterItem;