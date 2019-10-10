// Constants
import types from '../constants/statuses';

class Notifications {
    notifications = [];

    onUpdate = () => {};

    add = ({ type = types.info, message = '', ...restData }) => {
        const id = Math.random()
            .toString(36)
            .replace('0.', '');

        this.notifications = [
            {
                id,
                type,
                message,
                isActive: true,
                ...restData
            },
            ...this.notifications
        ];

        this.onUpdate(this.notifications);

        return id;
    };

    addWithTimeout = (data, timeout = 4500) => {
        const id = this.add(data);
        setTimeout(() => {
            this.remove(id);
        }, timeout);
    };

    hide = id => this.setNotificationVisibility(id);

    show = id => this.setNotificationVisibility(id, true);

    remove = (id) => {
        this.setNotificationVisibility(id);

        setTimeout(() => {
            this.notifications = this.notifications.filter(({ id: notificationId }) => notificationId !== id);

            this.onUpdate(this.notifications);
        }, 500);
    };

    setNotificationVisibility = (id, visibility = false) => {
        this.notifications = this.notifications.map((notification) => {
            if (notification.id === id) {
                return {
                    ...notification,
                    isActive: visibility
                };
            }

            return notification;
        });

        this.onUpdate(this.notifications);
    }
}

export default new Notifications();
