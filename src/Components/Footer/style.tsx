import { createStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";

const styles = (theme: Theme) =>
    createStyles({
        footer: {
            margin: theme.spacing(2),
            userSelect: "none",
            marginTop: "60px"
        },
        "footer-right": {
            "& a": {
                margin: "0",
                display: "block"
            },
            textAlign: "right"
        },
        "@media screen and (max-width:800px)": {
            "footer-right": {
                display: "none"
            }
        }
    });

export default styles;
