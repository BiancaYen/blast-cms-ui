import React from 'react';
import PropTypes from 'prop-types';

// Styles
import { LoaderWrapper } from './styles';

// Default props
const defaultProps = {
    isOutlined: false
};

// Prop types
const propTypes = {
    isOutlined: PropTypes.bool
};

const Loader = ({ isOutlined }) => {
    return (
        <LoaderWrapper isOutlined={isOutlined}>
            <span />
            <span />
            <span />
        </LoaderWrapper>
    );
};

Loader.defaultProps = defaultProps;
Loader.propTypes = propTypes;

export default Loader;
