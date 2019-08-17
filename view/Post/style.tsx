import { createStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";

const styles = (theme: Theme) =>
    createStyles({
        root: {
            padding: theme.spacing(3, 2)
        },
        title: {
            userSelect: "none",
            margin: theme.spacing(0, 0, 2, 0)
        },
        button: {
            margin: theme.spacing(1)
        },
        "btn-container": {
            display: "flex",
            justifyContent: "flex-end"
        },
        "content-container": {
            display: "flex"
        },
        "post-title": {
            flexGrow: 1,
            marginLeft: theme.spacing(0.5)
        },
        "post-forum": {
            [theme.breakpoints.up("sm")]: {
                width: "30%"
            },
            [theme.breakpoints.down("sm")]: {
                width: "98%"
            }
        },
        "post-content": {
            flexGrow: 1
        },
        "btn-icon": {
            fontSize: "16px",
            marginRight: theme.spacing(0.5)
        },
        "title-container": {
            display: "flex",
            flexFlow: "row nowrap"
        },
        "charge-container": {
            flexGrow: 1
        },
        "charge-field": {
            width: "200px",
            marginRight: "6px"
        }
    });

export default styles;
