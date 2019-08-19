import React from "react";
import { Dispatch } from "redux";
import styles from "./style";

import { WithStyles, withStyles } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";

import { OptionsObject } from "notistack";
import { NextRouter, withRouter } from "next/dist/client/router";

import UserCreditsBoard from "../../../containers/UserCreditsBoard";
import { OPTIONS_MY_INFO, FETCH_OAUTH_LIST, FETCH_OAUTH_REDIRECT, DELETE_OAUTH_BIND, FETCH_AVATAR, POST_AVATAR_UPLOAD } from "../../../consts/backend";
import { IUpdateProfileForm, IUpdatePasswordForm, IOAuth, IMyUserInfoResponse } from "../../../typings";
import { MAX_UPLOAD_AVATAR_SIZE } from "../../../consts";
import { upload } from "../../../model/Upload";
import FrontendRequestPromise from "../../../model/FrontendRequestPromise";

interface Props extends WithStyles {
    router: NextRouter;
    uid: string;

    dispatch: Dispatch;
    enqueueSnackbar: (message: string, options?: OptionsObject) => void;
    updateProfile: (payload: IUpdateProfileForm) => void;
    updatePassword: (payload: IUpdatePasswordForm) => void;
    changeUserCreditsAndGroup: (payload: IMyUserInfoResponse) => void;
}

