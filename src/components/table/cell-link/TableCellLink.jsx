import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import CellLink from './styles';

// Default Props
const defaultProps = {
    isEmail: false
};

// Prop Types
const propTypes = {
    children: PropTypes.node.isRequired,
    isEmail: PropTypes.bool,
    link: PropTypes.string.isRequired
};

const TableCellLink = ({ link, children, isEmail }) => {
    return (
        <CellLink>
            {
                isEmail
                    ? <a href={`mailto:${link}`}>{ children }</a>
                    : <Link to={link}>{children}</Link>
            }
        </CellLink>
    );
};

TableCellLink.defaultProps = defaultProps;
TableCellLink.propTypes = propTypes;

export default TableCellLink;
