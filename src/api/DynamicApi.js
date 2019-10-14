import ApiClient from './ApiClient';

class DynamicApi {
    getIndex = url => ApiClient.get(url);

    getSingle = (url, id) => ApiClient.get(`${url}/${id}`);

    postCreate = (url, data) => ApiClient.post(`${url}/`, data);

    postDelete = (url, id) => ApiClient.post(`${url}/${id}/delete`);

    postEdit = (url, id, data) => ApiClient.post(`${url}/${id}`, data);
}

export default new DynamicApi();
