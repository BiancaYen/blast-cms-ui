import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

// Utils
import withDocumentTitle from '../../utils/withDocumentTitle';

// Styles
import { Container, Content } from './styles';

// Icons
import Glyph from '../../components/icons/Glyph';
import Logo from '../../components/icons/Logo';
import BannersIcon from '../../components/icons/BannersIcon';
import IconBannersIcon from '../../components/icons/IconBannersIcon';
import SettingsIcon from '../../components/icons/SettingsIcon';
import ThemesIcon from '../../components/icons/ThemesIcon';

// Components
import {
    Navigation,
    NavigationLink,
    Header
} from '../../components';
import AccountSettingsMenu from '../../features/account-settings-menu/AccountSettingsMenu';

// Prop Types
const propTypes = {
    history: PropTypes.instanceOf(Object).isRequired,
    title: PropTypes.string.isRequired
};

export default (ComposedComponent) => {
    const AppLayout = (props) => {
        // @Todo Enable
        // useEffect(() => {
        //     if (!localStorage.getItem('token')) {
        //         props.history.push('/');
        //     }
        // }, []);

        const { title } = props;

        return (
            <Container>
                <Navigation glyph={<Glyph />}>
                    <NavigationLink
                        label="Entities"
                        route="/entities"
                        icon={<SettingsIcon />}
                    />
                </Navigation>
                <Content>
                    <Header title={title} actions={[<AccountSettingsMenu />]} />
                    <ComposedComponent {...props} />
                </Content>
            </Container>
        );
    };

    AppLayout.propTypes = propTypes;

    return withDocumentTitle(withRouter(AppLayout));
};
