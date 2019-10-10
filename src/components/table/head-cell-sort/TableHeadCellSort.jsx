import React from 'react';
import PropTypes from 'prop-types';

// Types
import { TableHeadCellSortType } from '../types';

// Icon Components
import ChevronUpIcon from '../../icons/ChevronUpIcon';
import ChevronDownIcon from '../../icons/ChevronDownIcon';

// Styles
import { ArrowWrapper, HeadCellSort } from './styles';

const Icon = ({ isDisabled, sort }) => {
    if (sort === '') {
        return (
            <ArrowWrapper isDisabled={isDisabled}>
                <ChevronDownIcon />
            </ArrowWrapper>
        );
    }
    if (sort === 'asc') {
        return (
            <ArrowWrapper isActive isDisabled={isDisabled}>
                <ChevronDownIcon />
            </ArrowWrapper>
        );
    }
    return (
        <ArrowWrapper isActive isDisabled={isDisabled}>
            <ChevronUpIcon />
        </ArrowWrapper>
    );
};

Icon.propTypes = {
    isDisabled: PropTypes.bool.isRequired,
    sort: PropTypes.string.isRequired
};
// Default Props
const defaultProps = {
    children: null,
    isActionCell: false,
    isAlignedCentre: false,
    isDisabled: false,
    isIdCell: false,
    sortDirection: '',
    sortKey: '',
    onClick: () => {}
};

// Prop Types
const propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.string
    ]),
    isActionCell: PropTypes.bool,
    isAlignedCentre: PropTypes.bool,
    isDisabled: PropTypes.bool,
    isIdCell: PropTypes.bool,
    sortDirection: PropTypes.string,
    sortKey: PropTypes.string,
    onClick: PropTypes.func
};

const TableHeadCellSort = ({
    isDisabled,
    isIdCell,
    isActionCell,
    isAlignedCentre,
    sortDirection,
    sortKey,
    onClick,
    children
}) => {
    const getSort = (currentSort) => {
        if (currentSort === 'asc') {
            return 'desc';
        }
        if (currentSort === 'desc') {
            return '';
        }

        return 'asc';
    };

    const onSort = () => {
        onClick({
            sortKey,
            sortDirection: getSort(sortDirection)
        });
    };

    return (
        <HeadCellSort
            isAlignedCentre={isAlignedCentre}
            isActionCell={isActionCell}
            isDisabled={isDisabled}
            isIdCell={isIdCell}
            onClick={!isDisabled ? onSort : undefined}
        >
            {children}
            <span>
                <Icon isDisabled={isDisabled} sort={sortDirection} />
            </span>
        </HeadCellSort>
    );
};

TableHeadCellSort.defaultProps = defaultProps;
TableHeadCellSort.propTypes = propTypes;
TableHeadCellSort.componentType = TableHeadCellSortType;

export default TableHeadCellSort;
