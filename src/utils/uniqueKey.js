const map = new WeakMap();
let index = 0;

const uniqueKey = (obj) => {
    let key = map.get(obj);
    if (!key) {
        key = `unique-key-${index += 1}`;
        map.set(obj, key);
    }
    return key;
};

export default uniqueKey;
