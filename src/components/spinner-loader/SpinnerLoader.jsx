import React from 'react';
import PropTypes from 'prop-types';

// Styles
import Wrapper from './styles';

// Default props
const defaultProps = {
    size: 58,
    spacing: '0 auto'
};

// Prop types
const propTypes = {
    size: PropTypes.number,
    spacing: PropTypes.string
};

const SpinnerLoader = ({ size, spacing }) => (
    <Wrapper size={size} spacing={spacing}>
        <div />
        <div />
        <div />
    </Wrapper>
);

SpinnerLoader.defaultProps = defaultProps;
SpinnerLoader.propTypes = propTypes;

export default SpinnerLoader;
