import React from "react";

import withRoot from "./Styles/WithRoot";
import { Provider } from "react-redux";
import { Switch } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";

import Bar from "./Containers/Bar";
import Footer from "./Components/Footer";
import Store from "./Reducers/store";

class App extends React.Component {
    render() {
        return (
            <Provider store={Store}>
                <BrowserRouter>
                    <Bar />
                    <Switch />
                    <Footer />
                </BrowserRouter>
            </Provider>
        );
    }
}

export default withRoot(App);
