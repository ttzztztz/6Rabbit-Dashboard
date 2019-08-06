import { createStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";

const styles = (theme: Theme) =>
    createStyles({
        root: {
            flexShrink: 0,
            color: theme.palette.text.secondary,
            marginLeft: theme.spacing(2.5),
            display: "flex",
            justifyContent: "flex-end"
        },
        "page-show-text": {
            paddingTop: "14px"
        }
    });

export default styles;
