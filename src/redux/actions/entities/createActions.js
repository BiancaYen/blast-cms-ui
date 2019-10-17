import { createAction } from 'redux-actions';

import actionTypes from '../actionTypes';
import { entitiesCreate as reducerName } from '../../reducers/reducerNames';

// Api
import { EntitiesApi } from '../../../api';

// Utils
import browserHistory from '../../../utils/browserHistory';

// Actions
import { getIndex } from './indexActions';

// Action Types
const types = actionTypes(reducerName);

const postFailed = createAction(types.postFailed);
const postSubmitting = createAction(types.postSubmitting);
const postSuccess = createAction(types.postSuccess);

const postCreate = ({ data, setFormErrors }) => (dispatch) => {
    const {
        fields,
        tableName
    } = data;

    const formattedFields = fields.filter(field => field.name).map(({ name: fieldName, dataTypeId, isNullable }) => {
        const formattedField = {
            data_type_id: dataTypeId,
            is_nullable: isNullable,
            name: fieldName
        };
        return JSON.stringify(formattedField);
    });

    const formattedRelationships = fields.filter(field => !field.name).map(({ relationshipEntityId, relationshipTypeId }) => {
        const formattedRelationship = {
            relationship_entity_id: relationshipEntityId,
            relationship_type_id: relationshipTypeId
        };
        return JSON.stringify(formattedRelationship);
    });

    dispatch({
        callApiClient: () => EntitiesApi.postCreate({
            fields: formattedFields,
            relationships: formattedRelationships,
            table_name: tableName
        }),
        reducerName,
        requestType: 'create',
        setFormErrors,
        dispatchFromPayload: () => {
            dispatch(getIndex());

            browserHistory.push('/entities');
            return {
                notificationDetail: `The "${data.modelName || 'Entity'}"`
            };
        }
    });
};

export {
    postFailed,
    postSubmitting,
    postSuccess,
    postCreate
};
