import { createStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";

const styles = (theme: Theme) =>
    createStyles({
        "list-root": {
            width: "100%",
            display: "flex",
            flexWrap: "wrap",
            "& li": {
                flexGrow: 1,
                [theme.breakpoints.up("md")]: {
                    width: "25% !important"
                }
            }
        }
    });

export default styles;
