import React from "react";
import styles from "./style";
import clsx from "clsx";

import { WithStyles, withStyles } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import { TITLE_PREFIX } from "../../consts";
import { IRegisterStartPayload } from "../../actions/async";

import Head from "next/head";

interface Props extends WithStyles {
    isLogin: boolean;
    login: (username: string, password: string) => void;
    register: (payload: IRegisterStartPayload) => void;
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
        }
    };

    handleChange = (key: string, method: "login" | "register") => (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            [method]: {
                ...this.state[method],
                [key]: e.target.value
            }
        });
    };

    handleRegisterBtnClick = () => {
        if (this.state.activePage === ActivePage.Login) {
            this.setState({
                activePage: ActivePage.Register
            });
        } else {
            const { register: form } = this.state;
            const { register } = this.props;
            register(form);
        }
    };
    handleLoginBtnClick = () => {
        if (this.state.activePage === ActivePage.Register) {
            this.setState({
                activePage: ActivePage.Login
            });
        } else {
            const { login: form } = this.state;
            const { login } = this.props;
            login(form.username, form.password);
        }
    };

    renderLogin = () => {
        const { classes } = this.props;
        const { username, password } = this.state.login;
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
                        margin="dense"
                        variant="outlined"
                        type="password"
                    />
                </div>
                <div className={classes["btn-container"]}>
                    <Button
                        color="primary"
                        variant="contained"
                        className={clsx(classes.button, classes.activeButton)}
                        onClick={this.handleLoginBtnClick}
                    >
                        登录
                    </Button>
                </div>
                <div className={classes["btn-container"]}>
                    <Button
                        color="secondary"
                        variant="contained"
                        className={classes.button}
                        onClick={this.handleRegisterBtnClick}
                    >
                        注册
                    </Button>
                </div>
            </>
        );
    };
    renderRegister = () => {
        const { classes } = this.props;
        const { username, password, password_repeat, email } = this.state.register;
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
                </div>
                <div className={classes["btn-container"]}>
                    <Button
                        color="primary"
                        variant="contained"
                        className={clsx(classes.button, classes.activeButton)}
                        onClick={this.handleRegisterBtnClick}
                    >
                        注册
                    </Button>
                </div>
                <div className={classes["btn-container"]}>
                    <Button
                        color="secondary"
                        variant="contained"
                        className={classes.button}
                        onClick={this.handleLoginBtnClick}
                    >
                        登录
                    </Button>
                </div>
            </>
        );
    };

    render() {
        const { classes } = this.props;
        const { activePage } = this.state;
        return (
            <Paper className={classes.root}>
                {activePage === ActivePage.Login && this.renderLogin()}
                {activePage === ActivePage.Register && this.renderRegister()}
            </Paper>
        );
    }
}

export default withStyles(styles)(Login);
