// Dynamic Meta Actions

import { createAction } from 'redux-actions';

import actionTypes from '../actionTypes';
import { dynamicMeta as reducerName } from '../../reducers/reducerNames';

// Api
import { DynamicApi } from '../../../api';

// Action Types
const types = actionTypes(reducerName);

const getFailed = createAction(types.getFailed);
const getLoading = createAction(types.getLoading);
const getSuccess = createAction(types.getSuccess);

const getIndex = url => (dispatch) => {
    dispatch({
        callApiClient: () => DynamicApi.getIndex(url),
        reducerName,
        requestType: 'get',
        dispatchFromPayload: data => ({
            data: data.map(({ id, attributes }) => {
                const object = {
                    id
                };
                Object.entries(attributes).forEach(([key, value]) => {
                    object[key] = value;
                });
                return object;
            }),
            url
        })
    });
};

export {
    // Action Types
    getFailed,
    getLoading,
    getSuccess,
    // Actions
    getIndex
};
