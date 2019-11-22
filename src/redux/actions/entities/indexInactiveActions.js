// Entities Index Inactive Actions

import { createAction } from 'redux-actions';

import actionTypes from '../actionTypes';
import { entitiesIndex as reducerName } from '../../reducers/reducerNames';

// Api
import { EntitiesApi } from '../../../api';

// Action Types
const types = actionTypes(reducerName);

const getFailed = createAction(types.getFailed);
const getLoading = createAction(types.getLoading);
const getSuccess = createAction(types.getSuccess);
const postFailed = createAction(types.postFailed);
const postSubmitting = createAction(types.postSubmitting);
const postSuccess = createAction(types.postSuccess);

const getIndex = () => (dispatch) => {
    dispatch({
        callApiClient: () => EntitiesApi.getIndex(),
        reducerName,
        requestType: 'get',
        dispatchFromPayload: data => ({
            data: data.map(({
                id,
                attributes: {
                    display_name: displayName,
                    name
                } = {},
                data_types: dataTypes
            }) => ({
                id,
                displayName,
                name,
                dataTypes: dataTypes.map(({
                    attributes: {
                        component = 'Input'
                    },
                    pivot_attributes: {
                        column_name: columnName
                    }
                }) => ({
                    component,
                    columnName
                }))
            }))
        })
    });
};

const postActivate = ({ id, displayName }) => (dispatch) => {
    dispatch({
        callApiClient: () => EntitiesApi.postActivate(id),
        reducerName,
        requestType: 'activate',
        dispatchFromPayload: () => {
            dispatch(getIndex());

            return {
                notificationDetail: `"${displayName || 'The Entity'}"`
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
    getIndex,
    postActivate
};
