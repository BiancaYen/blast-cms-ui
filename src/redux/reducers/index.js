import { combineReducers } from 'redux';
import { notificationReducer } from 'hyvejs-features';

// Application Data
// Auth
import auth from './auth';

// Features
import dataTypes from './data-types';
import dynamic from './dynamic';
import entities from './entities';
import images from './images';
import relationshipTypes from './relationship-types';

// User
import user from './user';

const reducer = combineReducers({
    auth,
    dataTypes,
    dynamic,
    entities,
    images,
    relationshipTypes,
    notificationReducer,
    user
});

export default reducer;
