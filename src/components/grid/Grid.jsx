import React from 'react';
import PropTypes from 'prop-types';

// Constants
import grid from './constants';

// Styles
import GridWrapper from './styles';

// Default props
const defaultProps = {
    alignItems: '',
    grid: '',
    gridGap: '',
    spacing: '',
    spacingContent: ''
};

// Prop types
const propTypes = {
    alignItems: PropTypes.string,
    children: PropTypes.node.isRequired,
    grid: PropTypes.string,
    gridGap: PropTypes.string,
    spacing: PropTypes.string,
    spacingContent: PropTypes.string
};

const Grid = ({
    alignItems,
    children,
    grid: propsGrid,
    gridGap,
    spacing,
    spacingContent
}) => (
    <GridWrapper
        alignItems={alignItems}
        grid={propsGrid}
        gridGap={gridGap}
        spacing={spacing}
        spacingContent={spacingContent}
    >
        {children}
    </GridWrapper>
);

Grid.defaultProps = defaultProps;
Grid.propTypes = propTypes;
Grid.grid = grid;

export default Grid;
