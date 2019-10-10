import React from 'react';
import PropTypes from 'prop-types';

// Styles
import { Container, MessageWrapper } from './styles';

// Default Props
const defaultProps = {
    children: null,
    height: 200
};

// Prop Types
const propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.string
    ]),
    height: PropTypes.number
};

const TableMessage = ({ children, height }) => {
    return (
        <Container height={height}>
            <MessageWrapper>{children}</MessageWrapper>
        </Container>
    );
};

TableMessage.defaultProps = defaultProps;
TableMessage.propTypes = propTypes;

export default TableMessage;
