import ApiClient from './ApiClient';

const url = 'images';

class ImagesApi {
    getIndex = () => ApiClient.get(url);

    postCreate = data => ApiClient.post(url, data);

    postDelete = id => ApiClient.post(`${url}/${id}/delete`);
}

export default new ImagesApi();
