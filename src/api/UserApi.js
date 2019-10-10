import ApiClient from './ApiClient';

class UserApi {
    getUser = () => ApiClient.get('v1/user');
}

export default new UserApi();
