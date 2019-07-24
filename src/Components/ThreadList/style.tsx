import { createStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";

const styles = (theme: Theme) =>
    createStyles({
        root: {
            width: "100%",
            marginTop: theme.spacing(3)
        },
        "not-show-outline": {
            boxShadow: "0 0 0"
        }
    });

export default styles;
