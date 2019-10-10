import React from 'react';
import PropTypes from 'prop-types';

// Styles
import Wrapper from './styles';

// Icons
import VisibleIcon from '../../icons/VisibleIcon';
import InvisibleIcon from '../../icons/InvisibleIcon';

// Default Props
const defaultProps = {
    isDisabled: false,
    isVisible: false
};

// Prop types
const propTypes = {
    isDisabled: PropTypes.bool,
    isVisible: PropTypes.bool
};

const DisplayButton = ({ isDisabled, isVisible }) => (
    <Wrapper isDisabled={isDisabled}>
        {isVisible ? <VisibleIcon /> : <InvisibleIcon />}
    </Wrapper>
);

DisplayButton.defaultProps = defaultProps;
DisplayButton.propTypes = propTypes;

export default DisplayButton;
