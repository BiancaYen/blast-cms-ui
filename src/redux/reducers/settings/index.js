import { combineReducers } from 'redux';

import edit from './editReducer';
import index from './indexReducer';

const settings = combineReducers({
    edit,
    index
});

export default settings;
