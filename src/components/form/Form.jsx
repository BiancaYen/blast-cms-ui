import React from 'react';
import PropTypes from 'prop-types';

// Styled
import FormWrapper from './styles';

// Default Props
const defaultProps = {
    spacing: '',
    spacingContent: '',
    onSubmit: () => {}
};

// Prop types
const propTypes = {
    children: PropTypes.node.isRequired,
    spacing: PropTypes.string,
    spacingContent: PropTypes.string,
    onSubmit: PropTypes.func
};

const Form = ({
    children,
    spacing,
    spacingContent,
    onSubmit
}) => (
    <FormWrapper
        noValidate
        spacing={spacing}
        spacingContent={spacingContent}
        onSubmit={onSubmit}
    >
        {children}
    </FormWrapper>
);

Form.defaultProps = defaultProps;
Form.propTypes = propTypes;

export default Form;
