// Entities Create Actions

import { createAction } from 'redux-actions';

import actionTypes from '../actionTypes';
import { entitiesCreate as reducerName } from '../../reducers/reducerNames';

// Api
import { EntitiesApi } from '../../../api';

// Actions
import { getIndex } from './indexActions';

// Utils
import browserHistory from '../../../utils/browserHistory';

// Action Types
const types = actionTypes(reducerName);

const postFailed = createAction(types.postFailed);
const postSubmitting = createAction(types.postSubmitting);
const postSuccess = createAction(types.postSuccess);

const postCreate = ({ data, setFormErrors }) => (dispatch) => {
    const {
        fields,
        name
    } = data;

    const formattedFields = fields.filter(field => field.name).map(({ name: fieldName, dataTypeId, isNullable }) => {
        const formattedField = {
            data_type_id: dataTypeId,
            is_nullable: isNullable,
            name: fieldName
        };
        return JSON.stringify(formattedField);
    });

    const formattedRelationships = fields.filter(field => !field.name).map(({ isNullable, relationshipEntityId, relationshipTypeId }) => {
        const formattedRelationship = {
            is_nullable: isNullable,
            relationship_entity_id: relationshipEntityId,
            relationship_type_id: relationshipTypeId
        };
        return JSON.stringify(formattedRelationship);
    });

    dispatch({
        callApiClient: () => EntitiesApi.postCreate({
            fields: formattedFields,
            relationships: formattedRelationships,
            table_name: name
        }),
        reducerName,
        requestType: 'create',
        setFormErrors,
        dispatchFromPayload: () => {
            dispatch(getIndex());

            browserHistory.push('/entities');
            return {
                notificationDetail: `The "${data.name || 'Entity'}"`
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
