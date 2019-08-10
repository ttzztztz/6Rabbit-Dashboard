import { createStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import { dangerColor, infoColor, successColor, warningColor } from "../../styles/Color";

const drawerWidth = 160;

const styles = (theme: Theme) =>
    createStyles({
        root: {
            display: "flex",
            maxWidth: "100%"
        },
        appBar: {
            zIndex: theme.zIndex.drawer + 1,
            transition: theme.transitions.create(["width", "margin"], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen
            })
        },
        appBarShift: {
            marginLeft: drawerWidth,
            width: `calc(100% - ${drawerWidth}px)`,
            transition: theme.transitions.create(["width", "margin"], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen
            })
        },
        menuButton: {
            marginRight: 36
        },
        hide: {
            display: "none"
        },
        drawer: {
            width: drawerWidth,
            flexShrink: 0,
            whiteSpace: "nowrap"
        },
        drawerOpen: {
            width: drawerWidth,
            transition: theme.transitions.create("width", {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen
            })
        },
        drawerClose: {
            transition: theme.transitions.create("width", {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen
            }),
            overflowX: "hidden",
            width: theme.spacing(7) + 1,
            [theme.breakpoints.down("sm")]: {
                width: "1px"
            }
        },
        toolbar: {
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            padding: "0 8px",
            ...theme.mixins.toolbar
        },
        content: {
            flexGrow: 1,
            padding: theme.spacing(3),
            maxWidth: "100%"
        },
        progess: {
            width: "100%",
            position: "fixed",
            top: "64px",
            zIndex: 9999
        },
        "post-btn": {
            transition:
                "background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms"
        },
        "post-btn-container": {
            transform: "scale(1)",
            transition: "transform 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
            position: "fixed",
            right: "40px",
            bottom: "40px",
            zIndex: 9999
        },
        success: { backgroundColor: successColor },
        error: { backgroundColor: dangerColor },
        warning: { backgroundColor: warningColor },
        info: { backgroundColor: infoColor }
    });

export default styles;
