import React, {useState, useEffect} from 'react'
import Select from 'react-select';
import CityData from './quanhuyen.json'

const Address = (props) => {
    const [city, setCity] = useState([]);
    const [district, setDistrict] = useState([]);
    const [cityValue, setCityValue] = useState({});
    const [districtValue, setDistrictValue] = useState({});
    const divClass = props.divClass || 'form-group col-md-6';

    const handleChange = (cityId) => {
        //console.log(`Option selected:`, e.map(item => item.value).join())
    }

    useEffect(() => {
        getListCity();
        findCityByDistrictId();
    }, [props.value]);

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
        if (typeof props.onChange !== "undefined") { 
            props.onChange(districtItem.value);
        }
        
        setDistrictValue(districtItem);
    }

    return (
        <>
            <div className={divClass}>
            <Select placeholder="Chọn Tỉnh/ Thành Phố"
                                value={cityValue}
                                onChange={(cityItem) => getListDistrict(cityItem)}
                                options={city}
                            />
            </div>
            <div className={divClass}>
            <Select placeholder="Chọn Quận Huyện"
                                value={districtValue}
                                onChange={(districtItem) => changeDistrict(districtItem)}
                                options={district}
                            />
            </div>
        </>
    )
}

export default Address;