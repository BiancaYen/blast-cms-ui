import ApiClient from './ApiClient';

class DynamicApi {
    getIndex = url => ApiClient.get(url);

    getSingle = (url, id) => ApiClient.get(`${url}/${id}`);

    postCreate = (url, data) => ApiClient.post(`${url}/create`, data);

    postDelete = (url, ids) => ApiClient.post(`${url}/delete`, { ids });

    postEdit = (url, id, data) => ApiClient.post(`${url}/${id}`, data);
}

export default new DynamicApi();
