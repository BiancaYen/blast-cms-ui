import React from 'react';
import PropTypes from 'prop-types';

// Styles
import { Action, SectionActionsWrapper } from './styles';

// Components
import ActionsGroup from '../../components/actions-group/ActionsGroup';

// Utils
import * as ActionPropTypes from '../../utils/actionPropType';

// Default props
const defaultProps = {
    children: null,
    spacing: '',
    withoutBorder: false
};

// Prop types
const propTypes = {
    actions: ActionPropTypes.actionPropType([
        ActionPropTypes.title.isRequired,
        ActionPropTypes.action.isRequired,
        ActionPropTypes.icon
    ]).isRequired,
    children: PropTypes.node,
    spacing: PropTypes.string,
    withoutBorder: PropTypes.bool
};

const SectionActions = ({
    actions,
    children,
    spacing,
    withoutBorder
}) => {
    return (
        <SectionActionsWrapper spacing={spacing} withoutBorder={withoutBorder}>
            {children}
            <ActionsGroup>
                {
                    actions.map(([title, action, icon = null]) => (
                        <Action key={title} onClick={action}>
                            {icon}
                            {title}
                        </Action>
                    ))
                }
            </ActionsGroup>
        </SectionActionsWrapper>
    );
};

SectionActions.defaultProps = defaultProps;
SectionActions.propTypes = propTypes;

export default SectionActions;
