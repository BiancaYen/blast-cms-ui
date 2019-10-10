import React from 'react';
import PropTypes from 'prop-types';

// Types
import { TableBodyType } from '../types';

// Default props
const defaultProps = {
    children: null,
    data: [],
    emptyRows: [],
    withEmptyRows: false
};

// Prop types
const propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
        PropTypes.func
    ]),
    data: PropTypes.instanceOf(Array),
    emptyRows: PropTypes.instanceOf(Array),
    withEmptyRows: PropTypes.bool
};

const TableBody = ({
    children,
    data,
    emptyRows,
    withEmptyRows
}) => {
    if (typeof children === 'function') {
        let content = children(data);

        if (withEmptyRows) {
            content = content.concat(emptyRows);
        }
        return (
            <tbody>
                {content}
            </tbody>
        );
    }
    return (
        <tbody>
            { children }
        </tbody>
    );
};

TableBody.defaultProps = defaultProps;
TableBody.propTypes = propTypes;
TableBody.componentType = TableBodyType;

export default TableBody;
