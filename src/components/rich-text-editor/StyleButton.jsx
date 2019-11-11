import React from 'react';
import PropTypes from 'prop-types';

// Styles
import { StyleButtonWrapper } from './styles';

// Prop Types
const propTypes = {
    isActive: PropTypes.bool.isRequired,
    label: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.instanceOf(Object)
    ]).isRequired,
    style: PropTypes.string.isRequired,
    onToggle: PropTypes.func.isRequired
};

const StyleButton = ({
    isActive,
    label,
    style,
    onToggle
}) => {
    const handleToggle = (event) => {
        event.preventDefault();
        onToggle(style);
    };

    return (
        <StyleButtonWrapper
            className={`RichEditor-styleButton ${isActive && 'RichEditor-activeButton'}`}
            onMouseDown={handleToggle}
            active={isActive}
            type="button"
        >
            { label }
        </StyleButtonWrapper>
    );
};

StyleButton.propTypes = propTypes;

export default StyleButton;
