// Settings Index Reducer

// State used by: Settings

import { handleActions } from 'redux-actions';

// Actions
import * as actions from '../../actions/settings/settingsIndexActions';

// State update
import {
    loadingToggleFalse,
    loadingToggleTrue,
    singleResourceUpdate
} from '../../utils/stateUpdate';

// Initial State
const initialState = {
    loading: true,
    data: {
        campaignId: ''
    }
};

const userReducer = handleActions(
    {
        [actions.getFailed]: loadingToggleFalse,
        [actions.getLoading]: loadingToggleTrue,
        [actions.getSuccess]: singleResourceUpdate
    },
    initialState
);

export default userReducer;
