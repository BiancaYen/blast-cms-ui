import React from 'react';
import PropTypes from 'prop-types';

// Styles
import TagWrapper from './styles';

// Icons
import CloseIcon from '../icons/CloseIcon';

// Prop types
const propTypes = {
    children: PropTypes.node.isRequired,
    onDelete: PropTypes.func.isRequired
};

const Tag = ({ children, onDelete }) => (
    <TagWrapper>
        {children}
        <button type="button" onClick={onDelete}>
            <CloseIcon width={8} height={8} />
        </button>
    </TagWrapper>
);

Tag.propTypes = propTypes;

export default Tag;
