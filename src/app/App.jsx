import './App.scss'
import AppHeader from "../widgets/header/AppHeader.jsx";
import Footer from "../widgets/footer/Footer.jsx";
import Main from "../widgets/main/Main.jsx";
import {Suspense} from "react";
import {ProgressSpinner} from "primereact/progressspinner";
import routers from "./routers.jsx";
import {useRoutes} from "react-router-dom";
import Menu from "../widgets/Menu/Menu.jsx";
import ErrorBoundery from "../shared/utils/ErrorBoundery.jsx";

function App() {
    const routes = useRoutes(routers);

    return (

            <div className="App">


                <ErrorBoundery>
                    <AppHeader/>
                </ErrorBoundery>
                <ErrorBoundery>
                    <Main>
                        <Menu/>

                        <Suspense fallback={<ProgressSpinner/>}>
                            {routes}
                        </Suspense>
                    </Main>
                </ErrorBoundery>
                <Footer/>
            </div>


    )
}

export default App
