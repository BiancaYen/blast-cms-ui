import React, { useState } from 'react';
import PropTypes from 'prop-types';

// Styles
import Wrapper from './styles';

// Default prop
const defaultProps = {
    height: '68px',
    width: '149px'
};

// Prop types
const propTypes = {
    url: PropTypes.string.isRequired,
    height: PropTypes.string,
    placeholderImage: PropTypes.node.isRequired,
    width: PropTypes.string
};

const TableCellBannerImage = ({
    height,
    placeholderImage,
    url,
    width
}) => {
    const [isBroken, setIsBroken] = useState(false);

    const handleImageError = () => {
        if (!isBroken) {
            setIsBroken(true);
        }
    };

    return (
        <Wrapper height={height} width={width}>
            <div>
                {
                    !isBroken && url
                        ? <img onError={handleImageError} src={url} alt="Banner" />
                        : placeholderImage
                }
            </div>
        </Wrapper>
    );
};

TableCellBannerImage.defaultProps = defaultProps;
TableCellBannerImage.propTypes = propTypes;

export default TableCellBannerImage;
