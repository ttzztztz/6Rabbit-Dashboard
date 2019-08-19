import { createStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";

const styles = (theme: Theme) =>
    createStyles({
        "list-root": {
            width: "100%",
            display: "flex",
            "& li": {
                flexGrow: 1,
                [theme.breakpoints.up("md")]: {
                    width: "25% !important"
                }
            },
            [theme.breakpoints.down("md")]: {
                flexWrap: "wrap"
            }
        }
    });

export default styles;
