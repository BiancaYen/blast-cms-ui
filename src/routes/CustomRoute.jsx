import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';

// Default props
const defaultProps = {
    title: ''
};

// Prop types
const propTypes = {
    title: PropTypes.string,
    component: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.node
    ]).isRequired
};

const CustomRoute = ({ component: ComposedComponent, title, ...props }) => {
    return (
        <Route
            {...props}
            render={(rest) => {
                return (
                    <ComposedComponent {...rest} title={title} />
                );
            }}
        />
    );
};

CustomRoute.propTypes = propTypes;
CustomRoute.defaultProps = defaultProps;

export default CustomRoute;
