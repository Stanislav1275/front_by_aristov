import {useState} from "react";
import ky from "ky";

export const getAuthorizationBearer = (token) => {
    return `Bearer ${token}`
}
export const useHttp = (keyWithPrefix) => {// прификс что-то типа localhost:8080/

    const [kyProcess, kySetProcess] = useState("waiting");
    const api = ky.extend({
        prefixUrl: keyWithPrefix, // Замените на ваш префикс URL
    });

// Обертка для GET запроса
    async function get(url, params) {
        console.log("get")
        return await request('get', url, params);
    }

    async function _postRequest(url, body, headers, params, isCors = false) {
        console.log(body)
        kySetProcess("loading");
        try {
            const response = await api.post(url, {
                json: body,
                headers: headers,
                searchParams: params,
                mode: (isCors) ? "cors" : "no-cors"
            })
                .then(data => {
                    return data.json()
                })
            kySetProcess("access");
            return await response;
        } catch (error) {
            kySetProcess("error");

            throw error;
        }

    }

    async function request(method, url, params = {}, otherOptions, isCors = true) {
        kySetProcess('loading');
        try {

            // @ts-ignore
            let response;
            if (method === "post") {
                response = await api.post(url, params);

            } else {
                response = await api.get(url, params);

            }

            if (!response.ok) {
                throw new Error(`Request failed with status ${response.status}`);
            }
            kySetProcess('access');

            return response.json();
        } catch (error) {
            kySetProcess('error');

            console.error(method + ' request failed:', error);
            throw error;
        }
    }

    const _postReq = async (url, body = {}, params = {}, isCors = true) => {
        let headers = {
            'Content-Type': 'application/json',
        }
        // if (token) {
        //     headers['Authorization'] = getAuthorizationBearer(token)
        // }
        return await _postRequest(url, body, headers, params, isCors)
    }
    const postAuth = async (url, body = {}, params = {}, isCors = true) => {
        return _postReq(url, body, params, isCors)
    }
    const postBody = async (url, body = {}, params = {}) => {
        return _postReq(url, body, params)
    }

    return {postBody, get,kyProcess,kySetProcess}
    //postBody - пост без токена, get - простой гет, postAuth - пост с токеном
    //21 строка как работает body
}
