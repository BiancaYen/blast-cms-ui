// Entities Index Reducer

// State used by: Entities

import { handleActions } from 'redux-actions';

// Actions
import * as actions from '../../actions/dynamic/metaActions';

// State update
import {
    loadingToggleFalse,
    loadingToggleTrue
} from '../../utils/stateUpdate';

// Initial State
const initialState = {
    loading: true,
    data: {}
};

const metaReducer = handleActions(
    {
        [actions.getFailed]: loadingToggleFalse,
        [actions.getLoading]: loadingToggleTrue,
        [actions.getSuccess]: (state, { payload }) => {
            return {
                ...state,
                data: {
                    ...state.data,
                    [payload.url]: payload.data
                },
                loading: false
            };
        }
    },
    initialState
);

export default metaReducer;
