import { createStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";

const styles = (theme: Theme) =>
    createStyles({
        "user-infos-container": {
            margin: theme.spacing(2, 0, 2, 0)
        }
    });

export default styles;
