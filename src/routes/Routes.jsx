import React from 'react';
import { Switch } from 'react-router-dom';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';

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


import HeroBannersIndex from '../features/hero-banners/HeroBannersIndex';
import HeroBannersCreate from '../features/hero-banners/HeroBannersCreate';
import IconBannersIndex from '../features/icon-banners/IconBannersIndex';
import IconBannersCreate from '../features/icon-banners/IconBannersCreate';
import HeroBannersEdit from '../features/hero-banners/HeroBannersEdit';
import IconBannersEdit from '../features/icon-banners/IconBannersEdit';
import Settings from '../features/settings/Settings';
import Themes from '../features/themes/Themes';

// Prop types
const propTypes = {
    location: PropTypes.instanceOf(Object).isRequired
};

const Routes = ({ location }) => (
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
        {/* Hero Banners */}
        {/*<CustomRoute*/}
        {/*    exact*/}
        {/*    path="/hero_banners"*/}
        {/*    component={AppLayout(HeroBannersIndex)}*/}
        {/*    title="Hero Banners"*/}
        {/*/>*/}
        {/*<CustomRoute*/}
        {/*    exact*/}
        {/*    path="/hero_banners/create"*/}
        {/*    component={AppLayout(HeroBannersCreate)}*/}
        {/*    title="Hero Banners"*/}
        {/*/>*/}
        {/*<CustomRoute*/}
        {/*    exact*/}
        {/*    path="/hero_banners/:id"*/}
        {/*    component={AppLayout(HeroBannersEdit)}*/}
        {/*    title="Hero Banners"*/}
        {/*/>*/}
        {/*/!* Icons Banners *!/*/}
        {/*<CustomRoute*/}
        {/*    exact*/}
        {/*    path="/icon_banners"*/}
        {/*    component={AppLayout(IconBannersIndex)}*/}
        {/*    title="Icon Banners"*/}
        {/*/>*/}
        {/*<CustomRoute*/}
        {/*    exact*/}
        {/*    path="/icon_banners/create"*/}
        {/*    component={AppLayout(IconBannersCreate)}*/}
        {/*    title="Icon Banners"*/}
        {/*/>*/}
        {/*<CustomRoute*/}
        {/*    exact*/}
        {/*    path="/icon_banners/:id"*/}
        {/*    component={AppLayout(IconBannersEdit)}*/}
        {/*    title="Icon Banners"*/}
        {/*/>*/}
        {/*/!* General Settings *!/*/}
        {/*<CustomRoute*/}
        {/*    exact*/}
        {/*    path="/settings"*/}
        {/*    component={AppLayout(Settings)}*/}
        {/*    title="General Settings"*/}
        {/*/>*/}
        {/*/!* Themes *!/*/}
        {/*<CustomRoute*/}
        {/*    exact*/}
        {/*    path="/themes"*/}
        {/*    component={AppLayout(Themes)}*/}
        {/*    title="Themes"*/}
        {/*/>*/}
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

Routes.propTypes = propTypes;

export default withRouter(Routes);
