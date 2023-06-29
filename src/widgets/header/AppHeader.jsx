import "./AppHeader.scss"
import {NavLink} from "react-router-dom";
import logo from "../../shared/static/img/svg/logo.svg"
import LoginPopup from "../loginModal/loginPopup.jsx";
import {useMemo, useState} from "react";
import {Cookies, useCookies} from "react-cookie";
const AppHeader = () => {
    const k = new Cookies();
    const [isLogged, setIsLogged] = useState(() => {
        const userAuthStatus = k.get("user");
        return userAuthStatus?.isLoggedIn??false;
    });
    return (
        <header>
            <div className="logo">
                <NavLink to="./">
                    <img  src={logo} alt="POPA_PISYA"/>
                </NavLink>
                <h1>Мы - четкие</h1>

            </div>
            <nav className="navbar">
                <div>
                    <NavLink to="/">
                        <h1>Аренда</h1>
                    </NavLink>
                </div>
                <div>
                    <NavLink to="./contacts">
                        <h1>Контакты</h1>
                    </NavLink>
                </div>

                <div>
                    <NavLink to="./about">
                        <h1>О нас</h1>
                    </NavLink>
                </div>

                <div>
                    <LoginPopup isLogged = {isLogged} setIsLogged = {setIsLogged}/>
                </div>


            </nav>
        </header>
    )
}
export default AppHeader