import "./productSolo.scss"
import {NavLink, useParams} from "react-router-dom";
import React, {useMemo} from "react";
import {Card as UICard} from "primereact/card";
import Card from "../../features/Card/Card.jsx"
import {Button} from "primereact/button";
import {Divider} from "primereact/divider";
import {DataView} from "primereact/dataview";
import {Dialog as PrimeReactDialog} from 'primereact/dialog';
import {OrderPopup} from "../../widgets/OrderPopup/OrderPopup.jsx";

const ProductSolo = () => {
    const {prodId} = useParams();
    let storedData = useMemo(() => {
        return JSON.parse(localStorage.getItem("products") ?? "[]")?.filter(r => r.id == prodId) ?? []
    }, [prodId])

    if (storedData.length === 0 || !("description" in storedData[0])) throw Error("говно");
    storedData = storedData[0]
    let {name, id, price, description, pledge, specs} = storedData;
    if(!specs){
        specs = "{}"
    }
    console.log(storedData)
    console.log(storedData)

    const specsView = useMemo(() => {
        const specObject = JSON.parse(specs ?? "{}") ?? {}
        return <table width={"100%"} border="1px solid white" className="padding-0" cellPadding={0} padding={0}
                      cellSpacing={0}>
            <tbody>
            {Object.entries(specObject).map(([key, value]) => (
                <tr key={key}>
                    <td>{key}</td>
                    <td>{value}</td>
                </tr>
            ))}
            </tbody>
        </table>

    }, [specs])
    const header = (
        <img alt="Card" src="https://primefaces.org/cdn/primereact/images/usercard.png"/>
    );
    return (
        <div className="productSolo">
            <div className="productsSolo__title">
                <h1>
                    {name}
                </h1>

            </div>
            <div className="productsSolo__img">
                <img src="" alt="нихуя"/>
            </div>
            <div className="productSolo__priceDes">
                <div className="left flex-row">
                    <h4>Цена:</h4>
                    <Divider/>

                    <h4>Залог:</h4>
                    <Divider/>

                </div>
                <div className="right flex-row">
                    <h4>{price}</h4>
                    <Divider/>

                    <h4>{pledge}</h4>
                    <Divider/>

                </div>
            </div>
            <OrderPopup/>
            <div className="productSolo__des">
                <UICard title={<h6>описание</h6>}>
                    {specsView}
                </UICard>
            </div>
        </div>
    )
}
export default ProductSolo