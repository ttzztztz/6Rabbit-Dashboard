import blue from "@material-ui/core/colors/blue";
import purple from "@material-ui/core/colors/purple";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

const blurObj = {
    backdropFilter: "saturate(180%) blur(20px)",
    '-webkit-backdrop-filter': "saturate(180%) blur(20px)"
};

const theme = createMuiTheme({
    palette: {
        primary: blue,
        secondary: purple
    },
    overrides: {
        // MuiMenu: {
        //     paper: {
        //         backgroundColor: "#FFFFFFCC", ...blurObj,
        //         display: "fixed",
        //     }
        // },
        MuiDialog: {
            root: blurObj,
        },
        MuiSnackbar: {
            root: blurObj
        }
    }
});

export default theme;
