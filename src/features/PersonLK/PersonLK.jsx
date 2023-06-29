import {Button} from "primereact/button";
import {Cookies} from "react-cookie";
import {resetUserCookie} from "../../shared/utils/resetUserCookie.js";
export const PersonLK = ({setAuthState}) => {
    const cookie = new Cookies();
    console.log(cookie.get("user"))
    return (
        <div style={{display: "flex"}} className="lk m-auto flex-column align-items-center">
            <h2>{"emailUser"}</h2>
            <h2>{"firstnameUser"}</h2>
            <h2>{"lastnameUser"}</h2>
            <Button
                onClick={() => {
                    setAuthState(prev => ({...prev, isLoggedIn : false}))
                    resetUserCookie();
                    // dispatch(logoutAsync({accessToken} as IAccessToken))
                }}
            >выйти из аккаунта</Button>
        </div>
    )
}
