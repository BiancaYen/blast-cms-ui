// Images Edit Reducer

// State used by: ImagesEditModal

import { handleActions } from 'redux-actions';

// Actions
import * as actions from '../../actions/images/editActions';

// State update
import {
    submitToggleFalse,
    submitToggleTrue
} from '../../utils/stateUpdate';

// Initial State
const initialState = {
    loading: true,
    data: {},
    submit: false,
    validationSchema: {}
};

const editReducer = handleActions(
    {
        [actions.postSubmitting]: submitToggleTrue,
        [actions.postFailed]: submitToggleFalse,
        [actions.postSuccess]: submitToggleFalse
    },
    initialState
);

export default editReducer;
