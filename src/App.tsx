import React from "react";
import { Provider } from "react-redux";
import { Switch, BrowserRouter, Route } from "react-router-dom";

import PageFrame from "./Containers/PageFrame";
import Footer from "./Components/Footer";

import BlogView from "./Containers/Blog";
import ForumView from "./Containers/Forum";
import HomepageView from "./Containers/Homepage";
import ShopView from "./Containers/Shop";
import ThreadView from "./Containers/Thread";
import UserView from "./Containers/User";
import ProfileView from "./Containers/Profile";
import LoginView from "./Containers/Login";
import PostView from "./Containers/Post";

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
                            <Route path="/forum/:page" component={ForumView} />
                            <Route path="/blog/:page" component={BlogView} />
                            <Route path="/shop/:page" component={ShopView} />
                            <Route path="/user" component={UserView} />
                            <Route path="/thread/create" component={PostView} />
                            <Route path="/post/create/:tid" component={PostView} />
                            <Route path="/post/update/:pid" component={PostView} />
                            <Route path="/thread/update/:tid" component={PostView} />
                            <Route path="/login" component={LoginView} />
                            <Route path="/profile/:uid" component={ProfileView} />
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
