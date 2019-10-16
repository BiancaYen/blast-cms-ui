import { createAction } from 'redux-actions';

import actionTypes from '../actionTypes';
import { relationshipTypesIndex as reducerName } from '../../reducers/reducerNames';

// Api
import { RelationshipTypesApi } from '../../../api';

// Action Types
const types = actionTypes(reducerName);

const getFailed = createAction(types.getFailed);
const getLoading = createAction(types.getLoading);
const getSuccess = createAction(types.getSuccess);

const getIndex = () => (dispatch) => {
    dispatch({
        callApiClient: () => RelationshipTypesApi.getIndex(),
        reducerName,
        requestType: 'get',
        dispatchFromPayload: data => ({
            data: data.map(({
                id,
                attributes: {
                    name = ''
                } = {}
            }) => ({
                id,
                name
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
