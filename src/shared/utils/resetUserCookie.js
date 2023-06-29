import {Cookies} from "react-cookie";
export const USER_ROLE = {
    "GUEST": {decimal:-1, str:"GUEST"},
    "ADMIN": {decimal:2, str:"ADMIN"},
    "COMMON": {decimal:0, str:"COMMON"},
    "MANAGER": {decimal:1, str:"MANAGER"},
    "BANNED": {decimal:3, str:"BANNED"},
}
export const authStateDEF = {
    user: {
        name: 'null',
        surname: 'null',
        login: 'null',
        password: 'null',
        role: USER_ROLE.GUEST.str,
    },
    isLoggedIn: false,
    token: 'null'

}
export const resetUserCookie = () => {
    let cookie = new Cookies();
    cookie.set("user", authStateDEF);

}