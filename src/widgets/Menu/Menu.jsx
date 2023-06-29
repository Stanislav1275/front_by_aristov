import {TabMenu} from "primereact/tabmenu";
import {Button} from "primereact/button";
import {useEffect, useState} from "react";
import "./menu.scss"
import {useRentalApi} from "../../shared/api/rentalApi.js";
import {NavLink} from "react-router-dom";
const Menu = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    let [items, setItems] = useState([]);
    const {fetchCategories} = useRentalApi();
    useEffect(() => {
        fetchCategories()
            .then(setItems)
    }, [])
    items = items?.map(item => {
        return {...item, label:<NavLink key={item.id} to={`/category/${item.id}`}>{item?.name}</NavLink>}
    })
    return (
        <div className="card">
            <TabMenu className="tabmenu" model={items} activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)} />
        </div>
    )
}
export default Menu