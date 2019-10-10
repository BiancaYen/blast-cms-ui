import React from 'react';
import PropTypes from 'prop-types';

// Constants
import statuses from './constants';

// Styles
import StatusActionWrapper from './styles';

// Default props
const defaultProps = {
    isDisabled: false,
    spacing: '',
    status: statuses.success,
    titleAction: ''
};

// Prop Types
const propTypes = {
    isDisabled: PropTypes.bool,
    spacing: PropTypes.string,
    status: PropTypes.oneOf([
        statuses.success,
        statuses.error
    ]),
    title: PropTypes.string.isRequired,
    titleAction: PropTypes.string,
    onClick: PropTypes.func.isRequired
};

const StatusAction = ({
    isDisabled,
    spacing,
    status,
    title,
    titleAction,
    onClick
}) => (
    <StatusActionWrapper
        isDisabled={isDisabled}
        spacing={spacing}
        status={status}
        onClick={!isDisabled ? onClick : undefined}
    >
        <span>{title}</span>
        <span>{titleAction}</span>
    </StatusActionWrapper>
);

StatusAction.defaultProps = defaultProps;
StatusAction.propTypes = propTypes;
StatusAction.statuses = statuses;

export default StatusAction;
