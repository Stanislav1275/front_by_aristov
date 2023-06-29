import {Sidebar} from "primereact/sidebar";
import {Button} from "primereact/button";
import {useState} from "react";
import "./catalogSideBar.scss"
export const CatalogSideBar = ({children}) => {
	const [visible,setVisible] = useState(false);
	return (
		<div className="sidebar card flex justify-content-center">
			<Sidebar visible={visible} onHide={() => setVisible(false)}>
				<h2>Sidebar</h2>
				{children}
			</Sidebar>
			<Button icon="pi pi-bars" onClick={() => setVisible(true)} />
		</div>
	)
}