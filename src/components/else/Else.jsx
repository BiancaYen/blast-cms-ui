import PropTypes from 'prop-types';

// Prop Types
const propTypes = {
    children: PropTypes.node.isRequired
};

// Component Type
export const ElseType = Symbol('else');

const Else = ({ children }) => (children);

Else.propTypes = propTypes;
Else.componentType = ElseType;

export default Else;
