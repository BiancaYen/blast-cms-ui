import { createAction } from 'redux-actions';

import actionTypes from '../actionTypes';
import { iconBannersCreate as reducerName } from '../../reducers/reducerNames';

// Api
import { BannersApi } from '../../../api';

// Actions
import { getBannersActive } from './indexActiveActions';
import { getBannersInactive } from './indexInactiveActions';

// Utils
import browserHistory from '../../../utils/browserHistory';

// Action Types
const types = actionTypes(reducerName);

const postFailed = createAction(types.postFailed);
const postSubmitting = createAction(types.postSubmitting);
const postSuccess = createAction(types.postSuccess);

const postCreateIconBanner = (data, { setErrors: setFormErrors }) => (dispatch) => {
    const formData = new FormData();
    const {
        active,
        bannerCtaTitle,
        bannerFile,
        bannerName,
        bannerText,
        bannerSubtext,
        redirectUrl,
        templates
    } = data;

    formData.append('banner_name', bannerName);
    formData.append('banner_text', bannerText);
    formData.append('banner_subtext', bannerSubtext);
    formData.append('banner_cta_title', bannerCtaTitle);
    formData.append('redirect_url', redirectUrl);
    formData.append('banner_file', bannerFile);
    formData.append('active', active);

    templates.forEach((template) => {
        formData.append('templates[]', template);
    });


    dispatch({
        callApiClient: () => BannersApi.createIconBanner(formData),
        reducerName,
        requestType: 'create',
        setFormErrors,
        dispatchFromPayload: () => {
            dispatch(getBannersActive());
            dispatch(getBannersInactive());

            browserHistory.push('/icon_banners');
            return {
                notificationDetail: bannerName
            };
        }
    });
};

export {
    postFailed,
    postSubmitting,
    postSuccess,
    postCreateIconBanner
};
