import ApiClient from './ApiClient';

const url = 'entities';

class EntitiesApi {
    getIndex = () => ApiClient.get(url);

    postCreate = data => ApiClient.post(url, data)
}

export default new EntitiesApi();
