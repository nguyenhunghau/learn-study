import React, {useState, useEffect} from 'react'
import Select from 'react-select';
import CityData from './quanhuyen.json'

const Address = () => {
    const [city, setCity] = useState([]);
    const [district, setDistrict] = useState([]);
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

    const handleChange = (cityId) => {
        //console.log(`Option selected:`, e.map(item => item.value).join())
    }

    useEffect(() => {
        getListCity();
    }, []);

    const getListCity = () => {
        const cityArray = [];
        CityData.map(item => {
            cityArray.push({
                value: item.id, label: item.name
            });
        });
        setCity(cityArray);
    }

    const getListDistrict = (cityID) => {
        const districtArray = [];
        CityData.filter(item => item.id == cityID).map(item => {
            const districts = item.districts;
            districts.map(districtItem => {
                districtArray.push({
                    value: districtItem.id, label: districtItem.name
                });
            })
        });
        setDistrict(districtArray);
    }

    return (
        <div class="row">
            <div class="form-group col-md-6">
            <Select placeholder="Chọn Tỉnh/ Thành Phố"
                                // value={subjectIds}
                                onChange={(cityItem) => getListDistrict(cityItem.value)}
                                options={city}
                            />
            </div>
            <div class="form-group col-md-6">
            <Select placeholder="Chọn Quận Huyện"
                                // value={subjectIds}
                                // onChange={handleChange}
                                options={district}
                            />
            </div>
        </div>
    )
}

export default Address;