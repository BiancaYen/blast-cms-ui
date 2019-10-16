import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import withDocumentTitle from '../../utils/withDocumentTitle';

// Styles
import { Container, Content } from './styles';

// Icons
import Glyph from '../../components/icons/Glyph';
import SettingsIcon from '../../components/icons/SettingsIcon';

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
        // Application State
        const { index: entitiesIndex } = useSelector(state => state.entities);

        useEffect(() => {
            // if (!localStorage.getItem('token')) {
            //     props.history.push('/');
            // }
        }, []);

        const { title } = props;

        return (
            <Container>
                <Navigation glyph={<Glyph />} isLoading={entitiesIndex.loading}>
                    <NavigationLink
                        label="Entities"
                        route="/entities"
                        icon={<SettingsIcon />}
                    />
                    {
                        entitiesIndex.data.map(({ id, tableName }) => (
                            <NavigationLink
                                key={id}
                                label={tableName}
                                route={`/${tableName}`}
                                icon={<SettingsIcon />}
                            />
                        ))
                    }
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
