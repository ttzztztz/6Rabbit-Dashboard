import React from "react";

import blue from "@material-ui/core/colors/blue";
import purple from "@material-ui/core/colors/purple";
import CssBaseline from "@material-ui/core/CssBaseline";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";

const theme = createMuiTheme({
    palette: {
        primary: blue,
        secondary: purple
    }
});

function withRoot<T>(Component: React.ComponentType<T>) {
    return (props: T) => (
        <MuiThemeProvider theme={theme}>
            <CssBaseline />
            <Component {...props} />
        </MuiThemeProvider>
    );
}
export default withRoot;
