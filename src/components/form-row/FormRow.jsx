import React from 'react';
import PropTypes from 'prop-types';

// Styles
import Row from './styles';

// Default Props
const defaultProps = {
    spacing: ''
};

// Prop Types
const propTypes = {
    children: PropTypes.node.isRequired,
    spacing: PropTypes.string
};

const FormRow = ({ children, spacing }) => {
    return (
        <Row spacing={spacing}>
            {children}
        </Row>
    );
};

FormRow.defaultProps = defaultProps;
FormRow.propTypes = propTypes;

export default FormRow;
