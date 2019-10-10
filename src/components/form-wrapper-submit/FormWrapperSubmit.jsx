import React from 'react';
import PropTypes from 'prop-types';

// Styles
import FormSubmitWrapper from './styles';

// Default Props
const defaultProps = {
    spacing: '',
    spacingContent: ''
};

// Prop Types
const propTypes = {
    children: PropTypes.node.isRequired,
    spacing: PropTypes.string,
    spacingContent: PropTypes.string
};

const FormWrapperSubmit = ({ children, spacing, spacingContent }) => (
    <FormSubmitWrapper spacing={spacing} spacingContent={spacingContent}>
        {children}
    </FormSubmitWrapper>
);

FormWrapperSubmit.defaultProps = defaultProps;
FormWrapperSubmit.propTypes = propTypes;

export default FormWrapperSubmit;
