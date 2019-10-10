import React from 'react';
import PropTypes from 'prop-types';

// Styles
import { RowWrapper, ActionsWrapper, height } from './styles';

// Components
import HiddenContent from '../../../components/hidden-content/HiddenContent';
import IconAction from '../../../components/icon-action/IconAction';

// Icons
import RemoveIcon from '../../icons/RemoveIcon';
import CreateIcon from '../../icons/CreateIcon';
import LockedIcon from '../../icons/LockedIcon';

// Default props
const defaultProps = {
    isDisabled: false,
    isLocked: false,
    isRowClickable: true,
    isSelected: false
};

// Prop types
const propTypes = {
    children: PropTypes.node.isRequired,
    id: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired,
    isDisabled: PropTypes.bool,
    isLocked: PropTypes.bool,
    isRowClickable: PropTypes.bool,
    isSelected: PropTypes.bool,
    onClick: PropTypes.func.isRequired
};

const Row = ({
    children,
    id,
    isDisabled,
    isLocked,
    isRowClickable,
    isSelected,
    onClick
}) => {
    const handleClick = () => {
        if (!isLocked && !isDisabled) {
            onClick(id);
        }
    };

    return (
        <RowWrapper
            isDisabled={isDisabled}
            isLocked={isLocked}
            role="menuitem"
            tabIndex="0"
            onClick={isRowClickable ? handleClick : undefined}
        >
            {children}
            <HiddenContent isHidden={isLocked}>
                <ActionsWrapper>
                    {
                        isSelected
                            ? <IconAction icon={<RemoveIcon />} onClick={handleClick}>Remove</IconAction>
                            : <IconAction icon={<CreateIcon />} onClick={handleClick}>Add</IconAction>
                    }
                </ActionsWrapper>
            </HiddenContent>
            {isLocked && <IconAction icon={<LockedIcon />} isDisabled>Locked</IconAction>}
        </RowWrapper>
    );
};

Row.defaultProps = defaultProps;
Row.propTypes = propTypes;
Row.height = height;

export default Row;
