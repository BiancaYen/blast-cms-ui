import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Components
import {
    Avatar,
    ActionMenu
} from '../../components';
import UserDetails from './user-details/UserDetails';

import getImage from '../../components/avatar/getImage';

// Actions
import { postLogout } from '../../redux/actions/auth/loginActions';
import { getUser } from '../../redux/actions/user/userActions';

// Styles
import {
    AvatarButton,
    Wrapper,
    ActionMenuWrapper
} from './styles';

// State
const mapStateToProps = ({ user }) => {
    const { name } = user.data;

    return {
        name
    };
};

// Actions
const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({
        postLogout,
        getUser
    },
    dispatch)
});

// Default Props
const defaultProps = {
    name: ''
};

// Prop Types
const propTypes = {
    actions: PropTypes.shape({
        postLogout: PropTypes.func.isRequired,
        getUser: PropTypes.func.isRequired
    }).isRequired,
    name: PropTypes.string
};

const AccountSettingsMenu = ({ actions, name }) => {
    const [isActive, setIsActive] = useState(false);

    // @Todo
    useEffect(() => {
        if (!localStorage.getItem('randomAvatarIconNumber')) {
            localStorage.setItem('randomAvatarIconNumber', Math.floor(Math.random() * 6) + 1);
        }

        // if (!name) {
        //     actions.getUser();
        // }
    }, []);

    const handleLogout = () => {
        actions.postLogout();
    };

    return (
        <Wrapper>
            <UserDetails fullName={name} />
            <AvatarButton
                onClick={() => setIsActive(true)}
                role="button"
                tabIndex="0"
            >
                <Avatar image="https://scontent.fcpt7-1.fna.fbcdn.net/v/t1.0-9/56681813_100781431122454_8151280150311337984_n.jpg?_nc_cat=110&_nc_oc=AQmFh6PhuMxoFZPGA-UV4rJzY8W8xq16HF5tF-lKK54ZeL-_7oKX9eFnuweZoZ-eSGA&_nc_ht=scontent.fcpt7-1.fna&oh=f0a6608675b3b3d5afa844d79dcec896&oe=5E3B7AAE" withBorder isActive={isActive} />
            </AvatarButton>
            <ActionMenuWrapper>
                <ActionMenu
                    isActive={isActive}
                    onClickOutside={() => setIsActive(false)}
                    actions={[['Logout', handleLogout]]}
                />
            </ActionMenuWrapper>
        </Wrapper>
    );
};

AccountSettingsMenu.defaultProps = defaultProps;
AccountSettingsMenu.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(AccountSettingsMenu);
