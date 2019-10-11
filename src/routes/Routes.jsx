import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch } from 'react-router-dom';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';

// Actions
import { getIndex as entitiesGetIndex } from '../redux/actions/entities/indexActions';

// Components
import CustomRoute from './CustomRoute';

// Layouts
import AuthLayout from '../layouts/auth/AuthLayout';
import AppLayout from '../layouts/app/AppLayout';

// Auth
import Login from '../features/auth/Login';
import RecoverPassword from '../features/auth/RecoverPassword';
import ResetPassword from '../features/auth/ResetPassword';
import AcceptInvitation from '../features/auth/AcceptInvitation';

// Entities
import EntitiesIndex from '../features/entities/EntitiesIndex';
import EntitiesCreate from '../features/entities/EntitiesCreate';

// Other
import Welcome from '../features/welcome/Welcome';
import NotFound from '../features/not-found/NotFound';

// Prop types
const propTypes = {
    location: PropTypes.instanceOf(Object).isRequired
};

const Routes = ({ location }) => {
    // Application State
    const { index: entitiesIndex } = useSelector(state => state.entities);

    const dispatch = useDispatch();

    useEffect(() => {
        if (!entitiesIndex.data.length) {
            dispatch(entitiesGetIndex());
        }
    }, []);

    return (
        <Switch key={location.key}>
            {/* Auth */}
            <CustomRoute
                exact
                path="/"
                component={AuthLayout(Login)}
                title="Login"
            />
            <CustomRoute
                exact
                path="/recover_password"
                component={AuthLayout(RecoverPassword)}
                title="Recover password"
            />
            <CustomRoute
                exact
                path="/reset_password"
                component={AuthLayout(ResetPassword)}
                title="Reset password"
            />
            <CustomRoute
                exact
                path="/accept_invitation"
                component={AuthLayout(AcceptInvitation)}
                title="Accept Invitation"
            />
            {/* Entities */}
            <CustomRoute
                exact
                path="/entities"
                component={AppLayout(EntitiesIndex)}
                title="Entities"
            />
            <CustomRoute
                exact
                path="/entities/create"
                component={AppLayout(EntitiesCreate)}
                title="Entities"
            />
            {/* Dynamic */}
            {
                entitiesIndex.data.map(({ id, name }) => (
                    <CustomRoute
                        exact
                        key={id}
                        path={`/${name}`}
                        component={AppLayout(EntitiesIndex)}
                        title={name}
                    />
                ))
            }
            <CustomRoute
                exact
                path="/welcome"
                component={AppLayout(Welcome)}
                title="Welcome"
            />
            <CustomRoute
                path="*"
                component={AppLayout(NotFound)}
                title="Not Found"
            />
        </Switch>
    );
};

Routes.propTypes = propTypes;

export default withRouter(Routes);
