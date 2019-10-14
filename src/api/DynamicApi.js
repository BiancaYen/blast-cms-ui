import ApiClient from './ApiClient';

class DynamicApi {
    getIndex = url => ApiClient.get(url);

    postCreate = (url, data) => ApiClient.post(`${url}/create`, data);

    postDelete = (url, ids) => ApiClient.post(`${url}/delete`, { ids });
}

export default new DynamicApi();
