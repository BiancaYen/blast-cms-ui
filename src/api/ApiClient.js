import axios from 'axios';

// Api URL
const apiUrl = process.env.REACT_APP_API_HOST;

class ApiClient {
    getDefaultConfigs = () => {
        const configs = {
            headers: {
                Accept: 'application/json'
            }
        };

        const token = localStorage.getItem('token');

        if (token) {
            configs.headers.Authorization = `Bearer ${token}`;
        }

        return configs;
    };

    mergeConfigs(params, headers, configs) {
        const defaultConfigs = this.getDefaultConfigs();

        return {
            ...defaultConfigs,
            ...configs,
            params,
            headers: {
                ...defaultConfigs.headers,
                ...headers
            }
        };
    }

    get(uri, params = {}, headers = {}, configs = {}) {
        return axios.get(`${apiUrl}/api/${uri}`,
            this.mergeConfigs(params, headers, configs)).then(response => response.data);
    }

    post(uri, data, params = {}, headers = {}, configs = {}) {
        return axios.post(`${apiUrl}/api/${uri}`, data,
            this.mergeConfigs(params, headers, configs)).then(response => response.data);
    }

    put(uri, data, params = {}, headers = {}, configs = {}) {
        return axios.put(`${apiUrl}/api/${uri}`, data,
            this.mergeConfigs(params, headers, configs)).then(response => response.data);
    }

    delete(uri, params = {}, headers = {}, configs = {}) {
        return axios.delete(`${apiUrl}/api/${uri}`,
            this.mergeConfigs(params, headers, configs)).then(response => response.data);
    }

    upload(uri, file, data, params = {}, headers = {}, configs = {}) {
        const formData = new FormData();
        formData.append('file', file);

        // eslint-disable-next-line no-restricted-syntax
        for (const key in data) {
        // eslint-disable-next-line no-prototype-builtins
            if (data.hasOwnProperty(key)) {
                formData.append(key, data[key]);
            }
        }

        return this.post(uri, formData, params, headers, configs);
    }
}

export default new ApiClient();
