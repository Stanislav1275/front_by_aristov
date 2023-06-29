import React, {useEffect, useState} from "react";
import {useFormik} from 'formik';
import {Password} from 'primereact/password';
import {Button} from 'primereact/button';
import {classNames} from 'primereact/utils';
import {InputText} from "primereact/inputtext";
import {useAuthApi} from "../../shared/api/useAuthApi.js";
import {Cookies} from "react-cookie";
import {resetUserCookie} from "../../shared/utils/resetUserCookie.js";

export default function RegisterForm() {
    const [isInvalid, setIsInvalid] = useState(false);
    const {register,kyProcess,kySetProcess,getUserByToken} = useAuthApi();
    const cookie = new Cookies();
    console.log(cookie.get("user"))
    const formik = useFormik({
        initialValues: {
            password: '',
            surname:'',
            name:'',
            repeatablePassword:'',
            login: ''
        },
        validate: (data) => {
            let errors = {}

            if (!data.password.trim()) {
                errors.password = 'Password is required.';
            }
            if (!data.login.trim()) {

                errors.login = 'Login is required.';
            }
            return errors;
        },

        onSubmit: (data) => {
            if(data && (!(data.login.length < 4))){
                if(data.password !== data.repeatablePassword){
                    setIsInvalid(true)
                }else{
                    register(data)
                        .then(({token}) => {
                            let userStored = cookie.get("user");
                            getUserByToken({token})
                                .then(user => {
                                    console.log(user)
                                    userStored.user = user;
                                    userStored.isLoggedIn = true;
                                    userStored.token = token;
                                    cookie.set("user", userStored)

                                })
                                .catch((e) => {
                                    if (e.response) {
                                        console.error("Неправильный логин или пароль")
                                        resetUserCookie();
                                        window.location.reload();
                                        console.log('Код ошибки:', e.response.status);
                                    }
                                })

                        })
                    setIsInvalid(false)
                    formik.touched.login = false;
                    formik.touched.name = false;
                    formik.touched.surname = false;
                    formik.touched.password = false;
                    formik.touched.repeatablePassword = false;
                    console.log(data)
                }

            }else{
                setIsInvalid(true)

            }
            //         setIsInvalid(false)
            //         data && show();
            //         formik.resetForm();
                // .catch(res => {

                // })
        }
    });

    // @ts-ignore
    const isFormFieldInvalid = (name) => !!(formik.touched[name] && formik.errors[name]);

    // @ts-ignore
    const getFormErrorMessage = (name) => {
        // @ts-ignore
        return isFormFieldInvalid(name) || isInvalid ? <small className="p-error">{formik.errors[name]}</small> :
            <small className="p-error">&nbsp;</small>;
    };

    // @ts-ignore
    return (
        <div className="card flex justify-content-center">
            <form onSubmit={formik.handleSubmit} className="flex flex-column gap-2">


                <label htmlFor="login">Логин</label>
                <InputText
                    id="login"
                    name="login"
                    required
                    value={formik.values.login}
                    onChange={(e) => {
                        formik.setFieldValue('login', e.target.value);
                    }}
                    placeholder={""}
                    className={classNames({'p-invalid': isFormFieldInvalid('login') || isInvalid})}
                />
                <label htmlFor="name">Имя</label>
                <InputText
                    type="name"
                    id="name"
                    name="name"
                    required
                    value={formik.values.name}
                    onChange={(e) => {
                        formik.setFieldValue('name', e.target.value);
                    }}
                    placeholder={""}
                    className={classNames({'p-invalid': isFormFieldInvalid('name') || isInvalid})}
                />
                <label htmlFor="surname">Фамилия</label>
                <InputText
                    id="surname"
                    name="surname"
                    required
                    value={formik.values.surname}
                    onChange={(e) => {
                        formik.setFieldValue('surname', e.target.value);
                    }}
                    placeholder={""}
                    className={classNames({'p-invalid': isFormFieldInvalid('surname') || isInvalid})}
                />
                <label htmlFor="password">Пароль</label>
                <Password
                    required
                    minLength={4}
                    inputId="in_password"
                    name="password"
                    className={classNames({'p-invalid': isFormFieldInvalid('password')})}
                    value={formik.values.password}
                    onChange={(e) => {
                        formik.setFieldValue('password', e.target.value);
                    }}
                    toggleMask
                />
                <label htmlFor="password">Повторите Пароль</label>

                <Password
                    required
                    minLength={4}
                    inputId="in_repeatablePassword"
                    name="repeatablePassword"
                    className={classNames({'p-invalid': isFormFieldInvalid('repeatablePassword')})}
                    value={formik.values.repeatablePassword}
                    onChange={(e) => {
                        formik.setFieldValue('repeatablePassword', e.target.value);
                    }}
                    toggleMask
                />
                {getFormErrorMessage('repeatablePassword')}
                <Button onClick={e => {
                }} label="Зарегистрироваться" type="submit" icon="pi pi-user"/>
            </form>
        </div>
    )
}