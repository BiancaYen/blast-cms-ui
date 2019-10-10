import { createAction } from 'redux-actions';

import actionTypes from '../actionTypes';
import { user as reducerName } from '../../reducers/reducerNames';

// Api
import { UserApi } from '../../../api';

// Action Types
const types = actionTypes(reducerName);

const getLoading = createAction(types.getLoading);
const getSuccess = createAction(types.getSuccess);
const getFailed = createAction(types.getFailed);

const getUser = () => (dispatch) => {
    dispatch({
        callApiClient: () => UserApi.getUser(),
        reducerName,
        requestType: 'get',
        dispatchFromPayload: ({ id, attributes: { name } }) => ({
            id,
            name
        })
    });
};

export {
    getUser,
    getLoading,
    getSuccess,
    getFailed
};
