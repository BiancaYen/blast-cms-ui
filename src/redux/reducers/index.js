import { combineReducers } from 'redux';
import { notificationReducer } from 'hyvejs-features';

// Application Data
import auth from './auth';
import heroBanners from './hero-banners';
import iconBanners from './icon-banners';
import settings from './settings';
import themes from './themes';
import user from './user';

const reducer = combineReducers({
    auth,
    heroBanners,
    iconBanners,
    notificationReducer,
    settings,
    themes,
    user
});

export default reducer;
