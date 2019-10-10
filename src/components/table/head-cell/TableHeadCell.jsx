import React from 'react';
import PropTypes from 'prop-types';

// Styles
import HeadCell from './styles';

// Default Props
const defaultProps = {
    children: null,
    isIdCell: false,
    isActionCell: false,
    isAlignedCentre: false,
    spacing: ''
};

// Prop Types
const propTypes = {
    children: PropTypes.node,
    isActionCell: PropTypes.bool,
    isAlignedCentre: PropTypes.bool,
    isIdCell: PropTypes.bool,
    spacing: PropTypes.string
};

const TableHeadCell = ({
    children,
    isIdCell,
    isActionCell,
    isAlignedCentre,
    spacing
}) => {
    return (
        <HeadCell
            isAlignedCentre={isAlignedCentre}
            isIdCell={isIdCell}
            isActionCell={isActionCell}
            spacing={spacing}
        >
            {children}
        </HeadCell>
    );
};

TableHeadCell.defaultProps = defaultProps;
TableHeadCell.propTypes = propTypes;

export default TableHeadCell;
