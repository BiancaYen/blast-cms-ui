import React from 'react';
import PropTypes from 'prop-types';

// Styles
import { Actions } from './styles';

// Prop types
const propTypes = {
    children: PropTypes.node.isRequired
};

const ModalActions = ({ children }) => <Actions>{children}</Actions>;

ModalActions.propTypes = propTypes;

export default ModalActions;
