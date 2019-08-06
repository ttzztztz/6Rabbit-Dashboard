import { createStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";

const styles = (theme: Theme) =>
    createStyles({
        "board-container": {
            height: "144px",
            userSelect: "none"
        },
        "board-info-container": {
            textAlign: "center"
        },
        "board-blur-container": {
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backdropFilter: "blur(60px)",
            "-webkit-backdrop-filter": "blur(60px)",
            backgroundColor: "rgba(255,255,255,0.25)"
        },
        "board-shadow": {
            color: "#FFF",
            textShadow: "1px 1px 5px #000"
        }
    });

export default styles;
