import blue from "@material-ui/core/colors/blue";
import purple from "@material-ui/core/colors/purple";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

const blurObj = {
    backdropFilter: "saturate(180%) blur(20px)"
};

const theme = createMuiTheme({
    palette: {
        primary: blue,
        secondary: purple
    },
    overrides: {
        MuiMenu: {
            paper: { backgroundColor: "#FFFFFFCC", ...blurObj }
        },
        MuiDialog: {
            root: blurObj,
            paper: {
                opacity: 0.85
            }
        },
        MuiSnackbar: {
            root: blurObj
        }
    }
});

export default theme;
