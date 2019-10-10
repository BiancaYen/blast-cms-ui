import React from 'react';
import PropTypes from 'prop-types';

// Constants
import sizes from './constants';

// Styles
import AvatarWrapper from './styles';

// Default props
const defaultProps = {
    size: sizes.small,
    withBorder: false
};

// Prop types
const propTypes = {
    image: PropTypes.string.isRequired,
    size: PropTypes.oneOf(Object.values(sizes)),
    withBorder: PropTypes.bool
};

const Avatar = ({ image, withBorder, size }) => {
    return (
        <AvatarWrapper withBorder={withBorder} size={size}>
            <img src={image} alt="User Avatar" />
        </AvatarWrapper>
    );
};

Avatar.defaultProps = defaultProps;
Avatar.propTypes = propTypes;
Avatar.sizes = sizes;

export default Avatar;
