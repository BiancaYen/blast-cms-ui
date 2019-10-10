import toCamelCase from '../../../utils/toCamelCase';

const formatSettingsResponseData = data => data.reduce((acc, { attributes: { name, value } }) => {
    return { ...acc, [toCamelCase(name)]: value };
}, {});

export default formatSettingsResponseData;
