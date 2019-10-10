import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Notifications } from 'hyvejs-features';

// Styles
import AppWrapper from './styles';

// Components
import NotificationsWrapper from '../components/notifications/NotificationsWrapper';

// Utils
import renderHeaderLink from '../utils/renderHeaderLink';

const faviconStandard = {
    rel: 'icon',
    type: 'image/png',
    sizes: '32x32',
    href: '/favicon/favicon.ico'
};

const faviconSafari = {
    rel: 'mask-icon',
    color: '#5bbad5',
    href: '/favicon/safari-pinned-tab.svg'
};

const manifest = {
    rel: 'manifest',
    href: '/favicon/manifest.json'
};

// Prop types
const propTypes = {
    children: PropTypes.node.isRequired
};

class App extends Component {
    static propTypes = {
        children: PropTypes.node.isRequired
    };

    constructor(props) {
        super(props);

        renderHeaderLink(faviconStandard);
        renderHeaderLink(faviconSafari);
        renderHeaderLink(manifest);
    }

    render() {
        const { children } = this.props;

        return (
            <AppWrapper>
                <Notifications />
                <NotificationsWrapper />
                {children}
            </AppWrapper>
        );
    }
}

App.propTypes = propTypes;

export default App;
