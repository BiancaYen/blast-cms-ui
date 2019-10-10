import React from 'react';
import PropTypes from 'prop-types';

// Styles
import IconActionWrapper from './styles';

// Icons
import EditIcon from '../icons/EditIcon';

// Default props
const defaultProps = {
    icon: null,
    isDisabled: false,
    onClick: () => {}
};

// Prop types
const propTypes = {
    children: PropTypes.string.isRequired,
    icon: PropTypes.node,
    isDisabled: PropTypes.bool,
    onClick: PropTypes.func
};

const IconAction = ({
    children,
    icon: iconProps,
    isDisabled,
    onClick
}) => {
    const icon = iconProps || <EditIcon />;

    return (
        <IconActionWrapper onClick={!isDisabled ? onClick : undefined} isDisabled={isDisabled}>
            <span>{icon}</span>
            <span>{children}</span>
        </IconActionWrapper>
    );
};

IconAction.defaultProps = defaultProps;
IconAction.propTypes = propTypes;

export default IconAction;
