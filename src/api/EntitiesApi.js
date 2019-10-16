import ApiClient from './ApiClient';

const url = 'entities';

class EntitiesApi {
    getIndex = () => ApiClient.get(url);

    postActivate = id => ApiClient.post(`${url}/${id}/activate`);

    postCreate = data => ApiClient.post(url, data);

    postDeactivate = id => ApiClient.post(`${url}/${id}/deactivate`);

    postDelete = id => ApiClient.post(`${url}/${id}/delete`);
}

export default new EntitiesApi();
