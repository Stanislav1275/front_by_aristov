import {useParams} from "react-router-dom";
import Cards from "../../widgets/Cards/Cards.jsx";
import Menu from "../../widgets/Menu/Menu.jsx";
import "./productList.scss"
const ProductList = () => {
	return (
		<div className="productsPage">
			<Cards/>
		</div>
	)
}
export default ProductList