import { createStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";

const styles = (theme: Theme) =>
    createStyles({
        table: {
            minWidth: "800px"
        },
        "table-container": {
            overflowX: "auto"
        }
    });

export default styles;
