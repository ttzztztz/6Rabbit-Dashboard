import React from "react";

import withRoot from "./Styles/WithRoot";
import { Provider } from "react-redux";
import { Switch } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";

import { VERSION, BUILD_DATE } from "./Consts";

import PageFrame from "./Containers/PageFrame";
import Footer from "./Components/Footer";
import Store from "./Reducers/store";

class App extends React.Component {
    render() {
        return (
            <Provider store={Store}>
                <BrowserRouter>
                    <PageFrame>
                        <Switch />
                        <Footer />
                    </PageFrame>
                </BrowserRouter>
            </Provider>
        );
    }
    componentDidMount() {
        console.log(`Welcome to 6Rabbit !\n${VERSION}_${BUILD_DATE}`);
    }
}

export default withRoot(App);
