import React from "react";

import Document, { Head, Main, NextScript } from "next/document";

import { ServerStyleSheets } from "@material-ui/styles";

import theme from "../styles/Theme";

class MyDocument extends Document {
    render() {
        return (
            <html lang="cn">
                <Head>
                    <meta charSet="utf-8" />
                    <meta
                        name="viewport"
                        content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
                    />
                    <link rel="shortcut icon" href="/static/favicon.ico" />
                    <link rel="manifest" href="/static/manifest.json" />
                    <meta name="theme-color" content={theme.palette.primary.main} />
                    <link
                        rel="stylesheet"
                        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
                    />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </html>
        );
    }
}

MyDocument.getInitialProps = async ctx => {
    const sheets = new ServerStyleSheets();
    const originalRenderPage = ctx.renderPage;

    ctx.renderPage = () =>
        originalRenderPage({
            enhanceApp: App => props => sheets.collect(<App {...props} />)
        });

    const initialProps = await Document.getInitialProps(ctx);

    return {
        ...initialProps,
        styles: [
            <React.Fragment key="styles">
                {initialProps.styles}
                {sheets.getStyleElement()}
            </React.Fragment>
        ]
    };
};

export default MyDocument;
