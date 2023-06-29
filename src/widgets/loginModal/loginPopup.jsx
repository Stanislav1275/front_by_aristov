import React, {useEffect, useState} from "react";
import Dialog from "../Dialog/Dialog.jsx";
import LoginForm from "../../features/LoginForm/LoginForm.jsx";
import {PersonLK} from "../../features/PersonLK/PersonLK";
import RegisterForm from "../../features/RegisterForm/RegisterForm.jsx";
import {useStorage} from "primereact/hooks";
import {Cookies} from "react-cookie";
import {useAuthApi} from "../../shared/api/useAuthApi.js";
import {authStateDEF} from "../../shared/utils/resetUserCookie.js";


const LoginPopup = ({isLogged, setIsLogged}) => {


    const cookie = new Cookies();

    let aS = cookie.get("user") ?? authStateDEF;

    useEffect(() => {
        let u = cookie.get("user");
        if (!u) {
            cookie.set("user", authStateDEF);
        } else {
            if (u) {

            }
            setAuthState(cookie.get("user"))
        }
    }, [])
    const [authState, setAuthState] = useState(() => {
        if (aS.isLoggedIn) {
            return aS;
        } else return authStateDEF;
    })

    const [isReg, setIsReg] = useState(false);
    return (
        <Dialog isLog={authState?.isLoggedIn ?? false} setIsReg={setIsReg}>
            {authState?.isLoggedIn ?? false ? <PersonLK setAuthState = {setAuthState}/> : !isReg ? <LoginForm/> : <RegisterForm/>}
        </Dialog>
    )
}
export default LoginPopup