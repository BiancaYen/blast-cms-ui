import React from 'react';
import PropTypes from 'prop-types';

// Styles
import BreadcrumbWrapper from './styles';

// Icons
import ChevronRightIcon from '../icons/ChevronRightIcon';

// Utils
import uniqueKey from '../../utils/uniqueKey';

// Default props
const defaultProps = {
    links: [],
    spacing: '',
    subTitle: '',
    title: ''
};

// Prop types
const propTypes = {
    links: PropTypes.instanceOf(Array),
    spacing: PropTypes.string,
    subTitle: PropTypes.string,
    title: PropTypes.string
};

const Breadcrumb = ({
    links,
    spacing,
    subTitle,
    title
}) => {
    return (
        <BreadcrumbWrapper spacing={spacing}>
            {
                links.map(link => (
                    <React.Fragment key={uniqueKey(link)}>
                        {link}
                        <ChevronRightIcon />
                    </React.Fragment>
                ))
            }
            <span>{title}</span>
            { subTitle && <span>{subTitle}</span>}
        </BreadcrumbWrapper>
    );
};

Breadcrumb.defaultProps = defaultProps;
Breadcrumb.propTypes = propTypes;

export default Breadcrumb;
