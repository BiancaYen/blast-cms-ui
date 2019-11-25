// Dynamic Edit Actions

import { createAction } from 'redux-actions';

import actionTypes from '../actionTypes';
import { dynamicEdit as reducerName } from '../../reducers/reducerNames';

// Api
import { DynamicApi } from '../../../api';

// Actions
import { getIndex } from './indexActions';
import { getIndex as getMetaIndex } from './metaActions';

// Utils
import browserHistory from '../../../utils/browserHistory';
import formatPostData from './formatPostData';

// Action Types
const types = actionTypes(reducerName);

const postFailed = createAction(types.postFailed);
const postSubmitting = createAction(types.postSubmitting);
const postSuccess = createAction(types.postSuccess);

const getFailed = createAction(types.getFailed);
const getLoading = createAction(types.getLoading);
const getSuccess = createAction(types.getSuccess);

const getEdit = ({ id: singleId, url }) => (dispatch) => {
    dispatch({
        callApiClient: () => DynamicApi.getSingle(url, singleId),
        reducerName,
        requestType: 'get',
        dispatchFromPayload: ({ id, attributes }) => {
            const object = {
                id
            };
            Object.entries(attributes).forEach(([key, value]) => {
                object[key] = value;
            });
            return object;
        }
    });
};

const postEdit = ({
    data,
    id,
    setFormErrors,
    url
}) => (dispatch) => {
    dispatch({
        callApiClient: () => DynamicApi.postEdit(url, id, formatPostData(data)),
        reducerName,
        requestType: 'edit',
        setFormErrors,
        dispatchFromPayload: () => {
            dispatch(getIndex(url));
            dispatch(getMetaIndex(url));

            browserHistory.push(`/${url}`);
            return {
                notificationDetail: `"${data.name || data.title || 'The Entity'}"`
            };
        }
    });
};

export {
    // Action Types
    getFailed,
    getLoading,
    getSuccess,
    postFailed,
    postSubmitting,
    postSuccess,
    // Actions
    getEdit,
    postEdit
};
