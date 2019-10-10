import React from 'react';
import PropTypes from 'prop-types';

// Styles
import { Item, TextToggleWrapper } from './styles';

// Default Props
const defaultProps = {
    isDisabled: false,
    spacing: ''
};

// Prop Types
const propTypes = {
    id: PropTypes.string.isRequired,
    isDisabled: PropTypes.bool,
    items: PropTypes.instanceOf(Array).isRequired,
    spacing: PropTypes.string,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired,
    onChange: PropTypes.func.isRequired
};

const TextToggle = ({
    id,
    isDisabled,
    items,
    spacing,
    value,
    onChange
}) => {
    const handleChange = (item) => {
        if (!isDisabled) {
            onChange({
                id,
                value: item
            });
        }
    };

    return (
        <TextToggleWrapper spacing={spacing}>
            {
                items && items.map(([itemId, title]) => (
                    <Item
                        isActive={value === itemId}
                        isDisabled={isDisabled}
                        key={itemId}
                        onClick={() => handleChange(itemId)}
                    >
                        {title}
                    </Item>
                ))
            }
        </TextToggleWrapper>
    );
};

TextToggle.defaultProps = defaultProps;
TextToggle.propTypes = propTypes;

export default TextToggle;
