const toCamelCase = (string) => {
    return string.replace(/([-_][a-z])/ig, (item) => {
        return item.toUpperCase()
            .replace('-', '')
            .replace('_', '');
    });
};

export default toCamelCase;
