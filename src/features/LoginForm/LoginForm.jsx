import React, {useEffect, useRef, useState} from "react";
import {useFormik} from 'formik';
import {Password} from 'primereact/password';
import {Button} from 'primereact/button';
import {classNames} from 'primereact/utils';
import {Toast} from 'primereact/toast';
import {InputText} from "primereact/inputtext";
import {useAuthApi} from "../../shared/api/useAuthApi.js";
import {Cookies} from "react-cookie";
import {resetUserCookie} from "../../shared/utils/resetUserCookie.js";
import RegisterForm from "../RegisterForm/RegisterForm.jsx";
//@Уволить нахуй за такое говно

export default function LoginForm({isReg = false}) {

    const [reg, setReg] = useState(false)
    useEffect(() => {
        setReg(isReg)
    }, [isReg])
    useEffect(() => {
        return <RegisterForm/>
    }, [reg])
    const {doLogin, kySetProcess, kyProcess, getUserByToken} = useAuthApi();

    const toast = useRef(null);
    const show = () => {
        toast.current.show({ severity: 'success', summary: 'Form Submitted', detail: formik.values.surname });
    };
    const cookie = new Cookies();
    console.log(cookie.get("user"))

    const [isInvalid, setIsInvalid] = useState(false);
    const formik = useFormik({
        initialValues: {
            password: '',
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
            console.log(data)
            if (!(data.login.length < 4)) {
                doLogin({login: data.login, password: data.password})
                        .then(({token}) => {
                            let userStored = cookie.get("user");
                            getUserByToken({token})
                                .then(user => {
                                    userStored.user = user;
                                    userStored.isLoggedIn = true;
                                    userStored.token = token;
                                    cookie.set("user", userStored)

                                })
                                .catch((e) => {
                                    if (e.response) {
                                        console.error("Неправильный логин или пароль")
                                        // resetUserCookie();
                                        // window.location.reload();
                                        console.log('Код ошибки:', e.response.status);
                                    }
                                })
                            show()

                            setTimeout(() => {

                                window.location.reload()
                            }, 500)
                        })

                        // .then(token => {
                        //     console.log("ds")
                        //     console.log(token)
                        //     const uWithoutToken = JSON.parse(cookie.get("user"));
                        //     return getUserByToken({token})
                        //         .then(user => {
                        //             return {...user, token :token}
                        //         })
                        //         .then((res) => {
                        //             console.log(res)
                        //         })
                        //     // cookie.set("user",)
                        // })
                        .catch(() => {
                            formik.touched.login = true
                            formik.touched.password = true
                            setIsInvalid(true)
                        })

                formik.touched.login = false;
                formik.touched.password = false;
            } else {
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
                <Toast ref={toast} />


                <label htmlFor="login">Login</label>
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
                <label htmlFor="password">Password</label>
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
                    feedback={false}
                />
                {getFormErrorMessage('password')}
                <Button onClick={e => {
                }} label="Войти" type="submit" icon="pi pi-user"/>

            </form>
        </div>
    )
}