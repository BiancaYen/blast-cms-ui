// Data Types Index Actions

import { createAction } from 'redux-actions';

import actionTypes from '../actionTypes';
import { dataTypesIndex as reducerName } from '../../reducers/reducerNames';

// Api
import { DataTypesApi } from '../../../api';

// Action Types
const types = actionTypes(reducerName);

const getFailed = createAction(types.getFailed);
const getLoading = createAction(types.getLoading);
const getSuccess = createAction(types.getSuccess);

const getIndex = () => (dispatch) => {
    dispatch({
        callApiClient: () => DataTypesApi.getIndex(),
        reducerName,
        requestType: 'get',
        dispatchFromPayload: data => ({
            data: data.map(({
                id,
                attributes: {
                    name = '',
                    component = ''
                } = {}
            }) => ({
                id,
                name: `${name} (${component})`
            }))
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
