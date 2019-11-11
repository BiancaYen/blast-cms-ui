// Dynamic Create Actions

import { createAction } from 'redux-actions';

import actionTypes from '../actionTypes';
import { dynamicCreate as reducerName } from '../../reducers/reducerNames';

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

const postCreate = ({ data, setErrors: setFormErrors, url }) => (dispatch) => {
    dispatch({
        callApiClient: () => DynamicApi.postCreate(url, formatPostData(data)),
        reducerName,
        requestType: 'create',
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
    postFailed,
    postSubmitting,
    postSuccess,
    // Actions
    postCreate
};
