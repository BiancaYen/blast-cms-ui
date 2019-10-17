// Entities Index Reducer

// State used by: Entities

import { handleActions } from 'redux-actions';

// Actions
import * as actions from '../../actions/dynamic/indexActions';

// State update
import {
    loadingToggleFalse,
    loadingToggleTrue,
    collectionUpdate
} from '../../utils/stateUpdate';

// Initial State
const initialState = {
    loading: true,
    data: []
};

const indexReducer = handleActions(
    {
        [actions.getFailed]: loadingToggleFalse,
        [actions.getLoading]: loadingToggleTrue,
        [actions.getSuccess]: collectionUpdate
    },
    initialState
);

export default indexReducer;
