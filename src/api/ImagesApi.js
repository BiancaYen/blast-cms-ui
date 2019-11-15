import ApiClient from './ApiClient';

const url = 'images';

class ImagesApi {
    getIndex = () => ApiClient.get(url);

    postCreate = data => ApiClient.post(url, data);

    postDelete = id => ApiClient.post(`${url}/${id}/delete`);

    postEdit = (id, data) => ApiClient.post(`${url}/${id}`, data);
}

export default new ImagesApi();
