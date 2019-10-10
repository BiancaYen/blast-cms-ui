import React from 'react';
import PropTypes from 'prop-types';

// Styles
import ArrowButtonWrapper from './styles';

// Constants
import directions from './constants';

// Icons
import ChevronLeftIcon from '../icons/ChevronLeftIcon';

// Default props
const defaultProps = {
    direction: directions.left,
    isDisabled: false,
    spacing: ''
};

// Prop types
const propTypes = {
    direction: PropTypes.oneOf([
        directions.left,
        directions.right
    ]),
    isDisabled: PropTypes.bool,
    spacing: PropTypes.string,
    onClick: PropTypes.func.isRequired
};

const ArrowButton = ({
    direction,
    isDisabled,
    spacing,
    onClick
}) => (
    <ArrowButtonWrapper
        direction={direction}
        isDisabled={isDisabled}
        spacing={spacing}
        onClick={!isDisabled ? onClick : undefined}
    >
        <ChevronLeftIcon />
    </ArrowButtonWrapper>
);

ArrowButton.defaultProps = defaultProps;
ArrowButton.propTypes = propTypes;
ArrowButton.directions = directions;

export default ArrowButton;
