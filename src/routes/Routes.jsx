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

// Features
import EntitiesIndex from '../features/entities/EntitiesIndex';
import EntitiesCreate from '../features/entities/EntitiesCreate';
import DynamicIndex from '../features/dynamic/DynamicIndex';
import DynamicCreate from '../features/dynamic/DynamicCreate';
import DynamicEdit from '../features/dynamic/DynamicEdit';
import MediaIndex from '../features/media/MediaIndex';

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

    if (entitiesIndex.loading) {
        return (
            <div>Loading</div>
        );
    }

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
            <CustomRoute
                exact
                path="/media"
                component={AppLayout(MediaIndex)}
                title="Media"
            />
            {/* Dynamic */}
            {/* Need to map out each CRUD route separately, since placing routes within the <Fragment /> component causes problematic remount */}
            {
                entitiesIndex.data.map(({ id, name, dataTypes }) => (
                    <CustomRoute
                        dataTypes={dataTypes}
                        exact
                        key={id}
                        path={`/${name}`}
                        component={AppLayout(DynamicIndex)}
                        title={name}
                    />
                ))
            }
            {
                entitiesIndex.data.map(({ id, name, dataTypes }) => (
                    <CustomRoute
                        dataTypes={dataTypes}
                        exact
                        key={id}
                        path={`/${name}/create`}
                        component={AppLayout(DynamicCreate)}
                        title={name}
                    />
                ))
            }
            {
                entitiesIndex.data.map(({ id, name, dataTypes }) => (
                    <CustomRoute
                        dataTypes={dataTypes}
                        exact
                        key={id}
                        path={`/${name}/:id`}
                        component={AppLayout(DynamicEdit)}
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
