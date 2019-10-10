import React, { useState } from 'react';
import PropTypes from 'prop-types';

// Styles
import {
    AccordionWrapper,
    Actions,
    Content,
    Panel,
    Title
} from './styles';

// Components
import ArrowToggle from '../../components/arrow-toggle/ArrowToggle';

// Default props
const defaultProps = {
    action: null,
    isActive: false,
    spacing: '',
    spacingContent: '',
    subtitle: null
};

// Prop types
const propTypes = {
    action: PropTypes.node,
    children: PropTypes.node.isRequired,
    isActive: PropTypes.bool,
    spacing: PropTypes.string,
    spacingContent: PropTypes.string,
    subtitle: PropTypes.node,
    title: PropTypes.string.isRequired
};

const Component = ({
    action,
    children,
    isActive: isActiveProp,
    spacing,
    spacingContent,
    title,
    subtitle
}) => {
    const [isActive, setIsActive] = useState(isActiveProp);

    const handleToggle = () => {
        setIsActive(!isActive);
    };

    return (
        <AccordionWrapper isActive={isActive} spacing={spacing}>
            <Panel onClick={handleToggle} isActive={isActive}>
                <Title>{title}</Title>
                {subtitle}
                <Actions>{action}</Actions>
                <ArrowToggle isActive={isActive} isChevron />
            </Panel>
            <Content isActive={isActive} spacing={spacingContent}>
                {children}
            </Content>
        </AccordionWrapper>
    );
};

Component.defaultProps = defaultProps;
Component.propTypes = propTypes;

export default Component;
