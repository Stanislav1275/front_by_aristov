import "./orderPopup.scss"
import React, {useState} from "react";
import {Button} from "primereact/button";
import {OrderArendaForm} from "../../features/OrderArendaForm/OrderArendaForm.jsx";
import {Cookies} from "react-cookie";
import RegisterForm from "../../features/RegisterForm/RegisterForm.jsx";
import LoginForm from "../../features/LoginForm/LoginForm.jsx";
import {Dialog} from "primereact/dialog";
export const OrderPopup = () => {
	const [visible, setVisible] = useState(false);
	const cookie = new Cookies();
	return (
		<div className="card flex justify-content-center">
			<Button label="Заявка на аренду" onClick={() => setVisible(true)} />
			<Dialog header="Оформление заказа" visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)}>
				{cookie.get("user").isLoggedIn? <OrderArendaForm/>:<div>Авторизируйтесь</div>}
			</Dialog>
		</div>
	)
}
