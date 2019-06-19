import React from "react";

import Grid from "@material-ui/core/Grid";

import { VERSION, ICP_BEIAN, GONGAN_BEIAN } from "../../Consts";
import styles from "./style";
import { WithStyles, withStyles } from "@material-ui/core";

interface Props extends WithStyles {}

class Footer extends React.PureComponent<Props> {
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.footer}>
                <Grid container spacing={3}>
                    <Grid item xs>
                        Powered By <strong>6Rabbit</strong> {VERSION}
                    </Grid>
                    <Grid item xs className={classes["footer-right"]}>
                        <a href="http://beian.miit.gov.cn/" target="_blank" rel="noopener noreferrer">
                            {ICP_BEIAN}
                        </a>
                        <a href="http://www.beian.gov.cn/" target="_blank" rel="noopener noreferrer">
                            {GONGAN_BEIAN}
                        </a>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default withStyles(styles)(Footer);
