import React from 'react';
import PropTypes from 'prop-types';

// Styles
import TextButtonWrapper from './styles';

// Default props
const defaultProps = {
    isDisabled: false,
    spacing: ''
};

// Prop types
const propTypes = {
    children: PropTypes.string.isRequired,
    isDisabled: PropTypes.bool,
    spacing: PropTypes.string,
    onClick: PropTypes.func.isRequired
};

const TextButton = ({ children, isDisabled, spacing, onClick }) => (
    <TextButtonWrapper
        isDisabled={isDisabled}
        role="button"
        spacing={spacing}
        tabIndex="0"
        onClick={!isDisabled ? onClick : undefined}
    >
        {children}
    </TextButtonWrapper>
);

TextButton.defaultProps = defaultProps;
TextButton.propTypes = propTypes;

export default TextButton;
