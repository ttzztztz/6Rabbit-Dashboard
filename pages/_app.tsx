import React from "react";
import { Provider } from "react-redux";
import { Store, AnyAction } from "redux";

import App, { AppContext } from "next/app";
import Head from "next/head";
import withRedux from "next-redux-wrapper";

import { ThemeProvider } from "@material-ui/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

import theme from "../styles/Theme";
import initStore from "../reducers/store";
import { VERSION, BUILD_DATE } from "../consts";
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
        console.log(`Welcome to 6Rabbit !\n${VERSION}_${BUILD_DATE}`);
    }

    render() {
        const { Component, pageProps, store } = this.props;

        return (
            <>
                <Head>
                    <title>酷兔网</title>
                </Head>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <Provider store={store}>
                        <PageFrame>
                            <Component {...pageProps} />
                        </PageFrame>
                    </Provider>
                </ThemeProvider>
            </>
        );
    }
}

RabbitApp.getInitialProps = async ({ Component, ctx }: AppContext) => {
    const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};

    return { pageProps };
};

export default withRedux(initStore)(RabbitApp);
