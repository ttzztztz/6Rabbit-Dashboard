import { createStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";

const styles = (theme: Theme) =>
    createStyles({
        "content-container": {
            padding: theme.spacing(2, 1, 2, 1)
        }
    });

export default styles;
