import ApiClient from './ApiClient';

const url = 'relationship_types';

class RelationshipTypesApi {
    getIndex = () => ApiClient.get(url);
}

export default new RelationshipTypesApi();
