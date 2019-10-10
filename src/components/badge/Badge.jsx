import React from 'react';
import PropTypes from 'prop-types';

// Styles
import BadgeWrapper from './styles';

// Prop types
const propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired
};

const Badge = ({ children }) => <BadgeWrapper>{children}</BadgeWrapper>;

Badge.propTypes = propTypes;

export default Badge;
