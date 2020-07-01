import React, {useState, useEffect} from 'react'
import Select from 'react-select';
import CityData from './quanhuyen.json'

const Address = (props) => {
    const [city, setCity] = useState([]);
    const [district, setDistrict] = useState([]);
    const [cityValue, setCityValue] = useState({});
    const [districtValue, setDistrictValue] = useState({});

    const handleChange = (cityId) => {
        //console.log(`Option selected:`, e.map(item => item.value).join())
    }

    useEffect(() => {
        getListCity();
        findCityByDistrictId();
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

    const getListDistrict = (cityItem) => {
        setDistrictValue({});
        const districtArray = [];
        CityData.filter(item => item.id == cityItem.value).map(item => {
            const districts = item.districts;
            districts.map(districtItem => {
                districtArray.push({
                    value: districtItem.id, label: districtItem.name
                });
            })
        });
        setDistrict(districtArray);
        setCityValue(cityItem);
    }

    const findCityByDistrictId = () => {
        CityData.map(item => {
            const districts = item.districts;
            const districtResult = districts.filter(districItem => districItem.id == props.value);
            if(districtResult.length > 0) {
                const districtArray = [];
                districts.map(districtItem => {
                    districtArray.push({
                        value: districtItem.id, label: districtItem.name
                    });
                })
                setCityValue({value: item.id, label: item.name});
                setDistrict(districtArray);
                setDistrictValue({value: districtResult[0].id, label: districtResult[0].name});
                return false;
            }
        });
    };

    const changeDistrict = (districtItem) => {
        props.onChange(districtItem.value);
        setDistrictValue(districtItem);
    }

    return (
        <div class="row">
            <div class="form-group col-md-6">
            <Select placeholder="Chọn Tỉnh/ Thành Phố"
                                value={cityValue}
                                onChange={(cityItem) => getListDistrict(cityItem)}
                                options={city}
                            />
            </div>
            <div class="form-group col-md-6">
            <Select placeholder="Chọn Quận Huyện"
                                value={districtValue}
                                onChange={(districtItem) => changeDistrict(districtItem)}
                                options={district}
                            />
            </div>
        </div>
    )
}

export default Address;