import React from 'react';
import PropTypes from 'prop-types';

// Constants
import types from '../constants/statuses';

// Styles
import {
    Icon,
    CloseButton,
    Content,
    NotificationWrapper
} from './styles';

// Icons
import CloseIcon from '../icons/CloseIcon';
import InfoIcon from '../icons/InfoIcon';
import SuccessIcon from '../icons/SuccessIcon';
import WarningTriangleIcon from '../icons/WarningTriangleIcon';

// Utils
import truncate from '../../utils/truncate';

// Default props
const defaultProps = {
    isActive: true,
    onClose: () => {}
};

// Prop types
const propTypes = {
    children: PropTypes.node.isRequired,
    index: PropTypes.number.isRequired,
    isActive: PropTypes.bool,
    margin: PropTypes.number.isRequired,
    type: PropTypes.oneOf([
        types.success,
        types.info,
        types.error
    ]).isRequired,
    onClose: PropTypes.func
};

const Notification = ({
    children,
    index,
    isActive,
    margin,
    type,
    onClose
}) => {
    const getIcon = (iconType) => {
        switch (iconType) {
            case types.error:
                return <WarningTriangleIcon />;
            case types.success:
                return <SuccessIcon />;
            default:
                return <InfoIcon />;
        }
    };

    return (
        <NotificationWrapper
            isActive={isActive}
            type={type}
            index={index}
            margin={margin}
        >
            <Icon type={type}>{getIcon(type)}</Icon>
            <Content>{typeof children === 'string' ? truncate(children, 130) : children}</Content>
            <CloseButton onClick={onClose}><CloseIcon /></CloseButton>
        </NotificationWrapper>
    );
};

Notification.defaultProps = defaultProps;
Notification.propTypes = propTypes;
Notification.types = types;

export default Notification;
