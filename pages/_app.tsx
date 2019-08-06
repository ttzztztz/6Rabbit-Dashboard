import React from "react";
import { Provider } from "react-redux";
import { Store, AnyAction } from "redux";

import App, { Container } from "next/app";
import Head from "next/head";
import withRedux from "next-redux-wrapper";

import { ThemeProvider } from "@material-ui/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

import theme from "../styles/Theme";
import initStore from "../reducers/store";

import PageFrame from "../containers/PageFrame";

interface AppProps {
    store: Store<any, AnyAction>;
}

class RabbitApp extends App<AppProps> {
    componentDidMount() {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector("#jss-server-side");
        if (jssStyles) {
            jssStyles.parentNode!.removeChild(jssStyles);
        }
    }

    render() {
        const { Component, pageProps, store } = this.props;

        return (
            <Container>
                <Provider store={store}>
                    <Head>
                        <title>酷兔网</title>
                    </Head>
                    <ThemeProvider theme={theme}>
                        <CssBaseline />
                        <PageFrame>
                            <Component {...pageProps} />
                        </PageFrame>
                    </ThemeProvider>
                </Provider>
            </Container>
        );
    }
}

export default withRedux(initStore)(RabbitApp);
