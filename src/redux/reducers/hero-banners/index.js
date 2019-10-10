import { combineReducers } from 'redux';

import create from './createReducer';
import edit from './editReducer';
import indexActive from './indexActiveReducer';
import indexInactive from './indexInactiveReducer';

const heroBanners = combineReducers({
    create,
    edit,
    indexActive,
    indexInactive
});

export default heroBanners;
