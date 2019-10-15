import ApiClient from './ApiClient';

const url = 'data_types';

class DataTypesApi {
    getIndex = () => ApiClient.get(url);
}

export default new DataTypesApi();
