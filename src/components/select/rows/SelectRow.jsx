import React from 'react';
import PropTypes from 'prop-types';

// Styles
import { RowWrapper, CheckBoxWrapper } from './styles';

// Components
import Checkbox from '../../../components/checkbox/Checkbox';

// Default props
const defaultProps = {
    isActive: false,
    isHighlighted: false,
    isMulti: false,
    isDisabled: false,
    isFocused: false,
    children: null
};

// Prop types
const propTypes = {
    children: PropTypes.node,
    id: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired,
    isActive: PropTypes.bool,
    isDisabled: PropTypes.bool,
    isFocused: PropTypes.bool,
    isHighlighted: PropTypes.bool,
    isMulti: PropTypes.bool,
    onClick: PropTypes.func.isRequired
};

const SelectRow = ({
    children,
    id,
    isActive,
    isDisabled,
    isFocused,
    isHighlighted,
    isMulti,
    onClick
}) => (
    <RowWrapper
        isActive={isActive}
        isHighlighted={isHighlighted}
        isDisabled={isDisabled}
        isFocused={isFocused}
        onClick={() => onClick(id)}
    >
        {children}
        {
            isMulti &&
            <CheckBoxWrapper>
                <Checkbox
                    id={id}
                    onChange={() => {}}
                    value={isActive}
                />
            </CheckBoxWrapper>
        }
    </RowWrapper>
);

SelectRow.defaultProps = defaultProps;
SelectRow.propTypes = propTypes;

export default SelectRow;
