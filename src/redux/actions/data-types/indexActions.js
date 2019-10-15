import { createAction } from 'redux-actions';

import actionTypes from '../actionTypes';
import { settingsIndex as reducerName } from '../../reducers/reducerNames';

// Api
import { EntitiesApi } from '../../../api';

// Action Types
const types = actionTypes(reducerName);

const getFailed = createAction(types.getFailed);
const getLoading = createAction(types.getLoading);
const getSuccess = createAction(types.getSuccess);


const getIndex = () => (dispatch) => {
    dispatch({
        callApiClient: () => EntitiesApi.getIndex(),
        reducerName,
        requestType: 'get',
        dispatchFromPayload: data => ({
            data: data.map(({
                id,
                attributes: {
                    name = ''
                } = {},
                data_types: dataTypes
            }) => ({
                id,
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

export {
    // Action Types
    getFailed,
    getLoading,
    getSuccess,
    // Action
    getIndex
};