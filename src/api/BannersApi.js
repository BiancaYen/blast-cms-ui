import ApiClient from './ApiClient';

const heroBannersUrl = 'v1/hero_banners';
const iconBannersUrl = 'v1/icon_banners';

class BannersApi {
    // Hero Banners
    getHeroBannersActive = () => ApiClient.get(`${heroBannersUrl}/active`);

    getHeroBannersInactive = () => ApiClient.get(`${heroBannersUrl}/inactive`);

    getSingleHeroBanner = id => ApiClient.get(`${heroBannersUrl}/${id}`);

    deleteHeroBanners = bannersIds => ApiClient.post(`${heroBannersUrl}/delete`, { bannersIds });

    activateHeroBanners = bannersIds => ApiClient.post(`${heroBannersUrl}/activate`, { bannersIds });

    deactivateHeroBanners = bannersIds => ApiClient.post(`${heroBannersUrl}/deactivate`, { bannersIds });

    createHeroBanner = data => ApiClient.post(heroBannersUrl, data);

    updateHeroBanner = (id, data) => ApiClient.post(`${heroBannersUrl}/${id}`, data);

    // Icon Banners
    getIconBannersActive = () => ApiClient.get(`${iconBannersUrl}/active`);

    getIconBannersInactive = () => ApiClient.get(`${iconBannersUrl}/inactive`);

    getSingleIconBanner = id => ApiClient.get(`${iconBannersUrl}/${id}`);

    deleteIconBanners = bannersIds => ApiClient.post(`${iconBannersUrl}/delete`, { bannersIds });

    activateIconBanners = bannersIds => ApiClient.post(`${iconBannersUrl}/activate`, { bannersIds });

    deactivateIconBanners = bannersIds => ApiClient.post(`${iconBannersUrl}/deactivate`, { bannersIds });

    createIconBanner = data => ApiClient.post(iconBannersUrl, data);

    updateIconBanner = (id, data) => ApiClient.post(`${iconBannersUrl}/${id}`, data);
}

export default new BannersApi();
