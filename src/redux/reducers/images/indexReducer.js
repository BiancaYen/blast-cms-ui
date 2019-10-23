// Images Index Reducer

// State used by: MediaIndex > ImagesTab

import { handleActions } from 'redux-actions';

// Actions
import * as actions from '../../actions/images/indexActions';

// State update
import {
    collectionUpdate,
    loadingToggleFalse,
    loadingToggleTrue,
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
