import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

// Components
import ActionMenu from '../action-menu/ActionMenu';

// Icons
import OverflowIcon from '../../icons/OverflowIcon';

// Styles
import { ActionMenuWrapper, CellAction } from './styles';

// Utils
import * as ActionPropTypes from '../../../utils/actionPropType';

// Default props
const defaultProps = {
    actions: [],
    rowIndex: 0
};

// Prop types
const propTypes = {
    actions: ActionPropTypes.actionPropType([
        ActionPropTypes.title.isRequired,
        ActionPropTypes.action.isRequired,
        ActionPropTypes.icon
    ]),
    rowIndex: PropTypes.number
};

const TableAction = ({ actions, rowIndex }) => {
    const [isActive, setActive] = useState(false);
    const cellRef = useRef(null);

    const clickOutsideHandler = () => {
        setActive(false);
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
        <CellAction
            onClick={() => setActive(!isActive)}
            ref={cellRef}
            role="gridcell"
            tabIndex="0"
        >
            <OverflowIcon />
            <ActionMenuWrapper openToTop={rowIndex > 7 && actions.length > 2}>
                <ActionMenu actions={actions} isActive={isActive} />
            </ActionMenuWrapper>
        </CellAction>
    );
};

TableAction.defaultProps = defaultProps;
TableAction.propTypes = propTypes;

export default TableAction;
