import ApiClient from './ApiClient';

const url = 'entities';

class EntitiesApi {
    getIndex = () => ApiClient.get(url);
}

export default new EntitiesApi();
