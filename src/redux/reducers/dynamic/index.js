import { combineReducers } from 'redux';

import create from './createReducer';
import edit from './editReducer';
import index from './indexReducer';
import meta from './metaReducer';

const dynamic = combineReducers({
    create,
    edit,
    index,
    meta
});

export default dynamic;
