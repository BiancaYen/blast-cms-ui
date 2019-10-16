// Entities Index Reducer

// State used by: Entities

import { handleActions } from 'redux-actions';

// Actions
import * as actions from '../../actions/entities/indexActions';

// State update
import {
    loadingToggleFalse,
    loadingToggleTrue,
    collectionUpdate,
    submitToggleFalse,
    submitToggleTrue
} from '../../utils/stateUpdate';

// Initial State
const initialState = {
    loading: true,
    data: [],
    submit: false
};

const indexReducer = handleActions(
    {
        [actions.getFailed]: loadingToggleFalse,
        [actions.getLoading]: loadingToggleTrue,
        [actions.getSuccess]: collectionUpdate,
        [actions.postFailed]: submitToggleFalse,
        [actions.postSubmitting]: submitToggleTrue,
        [actions.postSuccess]: submitToggleFalse
    },
    initialState
);

export default indexReducer;
