import React from 'react';
import PropTypes from 'prop-types';
import CellVerticalWrapper from './styles';

// Prop types
const propTypes = {
    children: PropTypes.node.isRequired
};

const TableCellVertical = ({ children }) => (
    <CellVerticalWrapper>
        <div>
            {children}
        </div>
    </CellVerticalWrapper>
);

TableCellVertical.propTypes = propTypes;

export default TableCellVertical;
