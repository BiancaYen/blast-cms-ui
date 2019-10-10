import React from 'react';
import PropTypes from 'prop-types';

// Styles
import { ChildWrapper } from './styles';

export const SubTabsType = Symbol('sub tabs');

// Default Props
const defaultProps = {
    activeTab: null
};

// Prop Types
const propTypes = {
    activeTab: PropTypes.oneOfType([ // Active tab by default
        PropTypes.number,
        PropTypes.string
    ]),
    children: PropTypes.node.isRequired,
    id: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ]).isRequired
};

const SubTabs = ({ activeTab, children }) => children.map(child => (
    <ChildWrapper isActive={child.props.id === activeTab} key={child.props.id}>
        {child}
    </ChildWrapper>
));

SubTabs.defaultProps = defaultProps;
SubTabs.propTypes = propTypes;
SubTabs.componentType = SubTabsType;

export default SubTabs;
