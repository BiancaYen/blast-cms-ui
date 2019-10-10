import React from 'react';
import PropTypes from 'prop-types';

// Styles
import { SpinnerWrapper } from './styles';

// Components
import SpinnerLoader from '../../spinner-loader/SpinnerLoader';

// Default props
const defaultProps = {
    isLoading: false
};

// Prop types
const propTypes = {
    isLoading: PropTypes.bool
};

const TableLoader = ({ isLoading }) => {
    if (isLoading) {
        return (
            <SpinnerWrapper>
                <SpinnerLoader spacing="0" />
            </SpinnerWrapper>
        );
    }

    return null;
};

TableLoader.defaultProps = defaultProps;
TableLoader.propTypes = propTypes;

export default TableLoader;
