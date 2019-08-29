import { createStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";

const styles = (theme: Theme) =>
    createStyles({
        title: {
            margin: theme.spacing(4, 0, 3, 0),
            textAlign: "center",
            userSelect: "none"
        },
        textField: {
            margin: theme.spacing(1.5),
            width: "80%"
        },
        "submit-btn-container": {
            display: "flex",
            justifyContent: "center",
            width: "100%"
        },
        "input-container": {
            margin: theme.spacing(-1, 0, 0, 2),
            display: "flex",
            flexFlow: "row wrap",
            justifyContent: "center"
        },
        button: {
            marginRight: theme.spacing(1)
        }
    });

export default styles;
