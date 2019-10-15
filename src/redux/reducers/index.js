import { combineReducers } from 'redux';
import { notificationReducer } from 'hyvejs-features';

// Application Data
// Auth
import auth from './auth';

// Features
import entities from './entities';
import dynamic from './dynamic';

// User
import user from './user';

const reducer = combineReducers({
    auth,
    entities,
    dynamic,
    notificationReducer,
    user
});

export default reducer;
