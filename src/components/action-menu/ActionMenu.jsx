import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

// Styles
import { ActionMenuWrapper, ActionMenuItem, ActionMenuItemSubtitle } from './styles';

// Utils
import * as ActionPropTypes from '../../utils/actionPropType';

// Default props
const defaultProps = {
    isActive: false,
    spacingContent: '',
    onClickOutside: () => {}
};

// Prop types
const propTypes = {
    actions: ActionPropTypes.actionPropType([
        ActionPropTypes.title.isRequired,
        ActionPropTypes.action.isRequired,
        ActionPropTypes.bool,
        ActionPropTypes.subtitle
    ]).isRequired,
    isActive: PropTypes.bool,
    spacingContent: PropTypes.string,
    onClickOutside: PropTypes.func
};

const ActionMenu = ({
    actions,
    isActive,
    spacingContent,
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
        <ActionMenuWrapper isActive={isActive}>
            {
                actions && actions.map(([title, action, active, subTitle]) => (
                    <ActionMenuItem
                        key={title}
                        isActive={active}
                        spacingContent={spacingContent}
                        onClick={action}
                    >
                        {title}
                        <ActionMenuItemSubtitle>{subTitle}</ActionMenuItemSubtitle>
                    </ActionMenuItem>
                ))
            }
        </ActionMenuWrapper>
    );
};

ActionMenu.defaultProps = defaultProps;
ActionMenu.propTypes = propTypes;

export default ActionMenu;
