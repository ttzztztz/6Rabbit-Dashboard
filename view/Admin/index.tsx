import React from "react";
import styles from "./style";

import { WithStyles, withStyles } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import { withRouter, NextRouter } from "next/dist/client/router";
import Head from "next/head";

import { TITLE_PREFIX } from "../../consts";
import Deposit from "../../containers/Admin/Deposit";

interface Props extends WithStyles {
    router: NextRouter;

    isAdmin: boolean;
}

enum ActiveTab {
    Deposit
}

class Forum extends React.PureComponent<Props> {
    state = {
        activeTab: ActiveTab.Deposit
    };

    handleTabChange = (_event: React.ChangeEvent<{}>, newValue: number) => {
        this.setState({
            activeTab: newValue
        });
    };
    render() {
        const { classes, isAdmin } = this.props;
        const { activeTab } = this.state;

        if (!isAdmin) {
            return <h1>只有管理员可以访问管理面板哦！</h1>;
        } else {
            return (
                <>
                    <Head>
                        <title>
                            {TITLE_PREFIX}
                            管理面板
                        </title>
                    </Head>
                    <Paper>
                        <Tabs value={activeTab} indicatorColor="primary" textColor="primary" onChange={this.handleTabChange} centered>
                            <Tab label="充值审核" />
                        </Tabs>
                        <div className={classes["content-container"]}>{activeTab === ActiveTab.Deposit && <Deposit />}</div>
                    </Paper>
                </>
            );
        }
    }
}

export default withRouter(withStyles(styles)(Forum));
