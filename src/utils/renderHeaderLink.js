const renderHeaderLink = (params) => {
    const link = document.createElement('link');

    Object.entries(params).forEach(([key, value]) => {
        link[key] = value;
    });

    document.head.appendChild(link);
};

export default renderHeaderLink;
