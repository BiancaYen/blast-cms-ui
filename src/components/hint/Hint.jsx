import React from 'react';
import PropTypes from 'prop-types';

// Styles
import { HintWrapper, HintContent } from './styles';

// Icons
import InfoIcon from '../icons/InfoIcon';

// Default props
const defaultProps = {
    spacing: ''
};

// Prop types
const propTypes = {
    children: PropTypes.node.isRequired,
    spacing: PropTypes.string
};

const Hint = ({ children, spacing }) => (
    <HintWrapper spacing={spacing}>
        <span><InfoIcon /></span>
        <HintContent>{children}</HintContent>
    </HintWrapper>
);

Hint.defaultProps = defaultProps;
Hint.propTypes = propTypes;

export default Hint;
