import React from "react";
import { Provider } from "react-redux";
import { Switch, BrowserRouter, Route } from "react-router-dom";

import PageFrame from "./Containers/PageFrame";
import Footer from "./Components/Footer";

import BlogView from "./View/Blog";
import ForumView from "./View/Forum";
import HomepageView from "./View/Homepage";
import ShopView from "./View/Shop";
import ThreadView from "./View/Thread";
import UserView from "./View/User";

import Store from "./Reducers/store";
import withRoot from "./Styles/WithRoot";
import { VERSION, BUILD_DATE } from "./Consts";

class App extends React.Component {
    render() {
        return (
            <Provider store={Store}>
                <BrowserRouter>
                    <PageFrame>
                        <Switch>
                            <Route path="/" exact component={HomepageView} />
                            <Route path="/thread/:tid/:page" component={ThreadView} />
                            <Route path="/forum" component={ForumView} />
                            <Route path="/blog" component={BlogView} />
                            <Route path="/shop" component={ShopView} />
                            <Route path="/user" component={UserView} />
                        </Switch>
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
