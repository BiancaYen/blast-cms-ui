import React from 'react';
import PropTypes from 'prop-types';

// Styles
import SpinnerLoaderWrapper from './styles';

// Components
import LinearLoader from '../linear-loader/LinearLoader';
import SpinnerLoader from '../spinner-loader/SpinnerLoader';

// Constants
const types = {
    spinner: 'spinner',
    linear: 'linear'
};

// Default props
const defaultProps = {
    isLoading: false,
    isSpinnerSmall: false,
    spacing: '',
    spinnerSpacing: '0',
    type: types.linear
};

// Prop types
const propTypes = {
    children: PropTypes.node.isRequired,
    isLoading: PropTypes.bool,
    isSpinnerSmall: PropTypes.bool,
    spacing: PropTypes.string,
    spinnerSpacing: PropTypes.string,
    type: PropTypes.string
};

const Loader = ({
    children,
    isLoading,
    isSpinnerSmall,
    spacing,
    spinnerSpacing,
    type
}) => {
    if (!isLoading) {
        return children;
    }

    return type === types.spinner
        ? (
            <SpinnerLoaderWrapper spacing={spacing}>
                <SpinnerLoader size={isSpinnerSmall ? 18 : undefined} spacing={spinnerSpacing} />
            </SpinnerLoaderWrapper>
        )
        : <LinearLoader />;
};

Loader.defaultProps = defaultProps;
Loader.propTypes = propTypes;
Loader.types = types;

export default Loader;
