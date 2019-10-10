import React from 'react';
import PropTypes from 'prop-types';

// Components
import Loader from './Loader';

// Styles
import { ButtonWrapper } from './styles';

// Constants
import sizes from './constants';

// Default props
const defaultProps = {
    isDisabled: false,
    isLoading: false,
    isOutlined: false,
    size: sizes.normal,
    spacing: '',
    type: '',
    onClick: () => {}
};

// Prop types
const propTypes = {
    isDisabled: PropTypes.bool,
    isLoading: PropTypes.bool,
    isOutlined: PropTypes.bool,
    size: PropTypes.oneOf([
        sizes.small,
        sizes.normal
    ]),
    spacing: PropTypes.string,
    title: PropTypes.string.isRequired,
    type: PropTypes.string,
    onClick: PropTypes.func
};

const Button = ({
    title,
    isDisabled,
    isLoading,
    isOutlined,
    spacing,
    size,
    type,
    onClick
}) => (
    <ButtonWrapper
        disabled={isDisabled || isLoading}
        isDisabled={isDisabled}
        isLoading={isLoading}
        isOutlined={isOutlined}
        size={size}
        spacing={spacing}
        type={type}
        onClick={isDisabled || isLoading ? undefined : onClick}
    >
        {
            isLoading
                ? <Loader isOutlined={isOutlined} />
                : title
        }
    </ButtonWrapper>
);

Button.defaultProps = defaultProps;
Button.propTypes = propTypes;
Button.sizes = sizes;

export default Button;
