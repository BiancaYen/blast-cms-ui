import React from 'react';
import PropTypes from 'prop-types';

// Constants
import sizes from './constants';

// Icons
import ChevronUpIcon from '../icons/ChevronUpIcon';
import ChevronDownIcon from '../icons/ChevronDownIcon';

// Styles
import Wrapper from './styles';

// Default props
const defaultProps = {
    isActive: false,
    isDisabled: false,
    size: sizes.normal
};

// Prop types
const propTypes = {
    isActive: PropTypes.bool,
    isDisabled: PropTypes.bool,
    size: PropTypes.oneOf([
        sizes.small,
        sizes.normal
    ])
};

const ArrowToggle = ({ isActive, isDisabled, size }) => {
    return (
        <Wrapper
            isActive={isActive}
            isDisabled={isDisabled}
            size={size}
        >
            { isActive ? <ChevronUpIcon /> : <ChevronDownIcon />}
        </Wrapper>
    );
};

ArrowToggle.defaultProps = defaultProps;
ArrowToggle.propTypes = propTypes;
ArrowToggle.sizes = sizes;

export default ArrowToggle;
