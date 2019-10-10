// Convert image to base64 format
const imageToBase64 = imageBlob => new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;

    reader.readAsDataURL(imageBlob);
});

export default imageToBase64;
