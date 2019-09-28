import { createStyles } from "@material-ui/core/styles";
import blue from "@material-ui/core/colors/blue";
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
            justifyContent: "space-between"
        },
        "content-container": {
            display: "flex"
        },
        "post-title": {
            flexGrow: 3,
            flexBasis: 3,
            marginLeft: theme.spacing(0.5)
        },
        "post-forum": {
            [theme.breakpoints.up("sm")]: {
                flexGrow: 1,
                flexBasis: 1
            },
            [theme.breakpoints.down("sm")]: {
                flexGrow: 2,
                flexBasis: 2
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
        },
        "attach-container": {
            margin: theme.spacing(3, 0)
        },
        snackbar: {
            margin: theme.spacing(0, 0, 2, 0)
        },
        "snackbar-success": {
            backgroundColor: blue[600]
        },
        submit: {
            [theme.breakpoints.down("sm")]: {
                padding: "0 8px !important"
            }
        },
        "submit-icon": {
            [theme.breakpoints.down("sm")]: {
                display: "none"
            }
        }
    });

export default styles;
