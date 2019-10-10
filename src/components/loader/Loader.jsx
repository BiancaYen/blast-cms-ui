import React from 'react';
import PropTypes from 'prop-types';

import LinearLoader from '../linear-loader/LinearLoader';

const Loader = ({ loading, children }) => {
    return loading ? <LinearLoader /> : children;
};

Loader.propTypes = {
    children: PropTypes.node,
    loading: PropTypes.bool
};

Loader.defaultProps = {
    children: null,
    loading: false
};

export default Loader;
