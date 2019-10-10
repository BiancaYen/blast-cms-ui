import { combineReducers } from 'redux';

import create from './createReducer';
import edit from './editReducer';
import indexActive from './indexActiveReducer';
import indexInactive from './indexInactiveReducer';

const iconBanners = combineReducers({
    create,
    edit,
    indexActive,
    indexInactive
});

export default iconBanners;
