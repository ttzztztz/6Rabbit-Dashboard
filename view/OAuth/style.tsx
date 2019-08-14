import { createStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";

const styles = (theme: Theme) =>
    createStyles({
        root: {
            padding: theme.spacing(3, 2),
            margin: theme.spacing(2, 0)
        },
        "platform-btn-container": {
            display: "flex",
            justifyContent: "center"
        },
        button: {
            margin: theme.spacing(1)
        }
    });

export default styles;
