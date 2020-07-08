import React, { useState, useEffect } from 'react'
import Select from 'react-select';
import CityData from './quanhuyen.json'

const Address = (props) => {
    const [city, setCity] = useState([]);
    const [district, setDistrict] = useState([]);
    const [cityValue, setCityValue] = useState({});
    const [districtValue, setDistrictValue] = useState({});
    const [wardValue, setWardValue] = useState({});
    const [wardAll, setWardAll] = useState({});

    const divClass = props.divClass || 'form-group col-md-6';

    const handleChange = (cityId) => {
        //console.log(`Option selected:`, e.map(item => item.value).join())
    }

    useEffect(() => {
        getListCity();
        findLocationByWardId();
        makeIconSelect();
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
        const districtArray = [];
        let districts= {};
        CityData.filter(item => item.id == cityItem.value).map(item => {
            districts = item.districts;
            districts.map(districtItem => {
                districtArray.push({
                    value: districtItem.id, label: districtItem.name, wards: districtItem.wards
                });
            })
        });
        setDistrict(districtArray);
        setDistrictValue(districtArray[0]);
        getListWard(districtArray[0]);
        setCityValue(cityItem);
    }

    const getListWard = (districtItem) => {
        const wardArray = [];
        districtItem.wards.map(wardItem => {
                wardArray.push({
                    value: wardItem.id, label: wardItem.name
                });
        });
        setWardAll(wardArray);
        setWardValue(wardArray[0]);
        setDistrictValue(districtItem);
    }

    const findCityByDistrictId = () => {
        CityData.map(item => {
            const districts = item.districts;
            const districtResult = districts.filter(districItem => districItem.id == props.value);
            if (districtResult.length > 0) {
                const districtArray = [];
                districts.map(districtItem => {
                    districtArray.push({
                        value: districtItem.id, label: districtItem.name
                    });
                })
                setCityValue({ value: item.id, label: item.name });
                setDistrict(districtArray);
                setDistrictValue({ value: districtResult[0].id, label: districtResult[0].name });
                return false;
            }
        });
    };

    const findLocationByWardId = () => {
        CityData.map(item => {
            const districts = item.districts;
            districts.map(districtItem => {
                const wardResult = districtItem.wards.filter(wardItem => wardItem.id == props.value.toString());
                if (wardResult.length > 0) {
                    const districtArray = [], wardArray = [];
                    districts.map(districtItem => {
                        districtArray.push({
                            value: districtItem.id, label: districtItem.name, wards: districtItem.wards
                        });
                    })
                    districtItem.wards.map(wardItem => {
                        wardArray.push({
                            value: wardItem.id, label: wardItem.name
                        });
                    })
                    setCityValue({ value: item.id, label: item.name });
                    setDistrict(districtArray);
                    setWardAll(wardArray);
                    setDistrictValue({ value: districtItem.id, label: districtItem.name });
                    setWardValue({ value: wardResult[0].id, label: wardResult[0].name });
                    return false;
                }
            })
        });
    };

    const changeDistrict = (districtItem) => {
        getListWard(districtItem);
        if (typeof props.onChange !== "undefined") {
            props.onChange(districtItem.value);
        }

        setDistrictValue(districtItem);
    }

    const changeWard = (wardItem) => {
        if (typeof props.onChange !== "undefined") {
            props.onChange(wardItem.value);
        }

        setWardValue(wardItem);
    }

    const makeIconSelect = () => {
        var elements = document.querySelectorAll('.css-tlfecz-indicatorContainer');
        for(var item of  elements) {
            item.innerHTML = 
        '<div class="input-group-text custom-icon-select"><span class="fas fa-envelope"></span></div>'
        }
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
            <div className={divClass}>
                <Select placeholder="Chọn Phường Xã"
                    value={wardValue}
                    onChange={(wardItem) => changeWard(wardItem)}
                    options={wardAll}
                />
            </div>
        </>
    )
}

export default Address;