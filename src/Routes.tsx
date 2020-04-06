import React from "react";
import { Provider } from "mobx-react";
import Router from "react-router/lib/Router";
import Route from "react-router/lib/Route";
import browserHistory from "react-router/lib/browserHistory";
import { DocumentApp } from "./Modules/Documents";

/**
 * Routes provider for the application routes
 * @param {stores}
 */
export const Routes = ({stores}) => (
    <Provider {...stores}>
        <Router history={browserHistory}>
            {/* 
                Application Docs route implementing the DocumentApp as 
                the Docs Route component 
            */}
            <Route path="docs" component={() => <DocumentApp />} />
        </Router>
    </Provider>
);
