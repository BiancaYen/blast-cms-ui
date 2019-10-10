import React from 'react';
import PropTypes from 'prop-types';

// Styles
import ActionsGroupWrapper from './styles';

// Default props
const defaultProps = {
    spacing: '',
    dividerSpacing: ''
};

// Prop types
const propTypes = {
    children: PropTypes.node.isRequired,
    dividerSpacing: PropTypes.string,
    spacing: PropTypes.string
};

const ActionsGroup = ({ children, dividerSpacing, spacing }) => {
    return (
        <ActionsGroupWrapper dividerSpacing={dividerSpacing} spacing={spacing}>
            {children}
        </ActionsGroupWrapper>
    );
};

ActionsGroup.defaultProps = defaultProps;
ActionsGroup.propTypes = propTypes;

export default ActionsGroup;
