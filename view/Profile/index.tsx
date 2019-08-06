import React from "react";
import styles from "./style";
import { WithStyles, withStyles } from "@material-ui/core";

import ProfileThreadListComponent from "../../components/ProfileThreadList";
import ProfileDetailComponent from "./ProfileDetail";
import AvatarBoard from "../../Components/AvatarBoard";

import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

interface Props extends WithStyles {
    changeTitle: (title: string) => void;
}

class User extends React.PureComponent<Props> {
    state = {
        uid: "1",
        username: "22222",
        activeTab: 0
    };
    handleTabChange = (_e: React.ChangeEvent<{}>, newValue: number) => {
        this.setState({
            activeTab: newValue
        });
    };
    render() {
        this.props.changeTitle("资料");

        const { classes } = this.props;
        const { activeTab } = this.state;

        return (
            <>
                <AvatarBoard src={"/static/avatar.png"} username="hzytql" />
                <Paper className={classes["user-infos-container"]}>
                    <Tabs
                        value={activeTab}
                        onChange={this.handleTabChange}
                        indicatorColor="primary"
                        textColor="primary"
                        centered
                    >
                        <Tab label="资料" />
                        <Tab label="帖子" />
                    </Tabs>
                    {activeTab === 0 && <ProfileDetailComponent />}
                    {activeTab === 1 && <ProfileThreadListComponent prefix="Ta的" showPurchased={false} />}
                </Paper>
            </>
        );
    }
    componentDidMount() {
        this.setState({
            uid: (this.props.match.params as { uid: string }).uid
        });
    }
}

export default withStyles(styles)(User);
