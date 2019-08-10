import { createStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";

const styles = (theme: Theme) =>
    createStyles({
        textField: {
            margin: theme.spacing(1.5),
            width: "80%"
        },
        button: {
            margin: theme.spacing(1)
        },
        "setting-container": {
            padding: theme.spacing(2, 1, 2, 1),
            [theme.breakpoints.up("md")]: {
                width: "60%",
                margin: "auto"
            }
        },
        "setting-title": {
            margin: theme.spacing(4, 0, 3, 0),
            textAlign: "center",
            userSelect: "none"
        },
        "input-container": {
            margin: theme.spacing(-1, 0, 0, 2),
            display: "flex",
            flexFlow: "row wrap",
            justifyContent: "center"
        },
        "setting-submit-btn-container": {
            textAlign: "center",
            width: "100%"
        },
        "list-root": {
            width: "100%",
            display: "flex",
            "& li": {
                flexGrow: 1,
                [theme.breakpoints.up("md")]: {
                    width: "25% !important"
                }
            },
            [theme.breakpoints.down("md")]: {
                flexWrap: "wrap"
            }
        },
        "credits-title": {
            margin: theme.spacing(4, 0, 0, 0),
            textAlign: "center",
            userSelect: "none"
        },
        "credits-log-container": {
            width: "100%",
            overflowX: "auto"
        },
        "credits-log-table": {
            minWidth: "600px"
        }
    });

export default styles;
