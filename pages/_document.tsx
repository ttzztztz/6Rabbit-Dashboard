import React from "react";

import Document, { Head, Main, NextScript, DocumentContext, DocumentInitialProps } from "next/document";

import { ServerStyleSheets } from "@material-ui/styles";

import theme from "../styles/Theme";

class MyDocument extends Document {
    // static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
    //     const sheets = new ServerStyleSheets();
    //     const originalRenderPage = ctx.renderPage;

    //     ctx.renderPage = () =>
    //         originalRenderPage({
    //             enhanceApp: App => props => sheets.collect(<App {...props} />)
    //         });
    //     const initialProps = await Document.getInitialProps(ctx);

    //     return {
    //         ...initialProps,
    //         styles: [
    //             <React.Fragment key="styles">
    //                 {initialProps.styles}
    //                 {sheets.getStyleElement()}
    //             </React.Fragment>
    //         ]
    //     };
    // }

    render() {
        return (
            <html lang="cn">
                <Head>
                    <meta charSet="utf-8" />
                    <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no" />
                    <meta name="theme-color" content={theme.palette.primary.main} />
                    <link rel="shortcut icon" href="/static/favicon.ico" />
                    <link rel="manifest" href="/static/manifest.json" />
                    <link rel="stylesheet" href="/static/css/global.css" />
                    <link rel="stylesheet" href="/static/css/output.css" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
                <script src="https://cdn.vaptcha.com/v2.js"></script>
            </html>
        );
    }
}

MyDocument.getInitialProps = async (ctx: DocumentContext) => {
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
