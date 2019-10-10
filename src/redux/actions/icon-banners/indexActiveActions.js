import { createAction } from 'redux-actions';

import actionTypes from '../actionTypes';
import { iconBannersIndexActive as reducerName } from '../../reducers/reducerNames';

// Actions
import getBannersShared from './sharedActions';
import { getBannersInactive } from './indexInactiveActions';

// Api
import { BannersApi } from '../../../api';

// Action Types
const types = actionTypes(reducerName);

const getFailed = createAction(types.getFailed);
const getLoading = createAction(types.getLoading);
const getSuccess = createAction(types.getSuccess);

const getBannersActive = getBannersShared(reducerName, BannersApi.getIconBannersActive);

const deactivateBanner = ({ id, name }) => (dispatch) => {
    dispatch({
        callApiClient: () => BannersApi.deactivateIconBanners([id]),
        reducerName,
        requestType: 'deactivate',
        dispatchFromPayload: () => {
            dispatch(getBannersActive());
            dispatch(getBannersInactive());

            return {
                notificationDetail: name
            };
        }
    });
};

const deactivateBanners = bannersIds => (dispatch) => {
    dispatch({
        callApiClient: () => BannersApi.deactivateIconBanners(bannersIds),
        reducerName,
        requestType: 'deactivate',
        dispatchFromPayload: () => {
            dispatch(getBannersActive());
            dispatch(getBannersInactive());

            return {
                notificationDetail: `${bannersIds.length} Icon Banners`
            };
        }
    });
};

export {
    deactivateBanner,
    deactivateBanners,
    getBannersActive,
    getFailed,
    getLoading,
    getSuccess
};
