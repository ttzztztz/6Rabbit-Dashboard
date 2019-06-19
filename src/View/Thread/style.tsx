import { createStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";

const styles = (theme: Theme) =>
    createStyles({
        paperRoot: {
            padding: theme.spacing(3, 2),
            margin: theme.spacing(0, 0, 3, 0)
        }
    });

export default styles;
