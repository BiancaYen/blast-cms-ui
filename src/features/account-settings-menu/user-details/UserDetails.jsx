import React from 'react';
import PropTypes from 'prop-types';

// Styles
import { UserNameCopy, OrganisationCopy, Wrapper } from './styles';

// Default Props
const defaultProps = {
    organisation: ''
};

// Prop Types
const propTypes = {
    organisation: PropTypes.string,
    fullName: PropTypes.string.isRequired
};

const UserDetails = ({ fullName, organisation }) => {
    return (
        <Wrapper>
            {organisation && <OrganisationCopy>{organisation}</OrganisationCopy>}
            <UserNameCopy>{fullName}</UserNameCopy>
        </Wrapper>
    );
};

UserDetails.defaultProps = defaultProps;
UserDetails.propTypes = propTypes;

export default UserDetails;
