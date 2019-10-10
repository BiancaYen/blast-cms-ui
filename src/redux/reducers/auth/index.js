import { combineReducers } from 'redux';

import acceptInvitation from './acceptInvitationReducer';
import login from './loginReducer';
import recoverPassword from './recoverPasswordReducer';
import resetPassword from './resetPasswordReducer';

const auth = combineReducers({
    acceptInvitation,
    login,
    recoverPassword,
    resetPassword
});

export default auth;
