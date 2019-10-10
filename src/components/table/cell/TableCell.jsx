import React from 'react';
import PropTypes from 'prop-types';

// Components
import Cell from './styles';

// Default Props
const defaultProps = {
    colSpan: 1,
    onClick: null,
    children: null,
    isAlignedCentre: false,
    isActionCell: false,
    isIdCell: false,
    spacing: ''
};

// Prop Types
const propTypes = {
    children: PropTypes.node,
    colSpan: PropTypes.number,
    isActionCell: PropTypes.bool,
    isAlignedCentre: PropTypes.bool,
    isIdCell: PropTypes.bool,
    spacing: PropTypes.string,
    onClick: PropTypes.func
};

const TableCell = ({
    colSpan,
    onClick,
    children,
    isActionCell,
    isAlignedCentre,
    isIdCell,
    spacing
}) => {
    return (
        <Cell
            isAlignedCentre={isAlignedCentre}
            isIdCell={isIdCell}
            isActionCell={isActionCell}
            colSpan={colSpan}
            role="gridcell"
            spacing={spacing}
            tabIndex="0"
            onClick={onClick}
        >
            {children}
        </Cell>
    );
};

TableCell.defaultProps = defaultProps;
TableCell.propTypes = propTypes;

export default TableCell;
