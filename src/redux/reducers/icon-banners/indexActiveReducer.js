// Icon Banners Active

// State used by: IconBannersIndex

import { handleActions } from 'redux-actions';

// Actions
import * as actions from '../../actions/icon-banners/indexActiveActions';

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
