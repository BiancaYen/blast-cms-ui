import React from 'react';
import * as FontAwesome from 'react-icons/fa';
import PropTypes from 'prop-types';

// Components
import StyleButton from './StyleButton';

// Prop Types
const propTypes = {
    value: PropTypes.instanceOf(Object).isRequired,
    onToggle: PropTypes.func.isRequired
};

const Toolbar = ({ value, onToggle }) => {
    // Constants
    const inlineStyles = [
        { key: 1, label: 'H1', style: 'H1' },
        { key: 2, label: 'H2', style: 'H2' },
        { key: 3, label: 'H3', style: 'H3' },
        { key: 4, label: <FontAwesome.FaBold />, style: 'BOLD' },
        { key: 5, label: <FontAwesome.FaItalic />, style: 'ITALIC' },
        { key: 6, label: <FontAwesome.FaUnderline />, style: 'UNDERLINE' }
    ];

    const currentStyle = value.getCurrentInlineStyle();

    return (
        <div>
            {inlineStyles.map(({ key, label, style }) => (
                <StyleButton
                    key={key}
                    inlineStyle={style}
                    isActive={currentStyle.has(style)}
                    label={label}
                    onToggle={onToggle}
                />
            ))}
        </div>
    );
};

Toolbar.propTypes = propTypes;

export default Toolbar;
