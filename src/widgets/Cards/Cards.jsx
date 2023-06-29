import {NavLink, useParams} from "react-router-dom";
import React, {useEffect, useId, useState} from "react";
import {useRentalApi} from "../../shared/api/rentalApi.js";
import Card from "../../features/Card/Card.jsx"
import {fetchReducer} from "../../shared/api/fetchReducer.jsx";
import { Card as UICard} from 'primereact/card';

import "./cards.scss"

const Cards = () => {
    const {id} = useParams();
    const [products, setProducts] = useState(null);
    const {fetchProducts, kyProcess, kySetProcess} = useRentalApi();
    useEffect(() => {
        fetchProducts(id)
            .then(products => {
                setProducts(products)
            })
    }, [id])

    return <div className="cards">
        {fetchReducer(kyProcess, View, {products})}
    </div>
}
const View = ({products}) => {
    localStorage.setItem("products", JSON.stringify(products))
    return products?.map((product) => {
        const header =
            <img alt="Card" src="https://primefaces.org/cdn/primereact/images/usercard.png" />
            const {name,price,id} = product??{name:"",price:"", id :useId()}
        return <Card
            {...product} key = {id}
        >
            <NavLink to ={`buyProduct/${id}`}>
                <UICard title={name+""} subTitle={price+""} footer={<h3>Залог :2000Р</h3>} header={header} className="md:w-25rem">

                </UICard>
            </NavLink>
        </Card>
    })
}
export default Cards