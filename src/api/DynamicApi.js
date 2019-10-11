import ApiClient from './ApiClient';

class DynamicApi {
    getIndex = url => ApiClient.get(url);

    postDelete = (url, ids) => ApiClient.post(`${url}/delete`, { ids });
}

export default new DynamicApi();
