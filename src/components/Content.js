import React from 'react'
import routes from "../routes";
import { Route, Switch } from "react-router-dom";
import Footer from './Footer'

const Content = () => {
    return (
        <div id="layoutSidenav_content">
            <main>
                <Switch>{HandleRoute(routes)}</Switch>
            </main>
            <Footer />
        </div>
    )
}

const HandleRoute = (routes) => {
    var result = null;
    if (routes.length > 0) {
        result = routes.map((item, index) => {
            return (
                <Route key={index} path={item.path} exact={item.exact}>
                    {item.component}
                </Route>
            );
        });
    }
    return result;
};

export default Content
