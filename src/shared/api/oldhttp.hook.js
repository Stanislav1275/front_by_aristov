import {useState} from "react";
import ky from "ky";


export const useOldHttp = (keyWithPrefix) => {// прификс что-то типа localhost:8080/
    const [process, setProcess] = useState("waiting");


// Обертка для GET запроса
    async function get(url, params) {
        return await request('get', `${keyWithPrefix}/${url}`, params);
    }

    // async function _postRequest(url, body, headers, params, isCors = true) {
    //     setProcess("loading");
    //     try {
    //         const response = await keyWithPrefix.post(url, {
    //             json: body,
    //             headers: headers,
    //             searchParams: params,
    //             mode: (isCors) ? "cors" : "no-cors"
    //         })
    //             .then(data => {
    //                 return data.json()
    //             })
    //         setProcess("access");
    //         return await response;
    //     } catch (error) {
    //         setProcess("error");
    //
    //         throw error;
    //     }
    //
    // }

    async function request(method, url, params = {}) {
        setProcess('loading');
        try {
            let paramS = "";
            let isFirst = true;
            for(let [key,val] in paramS){
                if(isFirst) {
                    paramS += "?" + key + "=" + val;
                    isFirst = false
                }
                else {
                    paramS += "&" + key + "=" + val;
                }

            }
            let response = await fetch(url, params)
            if (!response.ok) {
                throw new Error(`Request failed with status ${response.status}`);
            }
            setProcess('access');
            return response.json();
        } catch (error) {
            setProcess('error');

            console.error(method + ' request failed:', error);
            throw error;
        }
    }

    // const _postReq = async (url, body = {}, params = {}, isCors = true) => {
    //     let headers = {
    //         'Content-Type': 'application/json',
    //     }
    //     // if (token) {
    //     //     headers['Authorization'] = getAuthorizationBearer(token)
    //     // }
    //     return await _postRequest(url, body, headers, params, isCors)
    // }
    // const postAuth = async (url, body = {}, params = {}, isCors = true) => {
    //     return _postReq(url, body, params, isCors)
    // }
    // const postBody = async (url, body = {}, params = {}) => {
    //     return _postReq(url, body, params)
    // }

    return {get, process, setProcess}
    //postBody - пост без токена, get - простой гет, postAuth - пост с токеном
    //21 строка как работает body
}
