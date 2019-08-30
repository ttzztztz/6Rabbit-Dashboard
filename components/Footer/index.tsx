import React from "react";

import Grid from "@material-ui/core/Grid";

import { VERSION, ICP_BEIAN, GONGAN_BEIAN } from "../../consts";
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
                        <div>
                            Powered By <strong>6Rabbit</strong> {VERSION}
                        </div>
                        <div>
                            <a href="https://www.upyun.com/" target="_blank" rel="noopener">
                                <img src="/static/upaiyun.png" />
                            </a>
                        </div>
                    </Grid>
                    <Grid item xs className={classes["footer-right"]}>
                        <div>
                            <a href="http://beian.miit.gov.cn/" target="_blank" rel="noopener noreferrer">
                                {ICP_BEIAN}
                            </a>
                        </div>
                        <div>
                            <a href="http://www.beian.gov.cn/" target="_blank" rel="noopener noreferrer">
                                {GONGAN_BEIAN}
                            </a>
                        </div>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default withStyles(styles)(Footer);
