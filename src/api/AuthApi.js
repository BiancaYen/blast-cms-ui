import ApiClient from './ApiClient';

class AuthApi {
    login = ({ email, password }) => ApiClient.post('auth/login', { email, password });

    logout = () => ApiClient.post('auth/logout');

    acceptInvitation = ({
        token,
        email,
        password,
        passwordConfirmation
    }) => ApiClient.post('auth/accept_invite', {
        token,
        email,
        password,
        password_confirmation: passwordConfirmation
    });

    checkToken = () => ApiClient.post('auth/check_token');

    recoverPassword = email => ApiClient.post('auth/recovery', { email });

    resetPassword = ({
        token,
        email,
        password,
        passwordConfirmation
    }) => ApiClient.post('auth/reset', {
        token,
        email,
        password,
        password_confirmation: passwordConfirmation
    });
}

export default new AuthApi();
