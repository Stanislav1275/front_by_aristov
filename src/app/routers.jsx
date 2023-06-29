import {lazy} from "react";
import ErrorBoundery from "../shared/utils/ErrorBoundery.jsx";

const  ProductList  = lazy(() => import("../pages/ProductList/ProductList.jsx"));
const  ProductSolo  = lazy(() => import("../features/productSolo/productSolo.jsx"));
const  MainPage  = lazy(() => import("../pages/MainPage/MainPage.jsx"));

export const routers = [
    {
        path: "/",
        element: <ErrorBoundery><MainPage/></ErrorBoundery>,
    },
    {
        path: "/contacts",
        element: <div>контакты</div>,
    },
    {
        path: "/about",
        element: <div>о нас</div>,
    },
    {
        path: "/category/:id",
        element: <ErrorBoundery><ProductList/></ErrorBoundery>
    },//все продукты по категории
    {
        path: "/category/:id/buyProduct/:prodId",
        element: <ErrorBoundery><ProductSolo/></ErrorBoundery>
    }


];
export default routers