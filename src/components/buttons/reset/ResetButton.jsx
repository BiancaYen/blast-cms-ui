import React from 'react';
import PropTypes from 'prop-types';

// Icons
import ResetIcon from '../../icons/ResetIcon';

// Styles
import ResetButtonWrapper from './styles';

// Default props
const defaultProps = {
    isDisabled: false,
    label: 'reset'
};

// PropTypes
const propTypes = {
    isDisabled: PropTypes.bool,
    label: PropTypes.string,
    onClick: PropTypes.func.isRequired
};

const ResetButton = ({ isDisabled, label, onClick }) => (
    <ResetButtonWrapper
        isDisabled={isDisabled}
        label={label}
        onClick={!isDisabled ? onClick : undefined}
    >
        <ResetIcon />
    </ResetButtonWrapper>
);

ResetButton.defaultProps = defaultProps;
ResetButton.propTypes = propTypes;

export default ResetButton;
