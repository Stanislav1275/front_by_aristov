import React, {useEffect, useRef, useState} from "react";
import {useFormik} from "formik";
import {InputText} from "primereact/inputtext";
import {classNames} from "primereact/utils";
import {Password} from "primereact/password";
import {Button} from "primereact/button";
import {Toast} from "primereact/toast";
import StoreSelector from "../StoreSelector/StoreSelector.jsx";
import {useParams} from "react-router-dom";
import {useRentalApi} from "../../shared/api/rentalApi.js";

export const OrderArendaForm = () => {
    const [isInvalid, setIsInvalid] = useState(false);
    const {fetchStoresByProduct,process} = useRentalApi();
    const [stores, setStores]= useState([]);
    const [currentStore, setCurrentStore]= useState(null);
    const [isClear, setIsClear]= useState(false);
	const toast = useRef(null);
    const {prodId} = useParams();
    console.log(currentStore)
	const show = () => {
		toast.current.show({ severity: 'success', summary: 'Form Submitted', detail: formik.values.surname });
	};

    useEffect(() => {
        fetchStoresByProduct(prodId)
            .then(stores => {
                setStores(stores)
            })
    }, [])
    const formik = useFormik({
        initialValues: {
            currentStoreId:''
        },
        validate: (data) => {
            let errors = {}
            console.log(data)
            // if (!data.surname.trim()) {
            //     errors.password = 'Surname is required.';
            // }
            // if (!data.name.trim()) {
            //
            //     errors.name = 'Name is required.';
            // }
			// if (!data.name.trim()) {
            //
			// 	errors.name = 'Name is required.';
			// }
            return errors;
        },
        onSubmit: (data) => {
            console.log(currentStore)

            if(currentStore){
                setIsInvalid(false)
                data && show();
                setIsClear(true)

            }else{
                setIsInvalid(true)
            }


            //         data && show();
            //         formik.resetForm();
        }
    });

    const isFormFieldInvalid = (name) => !!(formik.touched[name] && formik.errors[name]);

    // @ts-ignore
    const getFormErrorMessage = (name) => {
        if(!currentStore){
            return <small className="p-error">Выберите точку</small>
        } return null
    };

    // @ts-ignore
    return (
        <div className="card flex justify-content-center">
            <form onSubmit={formik.handleSubmit} className="flex flex-column gap-2">
				<Toast ref={toast} />
                {getFormErrorMessage('repeatablePassword')}

                <StoreSelector isClear = {isClear} setIsClear = {setIsClear} currentStore = {currentStore} setCurrentStore = {setCurrentStore} title="Выберите точку" items={stores}/>
                <Button onClick={e => {
                }} label="Подать заявку" type="submit"/>
            </form>
        </div>)
}