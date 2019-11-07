import React from 'react';
import PropTypes from 'prop-types';

// Styles
import FileWrapper from './styles';

// Prop Types
const propTypes = {
    children: PropTypes.node.isRequired
};

const File = ({ children }) => (
    <FileWrapper>
        {children}
    </FileWrapper>
);

File.propTypes = propTypes;

export default File;
