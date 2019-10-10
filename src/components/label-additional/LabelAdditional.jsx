import React from 'react';
import PropTypes from 'prop-types';

// Styles
import LabelAdditionalWrapper from './styles';

// Default Props
const defaultProps = {
    children: '',
    isDisabled: false,
    spacing: ''
};

// Prop Types
const propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.string
    ]),
    isDisabled: PropTypes.bool,
    spacing: PropTypes.string
};

const LabelAdditional = ({ children, isDisabled, spacing }) => {
    return (
        <LabelAdditionalWrapper spacing={spacing} isDisabled={isDisabled}>
            { children }
        </LabelAdditionalWrapper>
    );
};

LabelAdditional.defaultProps = defaultProps;
LabelAdditional.propTypes = propTypes;

export default LabelAdditional;
