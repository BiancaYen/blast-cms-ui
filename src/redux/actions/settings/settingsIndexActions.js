import { createAction } from 'redux-actions';

import actionTypes from '../actionTypes';
import { settingsIndex as reducerName } from '../../reducers/reducerNames';

// Api
import { SettingsApi } from '../../../api';

// Utils
import formatSettingsResponseData from '../utils/formatSettingsResponseData';

// Action Types
const types = actionTypes(reducerName);

const getFailed = createAction(types.getFailed);
const getLoading = createAction(types.getLoading);
const getSuccess = createAction(types.getSuccess);


const getSettings = () => (dispatch) => {
    dispatch({
        callApiClient: () => SettingsApi.getSettings(),
        reducerName,
        requestType: 'get',
        dispatchFromPayload: data => formatSettingsResponseData(data)
    });
};

export {
    getFailed,
    getLoading,
    getSettings,
    getSuccess
};
