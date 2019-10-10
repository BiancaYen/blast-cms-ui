const truncate = (string, maxLength) => {
    if (typeof string !== 'string') {
        throw new Error('The value was not of type "string"');
    }

    if (string.length > maxLength) {
        return `${string.substring(0, maxLength)}...`;
    }

    return string;
};

export default truncate;
