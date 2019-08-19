import { connect } from "react-redux";
import { Dispatch } from "redux";

import UserCreditsBoardComponent from "../../components/UserCreditsBoard";
import { StoreState } from "../../reducers";
import { getUserCreditsAndUsergroupStart } from "../../actions/async";

const mapStateToProps = ({ user: { credits, golds, rmbs, usergroup } }: StoreState) => ({ credits, golds, rmbs, usergroup });

const mapDispatchToProps = (dispatch: Dispatch) => ({
    getUserCreditsAndUsergroupStart: () => dispatch(getUserCreditsAndUsergroupStart())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserCreditsBoardComponent);
