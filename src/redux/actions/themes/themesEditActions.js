import { createAction } from 'redux-actions';

import actionTypes from '../actionTypes';
import { themes as reducerName } from '../../reducers/reducerNames';

// Api
import { ThemesApi } from '../../../api';

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

const getThemes = () => (dispatch) => {
    dispatch({
        callApiClient: () => ThemesApi.getThemes(),
        reducerName,
        requestType: 'get',
        dispatchFromPayload: data => formatSettingsResponseData(data)
    });
};

const postUpdateThemes = (settings, { setErrors: setFormErrors }) => async (dispatch) => {
    const {
        primary,
        secondary,
        infobarBackground,
        infobarText,
        topbarBackground,
        bodyBackground,
        bodyText,
        footerText,
        footerBackground,
        logoBackground,
        logoFile
    } = settings;

    const formattedData = [
        { name: 'primary', value: primary },
        { name: 'secondary', value: secondary },
        { name: 'infobar_background', value: infobarBackground },
        { name: 'infobar_text', value: infobarText },
        { name: 'topbar_background', value: topbarBackground },
        { name: 'body_background', value: bodyBackground },
        { name: 'body_text', value: bodyText },
        { name: 'footer_text', value: footerText },
        { name: 'footer_background', value: footerBackground },
        { name: 'logo_background', value: logoBackground }
    ];

    dispatch({
        callApiClient: () => ThemesApi.postUpdateThemes({
            settings: JSON.stringify(formattedData),
            logo_file: logoFile
        }),
        reducerName,
        requestType: 'edit',
        setFormErrors,
        dispatchFromPayload: () => {
            dispatch(getThemes());

            return {
                notificationDetail: 'Themes'
            };
        }
    });
};

export {
    getFailed,
    getLoading,
    getThemes,
    getSuccess,
    postFailed,
    postSubmitting,
    postSuccess,
    postUpdateThemes
};
