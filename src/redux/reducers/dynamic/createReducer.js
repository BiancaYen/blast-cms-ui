// Dynamic Create

// State used by: DynamicCreate

import { handleActions } from 'redux-actions';

// Actions
import * as actions from '../../actions/dynamic/createActions';

// State update
import {
    submitToggleTrue,
    submitToggleFalse
} from '../../utils/stateUpdate';

// Initial State
const initialState = {
    data: {},
    submit: false,
    validationSchema: {
    }
};

const userReducer = handleActions(
    {
        [actions.postSubmitting]: submitToggleTrue,
        [actions.postFailed]: submitToggleFalse,
        [actions.postSuccess]: submitToggleFalse
    },
    initialState
);

export default userReducer;
