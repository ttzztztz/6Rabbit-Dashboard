import { connect } from "react-redux";
import { Dispatch } from "redux";

import ProfileView from "../../view/Profile";
import { StoreState } from "../../reducers";

const mapStateToProps = ({
    user: {
        usergroup: { isAdmin }
    }
}: StoreState) => ({ isAdmin });

const mapDispatchToProps = (dispatch: Dispatch) => ({});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProfileView);
