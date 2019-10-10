import PropTypes from 'prop-types';

import { ElseType } from '../else/Else';

// Prop Types
const defaultProps = {
    isDisplayed: false
};

const propTypes = {
    children: PropTypes.node.isRequired,
    isDisplayed: PropTypes.bool
};

const DisplayContent = ({ isDisplayed, children }) => {
    if (isDisplayed) {
        return children.length ? children.filter(child => child.type.componentType !== ElseType) : children;
    }
    return children.length ? children.filter(child => child.type.componentType === ElseType) : null;
};

DisplayContent.defaultProps = defaultProps;
DisplayContent.propTypes = propTypes;

export default DisplayContent;
