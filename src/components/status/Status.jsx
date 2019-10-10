import React from 'react';
import PropTypes from 'prop-types';

// Constants
import statuses from '../constants/statuses';

// Styles
import StatusWrapper from './styles';

// Default props
const defaultProps = {
    spacing: '',
    status: statuses.default
};

// Prop Types
const propTypes = {
    children: PropTypes.node.isRequired,
    spacing: PropTypes.string,
    status: PropTypes.oneOf(Object.values(statuses))
};

const Status = ({
    children,
    spacing,
    status
}) => (
    <StatusWrapper spacing={spacing} status={status}>
        {children}
    </StatusWrapper>
);

Status.defaultProps = defaultProps;
Status.propTypes = propTypes;
Status.statuses = statuses;

export default Status;
