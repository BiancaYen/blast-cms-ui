import React from 'react';
import PropTypes from 'prop-types';

// Constants
import types from './constants';

// Styles
import {
    Content,
    ContentWrapper,
    Header,
    Icon
} from './styles';

// Icons
import SuccessIcon from '../icons/SuccessIcon';
import WarningTriangleIcon from '../icons/WarningTriangleIcon';
import InfoIcon from '../icons/InfoIcon';
import DeleteIcon from '../icons/DeleteIcon';
import RequestNewIcon from '../icons/RequestNewIcon';
import ActivateIcon from '../icons/ActivateIcon';
import PublishIcon from '../icons/PublishIcon';
import DeactivateIcon from '../icons/DeactivateIcon';
import DownloadIcon from '../icons/DownloadIcon';
import ReactivateIcon from '../icons/ReactivateIcon';

// Default props
const defaultProps = {
    type: types.default,
    icon: null
};

// Prop types
const propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.node
    ]).isRequired,
    icon: PropTypes.node,
    title: PropTypes.string.isRequired,
    type: PropTypes.oneOf(Object.values(types))
};

const ModalContent = ({
    children,
    icon,
    title,
    type
}) => {
    const getIcon = () => {
        switch (type) {
            case types.error:
                return <WarningTriangleIcon />;
            case types.success:
                return <SuccessIcon />;
            case types.delete:
                return <DeleteIcon />;
            case types.requestNew:
                return <RequestNewIcon />;
            case types.activate:
                return <ActivateIcon />;
            case types.publish:
                return <PublishIcon />;
            case types.deactivate:
                return <DeactivateIcon />;
            case types.download:
                return <DownloadIcon />;
            case types.reactivate:
                return <ReactivateIcon />;
            default:
                return <InfoIcon />;
        }
    };

    return (
        <ContentWrapper>
            <Icon type={type}>
                {icon || getIcon()}
            </Icon>
            <Content>
                <Header type={type}>{title}</Header>
                <span>{children}</span>
            </Content>
        </ContentWrapper>
    );
};

ModalContent.defaultProps = defaultProps;
ModalContent.propTypes = propTypes;
ModalContent.types = types;

export default ModalContent;
