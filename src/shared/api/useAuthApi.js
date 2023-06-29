import {useOldHttp} from "./oldhttp.hook.js";
import {useHttp} from "./http.hook.js";

export const useAuthApi = () => {
    const {kyProcess, kySetProcess, get: kyGet, postBody} = useHttp("http://localhost:8081/auth");
    const {get,process} = useOldHttp("http://localhost:8081/auth");

    const doLogin = async ({login, password}) => {
        return postBody("login", {login,password}, {})
    }
    const register = async ({login, password, name, surname}) => {
        return postBody("register", {login,password,name,surname}, {})
    }
    const getUserByToken= ({token}) => {
        const searchParams = {token}
        return kyGet("userByToken", {searchParams})

    }

    return {kySetProcess, kyProcess, doLogin,getUserByToken,register}
}
