import { createAction } from 'redux-actions';

import actionTypes from '../actionTypes';
import { iconBannersEdit as reducerName } from '../../reducers/reducerNames';

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

const getFailed = createAction(types.getFailed);
const getLoading = createAction(types.getLoading);
const getSuccess = createAction(types.getSuccess);

const getIconBanner = bannerId => (dispatch) => {
    dispatch({
        callApiClient: () => BannersApi.getSingleIconBanner(bannerId),
        reducerName,
        requestType: 'get',
        dispatchFromPayload: ({
            id,
            attributes: {
                bannerName = '',
                bannerText = '',
                bannerSubtext = '',
                bannerCtaTitle = '',
                redirectUrl = '',
                bannerImageUrl = '',
                templates = []
            }
        }) => ({
            id,
            bannerFile: bannerImageUrl,
            bannerName,
            bannerText,
            bannerSubtext,
            bannerCtaTitle,
            redirectUrl,
            templates: templates.map(({ id: templateId }) => templateId)
        })
    });
};

const postUpdateIconBanner = (id, data, { setErrors: setFormErrors }) => (dispatch) => {
    const formData = new FormData();
    const {
        bannerName,
        bannerText,
        bannerSubtext,
        bannerCtaTitle,
        redirectUrl,
        bannerFile,
        templates
    } = data;

    formData.append('banner_name', bannerName);
    formData.append('banner_text', bannerText);
    formData.append('banner_subtext', bannerSubtext);
    formData.append('banner_cta_title', bannerCtaTitle);
    formData.append('redirect_url', redirectUrl);

    if (typeof bannerFile !== 'string') {
        formData.append('banner_file', bannerFile);
    }

    templates.forEach((template) => {
        formData.append('templates[]', template);
    });


    dispatch({
        callApiClient: () => BannersApi.updateIconBanner(id, formData),
        reducerName,
        requestType: 'update',
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
    getFailed,
    getLoading,
    getSuccess,
    postFailed,
    postSubmitting,
    postSuccess,
    getIconBanner,
    postUpdateIconBanner
};
