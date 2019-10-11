import React, { useState } from 'react';
import PropTypes from 'prop-types';

// Styles
import { Divider, ImageWrapper, NavigationMenu, NavigationWrapper } from './styles';

// Components
import Loader from './Loader';

//  Default props
const defaultProps = {
    isLoading: false,
    logo: null,
    version: ''
};

// Prop types
const propTypes = {
    children: PropTypes.node.isRequired,
    glyph: PropTypes.node.isRequired,
    isLoading: PropTypes.bool,
    logo: PropTypes.node,
    version: PropTypes.string
};

const Navigation = ({
    children,
    glyph,
    isLoading,
    logo,
    version
}) => {
    const [expanded, setExpanded] = useState(false);

    const handleExpand = state => state !== expanded && setExpanded(state);

    return (
        <NavigationWrapper
            expanded={expanded && !isLoading}
            onMouseEnter={() => handleExpand(true)}
            onMouseLeave={() => handleExpand(false)}
        >
            <ImageWrapper>
                {glyph}
                {!!logo && <Divider />}
                {logo}
            </ImageWrapper>
            <NavigationMenu>
                <Loader isLoading={isLoading}>
                    {children}
                </Loader>
            </NavigationMenu>
            <span>{version}</span>
        </NavigationWrapper>
    );
};

Navigation.defaultProps = defaultProps;
Navigation.propTypes = propTypes;

export default Navigation;
