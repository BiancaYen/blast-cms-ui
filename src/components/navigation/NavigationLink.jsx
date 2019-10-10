import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';

// Styled
import { LinkIconWrapper, LinkItem } from './styles';

// Default props
const defaultProps = {
    relatedRoutes: []
};

// Prop Types
const propTypes = {
    icon: PropTypes.node.isRequired,
    label: PropTypes.string.isRequired,
    location: PropTypes.instanceOf(Object).isRequired,
    relatedRoutes: PropTypes.instanceOf(Array),
    route: PropTypes.string.isRequired
};

const NavigationLink = ({
    icon,
    label,
    location,
    relatedRoutes,
    route
}) => {
    const [active, updateActive] = useState(false);

    const setActive = (mouseOver = false) => {
        const isRelatedRoute = relatedRoutes.find(relatedRoute => location.pathname.includes(relatedRoute));

        if (location.pathname.includes(route) || isRelatedRoute) {
            updateActive(true);
        } else {
            updateActive(mouseOver);
        }
    };

    useEffect(() => setActive());

    return (
        <LinkItem
            active={active}
        >
            <Link to={route}>
                <LinkIconWrapper>
                    {icon}
                </LinkIconWrapper>
                <span>{label}</span>
            </Link>
        </LinkItem>
    );
};

NavigationLink.defaultProps = defaultProps;
NavigationLink.propTypes = propTypes;

export default withRouter(NavigationLink);
