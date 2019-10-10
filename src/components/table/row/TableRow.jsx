import React from 'react';
import PropTypes from 'prop-types';

// Styles
import Row, { height } from './styles';

// Default Props
const defaultProps = {
    isDisabled: false
};

// Prop Types
const propTypes = {
    children: PropTypes.node.isRequired,
    isDisabled: PropTypes.bool
};

const TableRow = ({ children, isDisabled }) => {
    return (
        <Row isDisabled={isDisabled}>
            {children}
        </Row>
    );
};

TableRow.defaultProps = defaultProps;
TableRow.propTypes = propTypes;
TableRow.height = height;

export default TableRow;
