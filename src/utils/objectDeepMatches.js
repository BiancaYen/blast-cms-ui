const compareArrays = (obj, source) => {
    return obj.length === source.length && obj.every(value => source.includes(value));
};

const objectDeepMatches = (obj, source) => {
    if (Array.isArray(obj) && Array.isArray(source)) {
        return compareArrays(obj, source);
    }

    if (typeof obj === 'object' && typeof source === 'object') {
        if (Object.keys(source).length) {
            return Object.keys(source).every((key) => {
                return objectDeepMatches(obj[key], source[key]);
            });
        }
        if (Object.keys(obj).length) {
            return false;
        }
    }

    return obj === source;
};

export default objectDeepMatches;
