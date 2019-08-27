import React from "react";
import styles from "./style";
import { Dispatch } from "redux";
import clsx from "clsx";
import { OptionsObject } from "notistack";

import { WithStyles, withStyles } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import Head from "next/head";
import { withRouter, NextRouter } from "next/dist/client/router";

import { TITLE_PREFIX } from "../../consts";
import { USER_CENTER, USER_LOGIN, USER_REGISTER } from "../../consts/routers";
import FrontendRequestPromise from "../../model/FrontendRequestPromise";
import passwordMD5 from "../../model/PasswordMD5";
import { POST_REGISTER } from "../../consts/backend";
import Vaptcha from "../../components/Vaptcha";

interface Props extends WithStyles {
    isLogin: boolean;

    login: (username: string, password: string, token: string) => void;
    enqueueSnackbar: (message: string, options?: OptionsObject) => void;
    dispatch: Dispatch;
    router: NextRouter;
}

enum ActivePage {
    Login,
    Register
}

class Login extends React.Component<Props> {
    state = {
        activePage: ActivePage.Login,
        login: {
            username: "",
            password: ""
        },
        register: {
            username: "",
            password: "",
            password_repeat: "",
            email: ""
        },

        timestamp: new Date().getTime(),
        token: ""
    };

    componentDidMount() {
        const { router } = this.props;
        const state = router.query["state"] as string | undefined;
        if (state && state === "register") {
            this.setState({
                activePage: ActivePage.Register
            });
        }

        const handleRouteChangeStart = (url: string) => {
            if (url === USER_LOGIN) {
                this.setState({
                    activePage: ActivePage.Login
                });
            } else if (url === USER_REGISTER) {
                this.setState({
                    activePage: ActivePage.Register
                });
            }
        };
        router.events.on("routeChangeStart", handleRouteChangeStart);
    }

    handleChange = (key: string, method: "login" | "register") => (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            [method]: {
                ...this.state[method],
                [key]: e.target.value
            }
        });
    };
    handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.keyCode === 13) {
            this.handleLoginBtnClick();
        }
    };

    handleRegisterBtnClick = async () => {
        if (this.state.activePage === ActivePage.Login) {
            this.setState({
                activePage: ActivePage.Register
            });
        } else {
            const { enqueueSnackbar, dispatch } = this.props;
            const {
                register: payload,
                register: { password, password_repeat },
                token
            } = this.state;
            try {
                if (password !== password_repeat) {
                    enqueueSnackbar("两次密码不一致！", { variant: "error" });
                    return;
                } else {
                    const {
                        data: { code, message }
                    } = await FrontendRequestPromise(
                        {
                            url: POST_REGISTER,
                            method: "POST",
                            data: { ...payload, password: passwordMD5(password), password_repeat: passwordMD5(password_repeat), token }
                        },
                        dispatch
                    );

                    if (code === 200) {
                        enqueueSnackbar("注册成功！", { variant: "success" });
                        this.setState({
                            activePage: ActivePage.Login
                        });
                    } else {
                        enqueueSnackbar(message, { variant: "error" });
                    }
                }
            } finally {
                this.setState({
                    timestamp: new Date().getTime()
                });
            }
        }
    };
    handleLoginBtnClick = () => {
        if (this.state.activePage === ActivePage.Register) {
            this.setState({
                activePage: ActivePage.Login
            });
        } else {
            const { login: form, token } = this.state;
            const { login } = this.props;
            login(form.username, form.password, token);
            this.setState({
                timestamp: new Date().getTime()
            });
        }
    };

    handleChangeToken = (token: string) => {
        this.setState({
            token
        });
    };

    renderLogin = () => {
        const { classes } = this.props;
        const {
            login: { username, password },
            timestamp
        } = this.state;
        return (
            <>
                <Head>
                    <title>{TITLE_PREFIX}登录</title>
                </Head>
                <Typography variant="h5" className={classes["title-container"]}>
                    登录
                </Typography>
                <div className={classes["input-container"]}>
                    <TextField
                        id="username"
                        label="用户名"
                        className={classes.textField}
                        value={username}
                        onChange={this.handleChange("username", "login")}
                        margin="dense"
                        variant="outlined"
                    />
                    <TextField
                        id="password"
                        label="密码"
                        className={classes.textField}
                        value={password}
                        onChange={this.handleChange("password", "login")}
                        onKeyDown={this.handleKeyDown}
                        margin="dense"
                        variant="outlined"
                        type="password"
                    />
                    <Vaptcha className={classes["textField"]} onChangeToken={this.handleChangeToken} timestamp={timestamp} />
                </div>
                <div className={classes["btn-container"]}>
                    <Button color="primary" variant="contained" className={clsx(classes.button, classes.activeButton)} onClick={this.handleLoginBtnClick}>
                        登录
                    </Button>
                </div>
                <div className={classes["btn-container"]}>
                    <Button color="secondary" variant="contained" className={classes.button} onClick={this.handleRegisterBtnClick}>
                        注册
                    </Button>
                </div>
            </>
        );
    };
    renderRegister = () => {
        const { classes } = this.props;
        const {
            register: { username, password, password_repeat, email },
            timestamp
        } = this.state;
        return (
            <>
                <Head>
                    <title>{TITLE_PREFIX}注册</title>
                </Head>
                <Typography variant="h5" className={classes["title-container"]}>
                    注册
                </Typography>
                <div className={classes["input-container"]}>
                    <TextField
                        id="username"
                        label="用户名"
                        className={classes.textField}
                        value={username}
                        onChange={this.handleChange("username", "register")}
                        margin="dense"
                        variant="outlined"
                    />
                    <TextField
                        id="email"
                        label="邮箱"
                        className={classes.textField}
                        value={email}
                        onChange={this.handleChange("email", "register")}
                        margin="dense"
                        variant="outlined"
                        type="email"
                    />
                    <TextField
                        id="password"
                        label="请输入密码"
                        className={classes.textField}
                        value={password}
                        onChange={this.handleChange("password", "register")}
                        margin="dense"
                        variant="outlined"
                        type="password"
                    />
                    <TextField
                        id="password_repeat"
                        label="请再次输入密码"
                        className={classes.textField}
                        value={password_repeat}
                        onChange={this.handleChange("password_repeat", "register")}
                        margin="dense"
                        variant="outlined"
                        type="password"
                    />
                    <Vaptcha className={classes["textField"]} onChangeToken={this.handleChangeToken} timestamp={timestamp} />
                </div>
                <div className={classes["btn-container"]}>
                    <Button color="primary" variant="contained" className={clsx(classes.button, classes.activeButton)} onClick={this.handleRegisterBtnClick}>
                        注册
                    </Button>
                </div>
                <div className={classes["btn-container"]}>
                    <Button color="secondary" variant="contained" className={classes.button} onClick={this.handleLoginBtnClick}>
                        登录
                    </Button>
                </div>
            </>
        );
    };

    render() {
        const { classes, isLogin, router } = this.props;
        const { activePage } = this.state;

        if (isLogin) {
            router.push(USER_CENTER, USER_CENTER);
            return <></>;
        }

        return (
            <Paper className={classes.root}>
                {activePage === ActivePage.Login && this.renderLogin()}
                {activePage === ActivePage.Register && this.renderRegister()}
            </Paper>
        );
    }
}

export default withRouter(withStyles(styles)(Login));
