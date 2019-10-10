// User
// User Reducer

// State used by: Layout component, loginActions

import { handleActions } from 'redux-actions';

// Actions
import * as actions from '../../actions/user/userActions';

// State update
import {
    loadingToggleTrue,
    loadingToggleFalse,
    singleResourceUpdate
} from '../../utils/stateUpdate';

// Initial State
const initialState = {
    loading: true,
    data: {
        id: 0,
        name: ''
    }
};

const userReducer = handleActions(
    {
        [actions.getLoading]: loadingToggleTrue,
        [actions.getFailed]: loadingToggleFalse,
        [actions.getSuccess]: singleResourceUpdate
    },
    initialState
);

export default userReducer;
