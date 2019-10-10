import queryString from 'qs';

const getQueryTab = (location) => {
    const query = queryString.parse(location.search, {
        ignoreQueryPrefix: true
    });

    const { tab, subTab } = query;

    return { tab, subTab };
};

export default getQueryTab;
