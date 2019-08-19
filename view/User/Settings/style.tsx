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
        "oauth-list-root": {
            display: "flex",
            justifyContent: "center"
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
        },
        "big-avatar": {
            margin: theme.spacing(1),
            width: "72px",
            height: "72px",
            cursor: "pointer"
        },
        "avatar-container": {
            display: "flex",
            justifyContent: "center"
        },
        none: {
            display: "none"
        }
    });

export default styles;
