import { convertToRaw } from 'draft-js';

const formatPostData = (data) => {
    const formattedData = {};
    Object.entries(data).forEach(([key, value]) => {
        if (typeof value === 'object' && value.getCurrentContent()) {
            formattedData[key] = JSON.stringify(convertToRaw(value.getCurrentContent()));
        } else {
            formattedData[key] = value;
        }
    });

    return formattedData;
};

export default formatPostData;
