const convertBase64ToFile = (base64, fileName, fileType) => {
    const byteString = atob(base64);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const uint8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i += 1) {
        uint8Array[i] = byteString.charCodeAt(i);
    }
    const newBlob = new Blob([arrayBuffer], {
        type: `image/${fileType}`
    });
    newBlob.lastModifiedDate = new Date();
    newBlob.name = fileName;
    return newBlob;
};

export default convertBase64ToFile;
