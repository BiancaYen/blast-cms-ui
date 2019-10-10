import { createAction } from 'redux-actions';

import actionTypes from '../actionTypes';
import { heroBannersCreate as reducerName } from '../../reducers/reducerNames';

// Api
import { BannersApi } from '../../../api';

// Utils
import browserHistory from '../../../utils/browserHistory';

// Actions
import { getBannersActive } from './indexActiveActions';
import { getBannersInactive } from './indexInactiveActions';

// Action Types
const types = actionTypes(reducerName);

const postFailed = createAction(types.postFailed);
const postSubmitting = createAction(types.postSubmitting);
const postSuccess = createAction(types.postSuccess);

const postCreateHeroBanner = (data, { setErrors: setFormErrors }) => (dispatch) => {
    const formData = new FormData();
    const {
        active,
        bannerName,
        bannerText,
        bannerCtaTitle,
        redirectUrl,
        bannerFile,
        templates
    } = data;

    formData.append('banner_name', bannerName);
    formData.append('banner_text', bannerText);
    formData.append('banner_cta_title', bannerCtaTitle);
    formData.append('redirect_url', redirectUrl);
    formData.append('banner_file', bannerFile);
    formData.append('active', active);

    templates.forEach((template) => {
        formData.append('templates[]', template);
    });


    dispatch({
        callApiClient: () => BannersApi.createHeroBanner(formData),
        reducerName,
        requestType: 'create',
        setFormErrors,
        dispatchFromPayload: () => {
            dispatch(getBannersActive());
            dispatch(getBannersInactive());

            browserHistory.push('/hero_banners');
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
    postCreateHeroBanner
};
