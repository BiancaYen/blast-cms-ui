import ApiClient from './ApiClient';

class SettingsApi {
    getSettings = () => ApiClient.get('v1/settings');

    postUpdateSettings = data => ApiClient.post('v1/settings', data);
}

export default new SettingsApi();
