import React from 'react';
import PropTypes from 'prop-types';

// Styled components
import { TabItemWrapper } from './styles';

const defaultProps = {
    badge: '',
    spacing: '0 40px'
};

const propTypes = {
    badge: PropTypes.string,
    children: PropTypes.node.isRequired,
    id: PropTypes.PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ]).isRequired,
    spacing: PropTypes.string,
    title: PropTypes.string.isRequired
};

// badge, id, title props used only for Tabs component
const TabItem = ({
    badge,
    children,
    id,
    spacing,
    title
}) => (
    <TabItemWrapper
        badge={badge}
        id={id}
        spacing={spacing}
        title={title}
    >
        {children}
    </TabItemWrapper>
);

TabItem.defaultProps = defaultProps;
TabItem.propTypes = propTypes;

export default TabItem;
