import React from 'react';
import PropTypes from 'prop-types';

// Styles
import { AuthFormHeading, AuthFormWrapper } from './styles';

// Default props
const defaultProps = {
    heading: '',
    spacingContent: ''
};

// Prop types
const propTypes = {
    children: PropTypes.node.isRequired,
    heading: PropTypes.string,
    spacingContent: PropTypes.string
};

const AuthForm = ({ children, heading, spacingContent }) => {
    return (
        <AuthFormWrapper spacingContent={spacingContent}>
            {heading && <AuthFormHeading>{heading}</AuthFormHeading>}
            {children}
        </AuthFormWrapper>
    );
};

AuthForm.defaultProps = defaultProps;
AuthForm.propTypes = propTypes;

export default AuthForm;
