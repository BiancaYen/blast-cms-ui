// Hero Banners Inactive

// State used by: HeroBannersIndex

import { handleActions } from 'redux-actions';

// Actions
import * as actions from '../../actions/hero-banners/indexInactiveActions';

// State update
import {
    collectionUpdate,
    loadingToggleTrue,
    loadingToggleFalse
} from '../../utils/stateUpdate';

// Initial State
const initialState = {
    loading: true,
    data: []
};

const reducer = handleActions(
    {
        [actions.getLoading]: loadingToggleTrue,
        [actions.getFailed]: loadingToggleFalse,
        [actions.getSuccess]: collectionUpdate
    },
    initialState
);

export default reducer;
