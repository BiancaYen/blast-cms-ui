import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

// Styles
import { LoaderCircle } from './styles';

// Default props
const defaultProps = {
    children: null
};

// Prop types
const propTypes = {
    children: PropTypes.node,
    isLoading: PropTypes.bool.isRequired
};

const Loader = ({ isLoading, children }) => {
    if (isLoading) {
        return (
            <Fragment>
                <LoaderCircle><span /></LoaderCircle>
                <LoaderCircle><span /></LoaderCircle>
                <LoaderCircle><span /></LoaderCircle>
            </Fragment>
        );
    }

    return children;
};

Loader.defaultProps = defaultProps;
Loader.propTypes = propTypes;

export default Loader;
