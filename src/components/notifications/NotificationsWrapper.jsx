import React, { Component } from 'react';

// Styles
import { NotificationsWrapper as Wrapper } from './styles';

// Manager
import Notifications from './Notifications';

// Components
import Notification from './Notification';

class NotificationsWrapper extends Component {
    marginStacked = 10;
    marginOpen = 64;

    state = {
        margin: this.marginStacked,
        notifications: []
    };

    updateMargin = (newMargin = this.marginStacked) => {
        if (newMargin !== this.state.margin) {
            this.setState({ margin: newMargin });
        }
    };

    handleUpdate = (data) => {
        this.setState({ notifications: data });
    };

    collapse = () => this.updateMargin();

    open = () => this.updateMargin(this.marginOpen);

    componentDidMount() {
        Notifications.onUpdate = this.handleUpdate;
    }

    componentWillUnmount() {
        Notifications.notifications = [];
    }

    render() {
        const { notifications, margin } = this.state;

        return (
            <Wrapper
                height={notifications.length ? margin * (notifications.length + 1) : 0}
                onMouseOut={this.collapse}
                onMouseOver={this.open}
            >
                {
                    notifications.map(({ isActive, id, type, message, ...restData }, index) => (
                        <Notification
                            {...restData}
                            isActive={isActive}
                            index={index}
                            key={id}
                            margin={notifications.length <= 3 ? this.marginOpen : margin}
                            type={type}
                            onClose={() => Notifications.remove(id)}
                        >
                            {message}
                        </Notification>
                    ))
                }
            </Wrapper>
        );
    }
}

export default NotificationsWrapper;
