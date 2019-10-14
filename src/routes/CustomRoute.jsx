import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';

// Default props
const defaultProps = {
    dataTypes: [],
    title: ''
};

// Prop types
const propTypes = {
    dataTypes: PropTypes.instanceOf(Array),
    title: PropTypes.string,
    component: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.node
    ]).isRequired
};

const CustomRoute = ({
    component: ComposedComponent,
    dataTypes,
    title,
    ...props
}) => {
    return (
        <Route
            {...props}
            render={(rest) => {
                return (
                    <ComposedComponent
                        {...rest}
                        dataTypes={dataTypes}
                        title={title}
                    />
                );
            }}
        />
    );
};

CustomRoute.propTypes = propTypes;
CustomRoute.defaultProps = defaultProps;

export default CustomRoute;
