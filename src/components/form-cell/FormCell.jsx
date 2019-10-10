import React from 'react';
import PropTypes from 'prop-types';

// Styles
import Cell from './styles';

// Default Props
const defaultProps = {
    flex: '1',
    children: null
};

// Prop Types
const propTypes = {
    flex: PropTypes.string,
    children: PropTypes.node
};

const FormCell = ({ children, flex }) => {
    return <Cell flex={flex}>{children}</Cell>;
};

FormCell.defaultProps = defaultProps;
FormCell.propTypes = propTypes;

export default FormCell;
