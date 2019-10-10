import React from 'react';
import PropTypes from 'prop-types';

// Constants
import statuses from '../constants/statuses';

// Styles
import AlertWrapper from './styles';

// Icons
import SuccessIcon from '../icons/SuccessIcon';
import WarningTriangleIcon from '../icons/WarningTriangleIcon';
import InfoIcon from '../icons/InfoIcon';

// Default props
const defaultProps = {
    spacing: '',
    status: statuses.default
};

// Prop types
const propTypes = {
    children: PropTypes.string.isRequired,
    spacing: PropTypes.string,
    status: PropTypes.oneOf([
        statuses.success,
        statuses.error,
        statuses.warning,
        statuses.default
    ])
};

const getIcon = (status) => {
    switch (status) {
        case statuses.success:
            return <SuccessIcon />;
        case statuses.error:
        case statuses.warning:
            return <WarningTriangleIcon />;
        default:
            return <InfoIcon />;
    }
};

const Alert = ({
    children,
    status,
    spacing
}) => {
    return (
        <AlertWrapper status={status} spacing={spacing}>
            {getIcon(status)}
            {children}
        </AlertWrapper>
    );
};

Alert.defaultProps = defaultProps;
Alert.propTypes = propTypes;
Alert.statuses = statuses;

export default Alert;
