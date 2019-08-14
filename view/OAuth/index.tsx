import React from "react";
import styles from "./style";
import { OptionsObject } from "notistack";

import { WithStyles, withStyles } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";

import Head from "next/head";
import { NextRouter, withRouter } from "next/dist/client/router";

import { TITLE_PREFIX } from "../../consts";
import { HOMEPAGE, USER_CENTER, USER_REGISTER } from "../../consts/routers";
import { IOAuthActionPayload } from "../../typings";
import AvatarBoard from "../../components/AvatarBoard";

interface Props extends WithStyles {
    router: NextRouter;

    isLogin: boolean;
    platform: string;
    code: string;
    username: string;
    avatar: string;
    active: boolean;

    enqueueSnackbar: (message: string, options?: OptionsObject) => void;
    setOAuthStore: (platform: string, code: string) => void;
    oauthClearTokenStart: (platform: string, code: string) => void;
    oauthLoginStart: (router: NextRouter, payload: IOAuthActionPayload) => void;
    oauthBindUserStart: (router: NextRouter, payload: IOAuthActionPayload) => void;
    oauthFetchInfoStart: (platform: string, code: string) => void;
}

class OAuthView extends React.PureComponent<Props> {
    componentDidMount() {
        const {
            router: { query },
            setOAuthStore,
            oauthFetchInfoStart
        } = this.props;

        const platform = query["platform"] as string;
        const code = query["code"] as string;

        setOAuthStore(platform, code);
        oauthFetchInfoStart(platform, code);
    }

    handleBindUser = () => {
        const { oauthBindUserStart, router, platform, code } = this.props;
        oauthBindUserStart(router, { platform, code });
    };
    handleAbort = () => {
        const { oauthClearTokenStart, router, platform, code } = this.props;
        oauthClearTokenStart(platform, code);
        router.push(HOMEPAGE, HOMEPAGE);
    };
    handleLogin = () => {
        const { oauthLoginStart, router, platform, code } = this.props;
        oauthLoginStart(router, { platform, code });
    };
    handleRegister = () => {
        const { router } = this.props;
        const url = USER_CENTER;
        const as = USER_REGISTER;
        router.push(url, as);
    };

    renderIsLoginView = () => {
        const { classes } = this.props;
        return (
            <>
                <Button variant="contained" color="secondary" className={classes.button} onClick={this.handleBindUser}>
                    绑定已有账号
                </Button>
                <Button variant="contained" color="primary" className={classes.button} onClick={this.handleAbort}>
                    放弃登录
                </Button>
            </>
        );
    };
    renderNotLoginView = () => {
        const { classes, active } = this.props;
        return (
            <>
                {!active && (
                    <Button variant="contained" color="secondary" className={classes.button} onClick={this.handleRegister}>
                        注册新账号
                    </Button>
                )}
                {active && (
                    <Button variant="contained" color="secondary" className={classes.button} onClick={this.handleLogin}>
                        用此账号登录
                    </Button>
                )}
                <Button variant="contained" color="primary" className={classes.button} onClick={this.handleAbort}>
                    放弃登录
                </Button>
            </>
        );
    };
    render() {
        const { classes, isLogin, username, avatar } = this.props;
        return (
            <>
                <Head>
                    <title>{TITLE_PREFIX}OAuth</title>
                </Head>
                <AvatarBoard src={avatar} username={username} />
                <Paper className={classes.root}>
                    <section className={classes["platform-btn-container"]}>
                        {isLogin && this.renderIsLoginView()}
                        {!isLogin && this.renderNotLoginView()}
                    </section>
                </Paper>
            </>
        );
    }
}

export default withRouter(withStyles(styles)(OAuthView));
