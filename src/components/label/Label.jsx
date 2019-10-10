import React from 'react';
import PropTypes from 'prop-types';

// Components
import LabelAdditional from '../label-additional/LabelAdditional';

// Styles
import {
    ActionWrapper,
    InnerWrapper,
    LabelMain,
    LabelNote,
    LabelWrapper
} from './styles';

// Default Props
const defaultProps = {
    action: null,
    id: '',
    isDisabled: false,
    labelAdditional: '',
    labelNote: '',
    spacing: ''
};

// Prop Types
const propTypes = {
    action: PropTypes.node,
    children: PropTypes.string.isRequired,
    id: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ]),
    isDisabled: PropTypes.bool,
    labelAdditional: PropTypes.any,
    labelNote: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.node
    ]),
    spacing: PropTypes.string
};

const Label = ({
    action,
    isDisabled,
    id,
    children,
    labelAdditional,
    labelNote,
    spacing
}) => {
    return (
        <LabelWrapper htmlFor={id} spacing={spacing} >
            <InnerWrapper>
                <div>
                    <LabelMain isDisabled={isDisabled}>{children}</LabelMain>
                    {labelNote && <LabelNote isDisabled={isDisabled}>{labelNote}</LabelNote>}
                </div>
                {action && <ActionWrapper>{action}</ActionWrapper>}
            </InnerWrapper>
            {
                labelAdditional &&
                    <LabelAdditional isDisabled={isDisabled} spacing="2px 0 0">
                        {labelAdditional}
                    </LabelAdditional>
            }
        </LabelWrapper>
    );
};

Label.defaultProps = defaultProps;
Label.propTypes = propTypes;

export default Label;