class Settings extends React.Component<Props> {
    state = {
        password: {
            oldPassword: "",
            newPassword: "",
            newPasswordRepeat: ""
        },
        profile: {
            realname: "",
            signature: "",
            qq: "",
            wechat: "",
            gender: 0,
            email: "",
            mobile: ""
        },
        oauthList: [] as Array<IOAuth>
    };
    async componentDidMount() {
        await Promise.all([this.fetchInfo(), this.fetchOAuthList()]);
    }
    fetchInfo = async () => {
        const { enqueueSnackbar, dispatch, changeUserCreditsAndGroup } = this.props;
        const {
            data: { code, message }
        } = await FrontendRequestPromise({ url: OPTIONS_MY_INFO, method: "GET" }, dispatch);

        if (code === 200) {
            this.setState({
                profile: {
                    ...message
                }
            });
            changeUserCreditsAndGroup(message);
        } else {
            enqueueSnackbar(message, { variant: "error" });
        }
    };
    fetchOAuthList = async () => {
        const { enqueueSnackbar, dispatch } = this.props;
        const {
            data: { code, message }
        } = await FrontendRequestPromise({ url: FETCH_OAUTH_LIST, method: "GET" }, dispatch);

        if (code === 200) {
            this.setState({
                oauthList: [...message]
            });
        } else {
            enqueueSnackbar(message, { variant: "error" });
        }
    };
    handleChange = (field: "password" | "profile", key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            [field]: {
                ...this.state[field],
                [key]: e.target.value
            }
        });
    };
    handleProfileSubmit = async () => {
        const { profile } = this.state;
        const { updateProfile } = this.props;
        updateProfile(profile);
    };
    handlePwdSubmit = async () => {
        const { password } = this.state;
        const { updatePassword } = this.props;
        updatePassword(password);
    };

    renderButton = (platform: string) => {
        const { enqueueSnackbar, dispatch } = this.props;
        const { oauthList } = this.state;

        if (oauthList.some(item => item.platform === platform)) {
            const handleUnbind = async () => {
                const {
                    data: { code, message }
                } = await FrontendRequestPromise(
                    {
                        url: DELETE_OAUTH_BIND(platform),
                        method: "DELETE"
                    },
                    dispatch
                );

                if (code === 200) {
                    this.setState({
                        oauthList: oauthList.reduce(
                            (previous, item) => {
                                if (item.platform !== platform) {
                                    previous.push(item);
                                }
                                return previous;
                            },
                            [] as Array<IOAuth>
                        )
                    });
                } else {
                    enqueueSnackbar(message, { variant: "error" });
                }
            };
            return (
                <Button size="small" variant="contained" color="secondary" onClick={handleUnbind}>
                    解绑
                </Button>
            );
        } else {
            const handleBind = () => {
                const { router } = this.props;
                router.push(FETCH_OAUTH_REDIRECT(platform));
            };

            return (
                <Button size="small" variant="contained" color="primary" onClick={handleBind}>
                    绑定
                </Button>
            );
        }
    };
    handleChangeAvatar = ({ target: { files } }: React.ChangeEvent<HTMLInputElement>) => {
        const { enqueueSnackbar } = this.props;

        if (files) {
            // check if file valid
            if (files.length <= 0) {
                enqueueSnackbar("未选择文件！", { variant: "error" });
                return;
            }
            const file = files[0];
            if (file.size > MAX_UPLOAD_AVATAR_SIZE) {
                const { enqueueSnackbar } = this.props;
                enqueueSnackbar("单个头像最大" + MAX_UPLOAD_AVATAR_SIZE / 1024 + "KB！", { variant: "error" });
                return;
            }
            enqueueSnackbar("头像开始上传！", { variant: "warning" });
            const formData = new FormData();
            formData.append("avatar", file);
            upload("avatar", POST_AVATAR_UPLOAD, {
                method: "POST",
                body: formData
            }).then(
                (response: string) => {
                    const { code, message } = JSON.parse(response);
                    if (code === 200) {
                        enqueueSnackbar("头像上传成功，一段时间后生效！", { variant: "success" });
                    } else {
                        enqueueSnackbar(message, { variant: "error" });
                    }
                },
                reason => {
                    enqueueSnackbar(reason.toString(), { variant: "error" });
                }
            );
        }
    };
    handleChangeAvatarClick = () => {
        if (this.uploadElementRef) {
            this.uploadElementRef.click();
        }
    };

    uploadElementRef: HTMLInputElement | null = null;
    render() {
        const { classes, uid } = this.props;
        const {
            password: { oldPassword, newPassword, newPasswordRepeat },
            profile: { realname, signature, qq, wechat, gender, email, mobile }
        } = this.state;

        return (
            <>
                <section>
                    <UserCreditsBoard />
                </section>
                <section>
                    <Typography variant="h5" className={classes["setting-title"]}>
                        个人资料
                    </Typography>
                    <div className={classes["input-container"]}>
                        <TextField
                            id="name"
                            label="姓名"
                            className={classes.textField}
                            value={realname}
                            onChange={this.handleChange("profile", "realname")}
                            margin="dense"
                            variant="outlined"
                        />
                        <TextField
                            id="gender"
                            select
                            label="性别"
                            className={classes.textField}
                            value={gender}
                            onChange={this.handleChange("profile", "gender")}
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
                            onChange={this.handleChange("profile", "email")}
                            margin="dense"
                            variant="outlined"
                        />
                        <TextField
                            id="qq"
                            label="QQ"
                            className={classes.textField}
                            value={qq}
                            onChange={this.handleChange("profile", "qq")}
                            margin="dense"
                            variant="outlined"
                        />
                        <TextField
                            id="mobile"
                            label="手机"
                            className={classes.textField}
                            value={mobile}
                            onChange={this.handleChange("profile", "mobile")}
                            margin="dense"
                            variant="outlined"
                        />
                        <TextField
                            id="wechat"
                            label="微信"
                            className={classes.textField}
                            value={wechat}
                            onChange={this.handleChange("profile", "wechat")}
                            margin="dense"
                            variant="outlined"
                        />
                        <TextField
                            id="signature"
                            label="个性签名"
                            className={classes.textField}
                            value={signature}
                            onChange={this.handleChange("profile", "signature")}
                            margin="dense"
                            variant="outlined"
                        />
                        <div className={classes["setting-submit-btn-container"]}>
                            <Button variant="contained" color="primary" className={classes.button} onClick={this.handleProfileSubmit}>
                                提交
                            </Button>
                        </div>
                    </div>
                    <Typography variant="h5" className={classes["setting-title"]}>
                        修改密码
                    </Typography>
                    <div className={classes["input-container"]}>
                        <TextField
                            id="pwd_old"
                            label="请输入旧密码"
                            className={classes.textField}
                            value={oldPassword}
                            onChange={this.handleChange("password", "oldPassword")}
                            margin="dense"
                            type="password"
                            variant="outlined"
                        />
                        <TextField
                            id="pwd_new"
                            label="请输入新密码"
                            className={classes.textField}
                            value={newPassword}
                            onChange={this.handleChange("password", "newPassword")}
                            margin="dense"
                            type="password"
                            variant="outlined"
                        />
                        <TextField
                            id="pwd_new_repeat"
                            label="请再次输入新密码"
                            className={classes.textField}
                            value={newPasswordRepeat}
                            onChange={this.handleChange("password", "newPasswordRepeat")}
                            margin="dense"
                            type="password"
                            variant="outlined"
                        />
                        <div className={classes["setting-submit-btn-container"]}>
                            <Button variant="contained" color="primary" className={classes.button} onClick={this.handlePwdSubmit}>
                                提交
                            </Button>
                        </div>
                    </div>
                    <Typography variant="h5" className={classes["setting-title"]}>
                        修改头像
                    </Typography>
                    <div className={classes["input-container"]}>由于头像存在缓存，修改后需要等待一段时间后，才会生效！</div>
                    <div className={classes["avatar-container"]}>
                        <input
                            type="file"
                            onChange={this.handleChangeAvatar}
                            id="fileUpload"
                            className={classes.none}
                            ref={elem => (this.uploadElementRef = elem)}
                            accept=".gif, .bmp, .jpeg, .png, .jpg"
                        />
                        <Avatar src={FETCH_AVATAR(uid)} className={classes["big-avatar"]} onClick={this.handleChangeAvatarClick} />
                    </div>
                    <Typography variant="h5" className={classes["setting-title"]}>
                        账号绑定
                    </Typography>
                    <div className={classes["input-container"]}>
                        <List className={classes["oauth-list-root"]}>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar>
                                        <img src="/static/oauth/github.png" alt="Github" />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary="Github" secondary={this.renderButton("Github")} />
                            </ListItem>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar>
                                        <img src="/static/oauth/qq.png" alt="Github" />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary="QQ" secondary={this.renderButton("QQ")} />
                            </ListItem>
                        </List>
                    </div>
                </section>
            </>
        );
    }
}

export default withRouter(withStyles(styles)(Settings));
