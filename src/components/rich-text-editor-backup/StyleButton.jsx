import React from 'react';
import PropTypes from 'prop-types';

// Styles
import { StyleButtonWrapper } from './styles';

// Prop Types
const propTypes = {
    inlineStyle: PropTypes.string.isRequired,
    isActive: PropTypes.bool.isRequired,
    label: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.instanceOf(Object)
    ]).isRequired,
    onToggle: PropTypes.func.isRequired
};

const StyleButton = ({
    inlineStyle,
    isActive,
    label,
    onToggle
}) => {
    const handleToggle = (event) => {
        event.preventDefault();
        onToggle(inlineStyle);
    };

    return (
        <StyleButtonWrapper
            isActive={isActive}
            type="button"
            onMouseDown={handleToggle}
        >
            { label }
        </StyleButtonWrapper>
    );
};

StyleButton.propTypes = propTypes;

export default StyleButton;
