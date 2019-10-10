const defaultImage = require('../../assets/shared/account-control-avatar/avatar1.png');

export default function getImage() {
    const avatarNumber = +localStorage.getItem('randomAvatarIconNumber');
    /* eslint-disable */
    try {
        return require(`../../assets/shared/account-control-avatar/avatar${avatarNumber}.png`);
    } catch (error) {
        return defaultImage;
    }
    /* eslint-enable */
}
