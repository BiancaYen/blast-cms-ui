// Dynamic Edit Reducer

// State used by: DynamicEdit

import { handleActions } from 'redux-actions';

// Actions
import * as actions from '../../actions/dynamic/editActions';

// State update
import {
    loadingToggleFalse,
    loadingToggleTrue,
    singleResourceUpdate,
    submitToggleFalse,
    submitToggleTrue
} from '../../utils/stateUpdate';

// Initial State
const initialState = {
    loading: true,
    data: {},
    validationSchema: {}
};

const userReducer = handleActions(
    {
        [actions.getFailed]: loadingToggleFalse,
        [actions.getLoading]: loadingToggleTrue,
        [actions.getSuccess]: singleResourceUpdate,
        [actions.postSubmitting]: submitToggleTrue,
        [actions.postFailed]: submitToggleFalse,
        [actions.postSuccess]: submitToggleFalse
    },
    initialState
);

export default userReducer;
