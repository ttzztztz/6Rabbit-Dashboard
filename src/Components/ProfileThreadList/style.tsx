import { createStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";

const styles = (theme: Theme) =>
    createStyles({
        title: {
            display: "flex",
            justifyContent: "center",
            margin: theme.spacing(1.5)
        },
        "profile-thread-list-container": {
            padding: theme.spacing(2, 1)
        }
    });

export default styles;
