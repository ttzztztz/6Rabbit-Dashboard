import { createStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";

const styles = (theme: Theme) =>
    createStyles({
        "notification-center-container": {
            padding: theme.spacing(1, 2, 3, 2)
        },
        button: {
            margin: theme.spacing(1)
        },
        "control-container": {
            margin: theme.spacing(3, 0, 0, 0),
            display: "flex",
            justifyContent: "center"
        },
        "no-border-cell": {
            border: "0"
        },
        "notification-container": {
            wordBreak: "break-all",
            wordWrap: "break-word"
        }
    });

export default styles;
