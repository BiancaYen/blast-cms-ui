import { combineReducers } from 'redux';
import { notificationReducer } from 'hyvejs-features';

// Application Data
// Auth
import auth from './auth';

// Features
import entities from './entities';
import dynamic from './dynamic';

// Not Used
import heroBanners from './hero-banners';
import iconBanners from './icon-banners';
import settings from './settings';
import themes from './themes';
import user from './user';

const reducer = combineReducers({
    auth,
    entities,
    dynamic,

    // Not used
    heroBanners,
    iconBanners,
    notificationReducer,
    settings,
    themes,
    user
});

export default reducer;
