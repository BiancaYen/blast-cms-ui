import ApiClient from './ApiClient';

class ThemesApi {
    getThemes = () => ApiClient.get('v1/themes');

    postUpdateThemes = data => ApiClient.post('v1/themes', data);
}

export default new ThemesApi();
