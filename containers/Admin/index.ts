import { connect } from "react-redux";
import { Dispatch } from "redux";

import AdminView from "../../view/Admin";
import { StoreState } from "../../reducers";

const mapStateToProps = ({
    user: {
        usergroup: { isAdmin }
    }
}: StoreState) => ({ isAdmin });

const mapDispatchToProps = (_dispatch: Dispatch) => ({});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AdminView);
