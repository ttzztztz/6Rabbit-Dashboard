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
            <div className={classes.paper}>
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        Powered By <strong>6Rabbit</strong> {VERSION}
                    </Grid>
                    <Grid item xs={6} className={classes["footer-right"]}>
                        <p>
                            <a href="http://beian.miit.gov.cn/" target="_blank">
                                {ICP_BEIAN}
                            </a>
                        </p>
                        <p>
                            <a href="http://www.beian.gov.cn/" target="_blank">
                                {GONGAN_BEIAN}
                            </a>
                        </p>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default withStyles(styles)(Footer);
