import { createStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";

const styles = (theme: Theme) =>
    createStyles({
        title: {
            margin: theme.spacing(4, 0, 0, 0),
            textAlign: "center",
            userSelect: "none"
        },
        "notification-center-container": {
            padding: theme.spacing(1, 2, 3, 2)
        }
    });

export default styles;
