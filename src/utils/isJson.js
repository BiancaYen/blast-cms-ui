const isJson = (string) => {
    try {
        JSON.parse(string);
    } catch (error) {
        return false;
    }
    return true;
};

export default isJson;
