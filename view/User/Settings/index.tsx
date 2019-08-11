import React from "react";
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

import RoomIcon from "@material-ui/icons/Room";
import WorkIcon from "@material-ui/icons/Work";
import BeachAccessIcon from "@material-ui/icons/BeachAccess";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";

import { OptionsObject } from "notistack";

import FrontendRequest from "../../../model/FrontendRequest";
import { FETCH_MY_INFO } from "../../../consts/backend";
import { IUpdateProfileForm, IUpdatePasswordForm } from "../../../typings";

interface Props extends WithStyles {
    enqueueSnackbar: (message: string, options?: OptionsObject) => void;
    updateProfile: (payload: IUpdateProfileForm) => void;
    updatePassword: (payload: IUpdatePasswordForm) => void;
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
            mobile: "",
            usergroup: {
                gid: "1",
                name: "",
                isAdmin: false
            },
            credits: 0,
            golds: 0,
            rmbs: 0
        }
    };
    componentDidMount() {
        this.fetchInfo();
    }
    fetchInfo = async () => {
        const { enqueueSnackbar } = this.props;
        const {
            data: { code, message }
        } = await FrontendRequest({ url: FETCH_MY_INFO, method: "GET" }).toPromise();

        if (code === 200) {
            this.setState({
                profile: {
                    ...message
                }
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

    render() {
        const { classes } = this.props;
        const {
            password: { oldPassword, newPassword, newPasswordRepeat },
            profile: { realname, signature, qq, wechat, gender, email, mobile, credits, golds, rmbs, usergroup }
        } = this.state;

        return (
            <>
                <section>
                    <List className={classes["list-root"]}>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    <RoomIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="用户组" secondary={usergroup.name} />
                        </ListItem>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    <WorkIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="经验" secondary={credits.toString()} />
                        </ListItem>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    <BeachAccessIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="金币" secondary={golds.toString()} />
                        </ListItem>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    <AttachMoneyIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="人民币" secondary={rmbs.toFixed(2)} />
                        </ListItem>
                    </List>
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
                </section>
            </>
        );
    }
}

export default withStyles(styles)(Settings);
