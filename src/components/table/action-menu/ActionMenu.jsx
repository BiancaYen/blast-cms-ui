import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

// Styles
import {
    ActionMenu as Wrapper,
    ActionMenuItem,
    ActionMenuIcon
} from './styles';

// Utils
import getIcon from './getIcon';
import * as ActionPropTypes from '../../../utils/actionPropType';

// Default props
const defaultProps = {
    isActive: false,
    withHoverColor: true,
    onClickOutside: () => {}
};

// Prop types
const propTypes = {
    actions: ActionPropTypes.actionPropType([
        ActionPropTypes.title.isRequired,
        ActionPropTypes.action.isRequired,
        ActionPropTypes.icon
    ]).isRequired,
    isActive: PropTypes.bool,
    withHoverColor: PropTypes.bool,
    onClickOutside: PropTypes.func
};

const ActionMenu = ({
    actions,
    isActive,
    withHoverColor,
    onClickOutside
}) => {
    const clickOutsideHandler = () => {
        onClickOutside();
    };

    useEffect(() => {
        if (isActive) {
            document.addEventListener('click', clickOutsideHandler, false);
        } else {
            document.removeEventListener('click', clickOutsideHandler, false);
        }

        return () => document.removeEventListener('click', clickOutsideHandler, false);
    }, [isActive]);

    useEffect(() => () => {
        document.removeEventListener('click', clickOutsideHandler, false);
    }, []);

    return (
        <Wrapper isActive={isActive} top={top}>
            {
                actions && actions.map(([title, action, icon = getIcon(title), active]) => (
                    <ActionMenuItem
                        key={title}
                        isActive={active}
                        withHoverColor={withHoverColor}
                        onClick={action}
                    >
                        {icon && <ActionMenuIcon>{icon}</ActionMenuIcon>}
                        {title}
                    </ActionMenuItem>
                ))
            }
        </Wrapper>
    );
};

ActionMenu.defaultProps = defaultProps;
ActionMenu.propTypes = propTypes;

export default ActionMenu;
