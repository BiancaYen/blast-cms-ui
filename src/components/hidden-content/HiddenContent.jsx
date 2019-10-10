import PropTypes from 'prop-types';

import { ElseType } from '../else/Else';

// Prop Types
const defaultProps = {
    isHidden: false
};

const propTypes = {
    children: PropTypes.node.isRequired,
    isHidden: PropTypes.bool
};

const HiddenContent = ({ isHidden, children }) => {
    const getChildrenType = child => (child && child.type && child.type.contentType) || null;

    if (isHidden) {
        return Array.isArray(children) ? children.filter(child => getChildrenType(child) === ElseType) : null;
    }
    return Array.isArray(children) ? children.filter(child => getChildrenType(child) !== ElseType) : children;
};

HiddenContent.defaultProps = defaultProps;
HiddenContent.propTypes = propTypes;

export default HiddenContent;
