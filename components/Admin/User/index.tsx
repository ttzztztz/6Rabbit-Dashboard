import React from "react";
import { Dispatch } from "redux";
import styles from "./style";

import { OptionsObject } from "notistack";

import { WithStyles, withStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";

import FrontendRequestPromise from "../../../model/FrontendRequestPromise";
import { OPTIONS_USER_INFO_PROFILE, FETCH_USER_GROUP_LIST, POST_ADMIN_USER_GROUP, FETCH_AVATAR } from "../../../consts/backend";
import { IGroup, IMyUser } from "../../../typings";
import passwordMD5 from "../../../model/PasswordMD5";

interface Props extends WithStyles {
    uid: string;

    dispatch: Dispatch;

    enqueueSnackbar: (message: string, options?: OptionsObject) => void;
}

class UserAdmin extends React.Component<Props> {
    state = {
        groupList: [] as Array<IGroup>,
        userInfo: null as null | IMyUser,
        newPassword: ""
    };

    fetchGroupList = async () => {
        const { enqueueSnackbar, dispatch } = this.props;
        const {
            data: { code, message }
        } = await FrontendRequestPromise({ url: FETCH_USER_GROUP_LIST, method: "GET" }, dispatch);

        if (code === 200) {
            this.setState({
                groupList: message
            });
        } else {
            enqueueSnackbar(message, { variant: "error" });
        }
    };
    fetchUserInfo = async () => {
        const { enqueueSnackbar, dispatch, uid } = this.props;
        const {
            data: { code, message }
        } = await FrontendRequestPromise({ url: OPTIONS_USER_INFO_PROFILE(uid), method: "POST" }, dispatch);

        if (code === 200) {
            this.setState({
                userInfo: message
            });
        } else {
            enqueueSnackbar(message, { variant: "error" });
        }
    };
    handleSubmitGroupClick = async () => {
        const { enqueueSnackbar, dispatch, uid } = this.props;
        const { userInfo } = this.state;
        if (userInfo) {
            const {
                usergroup: { gid }
            } = userInfo;

            const {
                data: { code, message }
            } = await FrontendRequestPromise(
                {
                    url: POST_ADMIN_USER_GROUP,
                    method: "POST",
                    data: {
                        uid,
                        gid
                    }
                },
                dispatch
            );

            if (code === 200) {
                enqueueSnackbar("设置成功！", { variant: "success" });
            } else {
                enqueueSnackbar(message, { variant: "error" });
            }
        }
    };
    handleProfileSubmit = async () => {
        const { dispatch, enqueueSnackbar, uid } = this.props;
        const { userInfo, newPassword } = this.state;

        const MD5_newPassword = newPassword.trim().length === 0 ? "" : passwordMD5(newPassword);
        const {
            data: { code, message }
        } = await FrontendRequestPromise(
            {
                url: OPTIONS_USER_INFO_PROFILE(uid),
                method: "PUT",
                data: {
                    ...userInfo,
                    newPassword: MD5_newPassword
                }
            },
            dispatch
        );

        if (code === 200) {
            enqueueSnackbar("设置成功！", { variant: "success" });
        } else {
            enqueueSnackbar(message, { variant: "error" });
        }
    };
    handleDeleteAvatar = async () => {
        const { enqueueSnackbar, dispatch, uid } = this.props;
        const { userInfo } = this.state;
        if (userInfo) {
            const {
                data: { code, message }
            } = await FrontendRequestPromise(
                {
                    url: FETCH_AVATAR(uid),
                    method: "DELETE"
                },
                dispatch
            );

            if (code === 200) {
                enqueueSnackbar("删除成功！", { variant: "success" });
            } else {
                enqueueSnackbar(message, { variant: "error" });
            }
        }
    };
    async componentDidMount() {
        await Promise.all([this.fetchGroupList(), this.fetchUserInfo()]);
    }

    render() {
        const { classes } = this.props;
        const { userInfo, groupList, newPassword } = this.state;

        if (userInfo === null) {
            return <></>;
        } else {
            const { realname, signature, qq, wechat, gender, email, mobile, credits, golds, rmbs } = userInfo;
            const handleChangeGid = (e: React.ChangeEvent<HTMLInputElement>) => {
                this.setState({
                    userInfo: {
                        ...this.state.userInfo,
                        usergroup: {
                            ...this.state.userInfo!.usergroup,
                            gid: e.target.value
                        }
                    }
                });
            };
            const handleChangeProfile = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
                if (key === "password") {
                    this.setState({
                        newPassword: e.target.value
                    });
                } else {
                    this.setState({
                        userInfo: {
                            ...this.state.userInfo,
                            [key]: e.target.value
                        }
                    });
                }
            };
            const handleChangeCredits = (key: "credits" | "golds" | "rmbs") => (e: React.ChangeEvent<HTMLInputElement>) => {
                const newValue = Number.parseInt(e.target.value);
                this.setState({
                    userInfo: {
                        ...this.state.userInfo,
                        [key]: key === "rmbs" ? newValue * 100 : newValue
                    }
                });
            };

            return (
                <>
                    <section>
                        <Typography variant="h5" className={classes["title"]}>
                            用户组设置
                        </Typography>
                        <div className={classes["input-container"]}>
                            <TextField
                                select
                                label="用户组"
                                className={classes.textField}
                                value={userInfo.usergroup.gid}
                                onChange={handleChangeGid}
                                margin="dense"
                                variant="outlined"
                            >
                                {groupList.map(item => (
                                    <MenuItem key={item.gid} value={item.gid}>
                                        {item.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <div className={classes["submit-btn-container"]}>
                                <Button variant="contained" color="primary" className={classes.button} onClick={this.handleSubmitGroupClick}>
                                    提交
                                </Button>
                            </div>
                        </div>
                    </section>
                    <section>
                        <Typography variant="h5" className={classes["title"]}>
                            资料设置
                        </Typography>
                        <div className={classes["input-container"]}>
                            <TextField
                                id="name"
                                label="姓名"
                                className={classes.textField}
                                value={realname}
                                onChange={handleChangeProfile("realname")}
                                margin="dense"
                                variant="outlined"
                            />
                            <TextField
                                id="gender"
                                select
                                label="性别"
                                className={classes.textField}
                                value={gender}
                                onChange={handleChangeProfile("gender")}
                                margin="dense"
                                variant="outlined"
                            >
                                {["男", "女", "其他"].map((option, index) => (
                                    <MenuItem key={index} value={index}>
                                        {option}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <TextField
                                id="email"
                                label="邮箱"
                                className={classes.textField}
                                value={email}
                                onChange={handleChangeProfile("email")}
                                margin="dense"
                                variant="outlined"
                            />
                            <TextField
                                id="qq"
                                label="QQ"
                                className={classes.textField}
                                value={qq}
                                onChange={handleChangeProfile("qq")}
                                margin="dense"
                                variant="outlined"
                            />
                            <TextField
                                id="mobile"
                                label="手机"
                                className={classes.textField}
                                value={mobile}
                                onChange={handleChangeProfile("mobile")}
                                margin="dense"
                                variant="outlined"
                            />
                            <TextField
                                id="wechat"
                                label="微信"
                                className={classes.textField}
                                value={wechat}
                                onChange={handleChangeProfile("wechat")}
                                margin="dense"
                                variant="outlined"
                            />
                            <TextField
                                id="signature"
                                label="个性签名"
                                className={classes.textField}
                                value={signature}
                                onChange={handleChangeProfile("signature")}
                                margin="dense"
                                variant="outlined"
                            />
                            <TextField
                                id="password"
                                label="新的密码"
                                className={classes.textField}
                                value={newPassword}
                                onChange={handleChangeProfile("password")}
                                margin="dense"
                                variant="outlined"
                                type="password"
                            />
                            <TextField
                                id="credits"
                                label="经验"
                                className={classes.textField}
                                value={credits}
                                onChange={handleChangeCredits("credits")}
                                margin="dense"
                                variant="outlined"
                                type="number"
                            />
                            <TextField
                                id="golds"
                                label="金币"
                                className={classes.textField}
                                value={golds}
                                onChange={handleChangeCredits("golds")}
                                margin="dense"
                                variant="outlined"
                                type="number"
                            />
                            <TextField
                                id="rmbs"
                                label="人民币"
                                className={classes.textField}
                                value={rmbs / 100.0}
                                onChange={handleChangeCredits("rmbs")}
                                margin="dense"
                                variant="outlined"
                                type="number"
                            />
                            <div className={classes["submit-btn-container"]}>
                                <Button variant="contained" color="primary" className={classes.button} onClick={this.handleProfileSubmit}>
                                    提交
                                </Button>
                                <Button variant="contained" color="secondary" className={classes.button} onClick={this.handleDeleteAvatar}>
                                    删除头像
                                </Button>
                            </div>
                        </div>
                    </section>
                </>
            );
        }
    }
}

export default withStyles(styles)(UserAdmin);
