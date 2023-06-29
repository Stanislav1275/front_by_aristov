import React, {useEffect, useState} from "react";
import { Dropdown } from 'primereact/dropdown';
import "./StoreSelector.scss"
import {useParams} from "react-router-dom";
import {useRentalApi} from "../../shared/api/rentalApi.js";
export default function StoreSelector({isClear, setIsClear, setCurrentStore, title, items : cities}) {
    const [selectedCity, setSelectedCity] = useState(null);
   useEffect(() => {

       setCurrentStore(selectedCity)
        // onChange(selectedCity)
   }, [selectedCity])
    useEffect(() => {
        setSelectedCity(null);
        setIsClear(false)
    }, [isClear])

    return (
        <div className="card flex justify-content-center">
            <span className="p-float-label">
                <Dropdown inputId="dd-city" value={selectedCity} onChange={(e) => setSelectedCity(e.value)} options={cities} optionLabel="name" className="w-full md:w-14rem" />
                <label htmlFor="dd-city">{title}</label>
            </span>
        </div>
    )
}