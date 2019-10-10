import React, { useState } from 'react';
import PropTypes from 'prop-types';

// Components
import ActionMenu from '../action-menu/ActionMenu';
import ArrowToggle from '../arrow-toggle/ArrowToggle';

// Styles
import DropdownWrapper from './styles';

// Utils
import * as ActionPropTypes from '../../utils/actionPropType';

// Default props
const defaultProps = {
    actions: [],
    isDisabled: false
};

// Prop types
const propTypes = {
    actions: ActionPropTypes.actionPropType([
        ActionPropTypes.title.isRequired,
        ActionPropTypes.action.isRequired,
        ActionPropTypes.bool,
        ActionPropTypes.subtitle
    ]),
    isDisabled: PropTypes.bool,
    title: PropTypes.string.isRequired
};

const Dropdown = ({ actions, isDisabled, title }) => {
    const [isActive, setActive] = useState(false);

    return (
        <DropdownWrapper
            isActive={isActive}
            isDisabled={isDisabled}
            onClick={() => (!isDisabled ? setActive(true) : undefined)}
        >
            <span>{title}</span>
            <ArrowToggle isActive={isActive} isDisabled={isDisabled} isChevron />
            <ActionMenu
                actions={actions}
                isActive={isActive}
                withHoverColor
                onClickOutside={() => setActive(false)}
            />
        </DropdownWrapper>
    );
};

Dropdown.defaultProps = defaultProps;
Dropdown.propTypes = propTypes;

export default Dropdown;
