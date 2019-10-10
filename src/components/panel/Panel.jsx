import React from 'react';
import PropTypes from 'prop-types';

// Styles
import {
    ActionIcon,
    ActionTitle,
    PanelWrapper,
    Title
} from './styles';

// Icons
import EditIcon from '../icons/EditIcon';

// Default Props
const defaultProps = {
    action: ['Edit', () => {}],
    spacing: ''
};

// Prop Types
const propTypes = {
    action: PropTypes.array.isRequired,
    spacing: PropTypes.string,
    title: PropTypes.string.isRequired
};

const Panel = ({
    action,
    spacing,
    title
}) => {
    const [actionTitle = 'Edit', actionHandler, icon = <EditIcon />] = action;

    return (
        <PanelWrapper onClick={actionHandler} spacing={spacing}>
            <Title>{title}</Title>
            <ActionIcon>{icon}</ActionIcon>
            <ActionTitle>{actionTitle}</ActionTitle>
        </PanelWrapper>
    );
};

Panel.defaultProps = defaultProps;
Panel.propTypes = propTypes;

export default Panel;
