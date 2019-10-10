import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// Styles
import {
    IconWrapper,
    InputWrapper,
    LoaderWrapper,
    SearchWrapper
} from './styles';

// Components
import ResetButton from '../buttons/reset/ResetButton';
import SpinnerLoader from '../spinner-loader/SpinnerLoader';
import ValidationError from '../validation-error/ValidationError';

// Icons
import SearchIcon from '../icons/SearchIcon';

// Constants
import sizes from './constants';

// Default Props
const defaultProps = {
    canReset: false,
    isDisabled: false,
    isLoading: false,
    placeholder: '',
    searchUrl: '',
    size: sizes.normal,
    spacing: '',
    validation: {
        status: '',
        errors: ''
    },
    value: '',
    onPressEnter: () => {}
};

// Prop Types
const propTypes = {
    canReset: PropTypes.bool,
    isDisabled: PropTypes.bool,
    isLoading: PropTypes.bool,
    placeholder: PropTypes.string,
    searchUrl: PropTypes.string,
    size: PropTypes.oneOf([
        sizes.small,
        sizes.normal
    ]),
    spacing: PropTypes.string,
    validation: PropTypes.shape({
        status: PropTypes.string,
        errors: PropTypes.string
    }),
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired,
    onChange: PropTypes.func.isRequired,
    onPressEnter: PropTypes.func
};

const SearchInput = ({
    canReset,
    isDisabled,
    isLoading,
    placeholder,
    searchUrl,
    size,
    spacing,
    validation,
    value,
    onChange,
    onPressEnter
}) => {
    const [isFocused, setIsFocused] = useState(false);

    const onKeyPress = ({ keyCode }) => {
        if (!isDisabled && !isLoading && keyCode === 13) {
            onPressEnter();
        }
    };

    useEffect(() => {
        document.addEventListener('keypress', onKeyPress);

        return () => document.removeEventListener('keypress', onKeyPress);
    }, []);

    const onReset = () => {
        onChange('');
    };

    const getSearchIconSize = () => {
        return size === sizes.small ? '16' : undefined;
    };

    return (
        <SearchWrapper
            isDisabled={isDisabled || isLoading}
            size={size}
            spacing={spacing}
            focus={isFocused}
        >
            <IconWrapper size={size} isDisabled={isDisabled || isLoading}>
                <SearchIcon
                    width={getSearchIconSize()}
                    height={getSearchIconSize()}
                />
            </IconWrapper>
            <InputWrapper
                disabled={isDisabled || isLoading}
                isDisabled={isDisabled}
                isLoading={isLoading}
                tabIndex="0"
                value={value}
                placeholder={placeholder}
                onChange={({ target }) => onChange(target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
            />
            {
                isLoading &&
                <LoaderWrapper>
                    <span>{searchUrl}</span>
                    <SpinnerLoader size={18} />
                </LoaderWrapper>
            }
            {
                canReset && value &&
                <ResetButton
                    isDisabled={isDisabled}
                    onClick={onReset}
                    label="clear"
                />
            }
            {
                !!validation.errors
                && <ValidationError>{validation.errors}</ValidationError>
            }
        </SearchWrapper>
    );
};

SearchInput.defaultProps = defaultProps;
SearchInput.propTypes = propTypes;
SearchInput.sizes = sizes;

export default SearchInput;
