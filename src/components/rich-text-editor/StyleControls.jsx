import React from 'react';
import * as FontAwesome from 'react-icons/fa';
import PropTypes from 'prop-types';

// Components
import StyleButton from './StyleButton';

// Constants
const INLINE_STYLES = [
    { key: 1, label: 'H1', style: 'H1' },
    { key: 2, label: 'H2', style: 'H2' },
    { key: 3, label: 'H3', style: 'H3' },
    { key: 4, label: <FontAwesome.FaBold />, style: 'BOLD' },
    { key: 5, label: <FontAwesome.FaItalic />, style: 'ITALIC' },
    { key: 6, label: <FontAwesome.FaUnderline />, style: 'UNDERLINE' }
];

// Prop Types
const propTypes = {
    value: PropTypes.instanceOf(Object).isRequired,
    onToggle: PropTypes.func.isRequired
};

const StyleControls = ({ value, onToggle }) => {
    const currentStyle = value.getCurrentInlineStyle();

    return (
        <div>
            {INLINE_STYLES.map(type => (
                <StyleButton
                    key={type.key}
                    isActive={currentStyle.has(type.style)}
                    label={type.label}
                    onToggle={onToggle}
                    style={type.style}
                />
            ))}
        </div>
    );
};

StyleControls.propTypes = propTypes;

export default StyleControls;
