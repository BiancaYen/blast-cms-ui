import React from 'react';
import PropTypes from 'prop-types';

// Styles
import TableHeadStyled, { height } from './styles';

// Types
import { TableHeadType, TableHeadCellSortType } from '../types';

// Utils
import uniqueKey from '../../../utils/uniqueKey';

// Default Props
const defaultProps = {
    children: null,
    sort: {},
    onSort: () => {}
};

// Prop Types
const propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
        PropTypes.func
    ]),
    sort: PropTypes.instanceOf(Object),
    onSort: PropTypes.func
};

const TableHead = ({ children, ...props }) => {
    if (typeof children === 'function') {
        return (
            <TableHeadStyled>
                {children(props)}
            </TableHeadStyled>
        );
    }

    return (
        <TableHeadStyled>
            <tr>
                {
                    children.map((child) => {
                        if (child.type.componentType === TableHeadCellSortType) {
                            const { sort, onSort, isDisabled } = props;

                            return React.cloneElement(child, {
                                isDisabled,
                                key: uniqueKey(child),
                                sortDirection: sort[child.props.sortKey] || '',
                                onClick: onSort
                            });
                        }

                        return child;
                    })
                }
            </tr>
        </TableHeadStyled>
    );
};

TableHead.defaultProps = defaultProps;
TableHead.propTypes = propTypes;
TableHead.componentType = TableHeadType;
TableHead.height = height;

export default TableHead;
