import React, { useState } from 'react';
import PropTypes from 'prop-types';

// Styles
import {
    AccordionTitle,
    RowAccordionWrapper,
    AccordionContent,
    AccordionAction,
    height
} from './styles';

// Components
import ArrowToggle from '../../../components/arrow-toggle/ArrowToggle';

// Icons
import Row from './Row';

// Default props
const defaultProps = {
    action: null,
    isActive: false,
    isDisabled: false
};

// Prop types
const propTypes = {
    action: PropTypes.node,
    children: PropTypes.node.isRequired,
    content: PropTypes.string.isRequired,
    id: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired,
    isActive: PropTypes.bool,
    isDisabled: PropTypes.bool,
    onClick: PropTypes.func.isRequired
};

const RowAccordion = ({
    action,
    children,
    content,
    isActive: isActiveProp,
    isDisabled,
    ...props
}) => {
    const [isActive, setIsActive] = useState(isActiveProp);

    const handleToggle = () => {
        if (!isDisabled) {
            setIsActive(!isActive);
        }
    };

    return (
        <RowAccordionWrapper>
            <Row{...props} isRowClickable={false} isDisabled={isDisabled}>
                <span onClick={handleToggle} role="button" tabIndex="-1">
                    <ArrowToggle
                        isActive={isActive}
                        isDisabled={isDisabled}
                        isChevron
                    />
                </span>
                <AccordionTitle
                    role="button"
                    isActive={isActive}
                    isDisabled={isDisabled}
                    onClick={handleToggle}
                >
                    <span>
                        {children}
                        {action && <AccordionAction>{action}</AccordionAction>}
                    </span>
                    <AccordionContent isActive={isActive}>{content}</AccordionContent>
                </AccordionTitle>
            </Row>
        </RowAccordionWrapper>
    );
};

RowAccordion.defaultProps = defaultProps;
RowAccordion.propTypes = propTypes;
RowAccordion.height = height;

export default RowAccordion;
