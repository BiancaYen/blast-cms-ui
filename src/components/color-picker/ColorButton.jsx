import React from 'react';
import PropTypes from 'prop-types';

// Styles
import { ColorButtonWrapper } from './styles';

// Assets
import placeholderImage from '../../assets/images/palette.png';

// Default props
const defaultProps = {
    color: '',
    isActive: false,
    isDisabled: false
};

// Prop types
const propTypes = {
    color: PropTypes.string,
    isActive: PropTypes.bool,
    isDisabled: PropTypes.bool,
    onClick: PropTypes.func.isRequired
};

const ColorButton = ({
    isActive,
    isDisabled,
    color,
    onClick
}) => {
    return (
        <ColorButtonWrapper
            isActive={isActive}
            isDisabled={isDisabled}
            color={color}
            onClick={!isDisabled ? onClick : undefined}
        >
            <img src={placeholderImage} alt="Color Button" />
        </ColorButtonWrapper>
    );
};

ColorButton.defaultProps = defaultProps;
ColorButton.propTypes = propTypes;

export default ColorButton;
