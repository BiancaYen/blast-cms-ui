import ApiClient from './ApiClient';

class DynamicApi {
    getIndex = url => ApiClient.get(`cms/${url}`);

    getSingle = (url, id) => ApiClient.get(`cms/${url}/${id}`);

    postCreate = (url, data) => ApiClient.post(`cms/${url}/`, data);

    postDelete = (url, id) => ApiClient.post(`cms/${url}/${id}/delete`);

    postEdit = (url, id, data) => ApiClient.post(`cms/${url}/${id}`, data);
}

export default new DynamicApi();
