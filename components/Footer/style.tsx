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
            textAlign: "right",
            display: "flex",
            flexWrap: "wrap",
            flexDirection: "column"
        },
        "@media screen and (max-width:800px)": {
            "footer-right": {
                display: "none"
            }
        }
    });

export default styles;
