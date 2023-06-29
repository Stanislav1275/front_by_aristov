import {useOldHttp} from "./oldhttp.hook.js";
import {useHttp} from "./http.hook.js";

export const useRentalApi = () => {
    const {process, setProcess, get} = useOldHttp("http://localhost:3000");
    const {kyProcess,kySetProcess, get : kyGet} = useHttp("http://localhost:8081");
    const fetchCategories = async() => {
        return kyGet("products/categories")
    }
    const fetchStoresByProduct = async(id) => {
        let searchParams = {id}

        return kyGet("products/stores", {searchParams})
    }
    const fetchProducts = async(id) => {
        let searchParams = {id}

        return kyGet(`products/category`,{searchParams})
    }
    const createPurchase = async(userId, prodId, storeId, tokenId) => {

    }
    return {fetchCategories,fetchProducts,fetchStoresByProduct, process,setProcess, kySetProcess, kyProcess}
}
