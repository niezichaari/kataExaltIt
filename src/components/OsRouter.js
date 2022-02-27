import React from 'react';
import { Route, Switch, BrowserRouter } from "react-router-dom";
import App from './App';
import BeerCart from './BeerCart';
import BeerDetails from './BeerDetails';

const OsRouter = (props) => {
    return (
        <BrowserRouter>
            <React.Fragment>
                <Switch>
                    <Route path="/beerList" component={App} exact />
                    <Route path="/details" component={BeerDetails} exact />
                    <Route path="/beerCart" component={BeerCart} exact />
                    <Route path="*" component={App} exact />
                </Switch>
            </React.Fragment>
        </BrowserRouter>
    )
}
export default OsRouter;