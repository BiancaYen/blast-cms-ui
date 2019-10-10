import { createAction } from 'redux-actions';

import actionTypes from '../actionTypes';
import { settingsEdit as reducerName } from '../../reducers/reducerNames';

// Api
import { SettingsApi } from '../../../api';

// Utils
import formatSettingsResponseData from '../utils/formatSettingsResponseData';

// Action Types
const types = actionTypes(reducerName);

const postFailed = createAction(types.postFailed);
const postSubmitting = createAction(types.postSubmitting);
const postSuccess = createAction(types.postSuccess);

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

const postUpdateSettings = ({ campaignId }, { setErrors: setFormErrors }) => (dispatch) => {
    const formattedData = [{ name: 'campaign_id', value: campaignId }];

    dispatch({
        callApiClient: () => SettingsApi.postUpdateSettings({ settings: JSON.stringify(formattedData) }),
        reducerName,
        requestType: 'edit',
        setFormErrors,
        dispatchFromPayload: () => {
            dispatch(getSettings());

            return {
                notificationDetail: 'General Settings'
            };
        }
    });
};

export {
    getFailed,
    getLoading,
    getSettings,
    getSuccess,
    postFailed,
    postSubmitting,
    postSuccess,
    postUpdateSettings
};
