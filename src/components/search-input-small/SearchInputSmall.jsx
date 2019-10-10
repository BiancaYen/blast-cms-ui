import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

import { TableSearchType } from '../table';

// Styles
import {
    Wrapper,
    IconWrapper,
    SearchInput,
    SearchWrapper
} from './styles';

// Icons
import SearchIcon from '../icons/SearchIcon';


// Default Props
const defaultProps = {
    disabled: false,
    placeholder: '',
    focus: false,
    value: '',
    children: null,
    onChange: () => {}
};

// Prop Types
const propTypes = {
    children: PropTypes.node,
    disabled: PropTypes.bool,
    focus: PropTypes.bool,
    placeholder: PropTypes.string,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    onChange: PropTypes.func
};

const SearchInputSmall = ({
    children,
    disabled,
    focus,
    placeholder,
    value,
    onChange
}) => {
    const searchInput = useRef(null);
    const [onFocus, setOnFocus] = useState(focus);

    useEffect(() => {
        if (focus) {
            searchInput.focus();
        }
    }, []);

    return (
        <Wrapper>
            {children}
            <SearchWrapper disabled={disabled} focus={onFocus}>
                <IconWrapper disabled={disabled}>
                    <SearchIcon />
                </IconWrapper>
                <SearchInput
                    disabled={disabled}
                    ref={searchInput}
                    tabIndex="0"
                    value={value || ''}
                    placeholder={placeholder}
                    onChange={({ target }) => (!disabled ? onChange(target.value) : undefined)}
                    onFocus={() => setOnFocus(true)}
                    onBlur={() => setOnFocus(false)}
                />
            </SearchWrapper>
        </Wrapper>
    );
};

SearchInputSmall.defaultProps = defaultProps;
SearchInputSmall.propTypes = propTypes;
SearchInputSmall.componentType = TableSearchType;

export default SearchInputSmall;
