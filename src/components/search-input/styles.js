import styled from 'react-emotion';

import ValidationError from '../validation-error/ValidationError';

// Utils
import getTheme from '../../utils/getTheme';

// Constants
import sizes from './constants';

const { small } = sizes;

const getProperty = getTheme('searchInput');

const getPropertyDisabled = property => ({ isDisabled }) => getProperty(isDisabled ? `${property}Disabled` : property);

const getInputColorProperty = ({ isLoading }) => {
    if (isLoading) {
        return getProperty('colorLoading');
    }

    return getPropertyDisabled('color');
};

const SearchWrapper = styled.div`
    position: relative;
    display: flex;
    padding-right: 10px;
    flex-direction: row;
    align-items: center;
    border-radius: 5px;
    box-shadow: 0 2px 4px 0 rgba(50, 50, 50, 0.1);
    transition: border .2s ease;
    
    width: ${({ size }) => (size === small ? '300px' : '100%')};
    height: ${({ size }) => (size === small ? '35px' : '50px')};
    margin: ${({ spacing }) => spacing || '0'};
    background: ${getPropertyDisabled('background')};
    border: 2px solid ${({ focus }) => (focus
        ? getProperty('borderFocused')
        : getPropertyDisabled('border')
    )};
    
    ${ValidationError} {
        bottom: -15px;
        left: 60px;
    }
`;

const InputWrapper = styled.input`
    border: none;
    font-size: 12px;
    letter-spacing: 0.7px;
    outline: none;
    padding-left: 10px;
    flex-shrink: 1;
    flex-grow: 1;
    
    caret-color: ${getProperty('caretColor')};
    background-color: ${getPropertyDisabled('background')};
    color:${getInputColorProperty};
    
    &::-webkit-input-placeholder {
        color: ${getPropertyDisabled('placeholder')};
        text-transform: capitalize;
    }
    &::-moz-placeholder {
        color: ${getPropertyDisabled('placeholder')};
        text-transform: capitalize;
    } /* Firefox 19+ */
    &:-moz-placeholder {
        color: ${getPropertyDisabled('placeholder')};
        text-transform: capitalize;
    } /* Firefox 18- */
    &:-ms-input-placeholder {
        color: ${getPropertyDisabled('placeholder')};
        text-transform: capitalize;
    }
`;

const IconWrapper = styled.span`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    
    width: ${({ size }) => (size === small ? '30px' : '50px')};
    
    svg {
      max-width: 18px;
      path {
        fill: ${getPropertyDisabled('iconColor')};
      }
    }
`;

const LoaderWrapper = styled.div`
    display: flex;
    flex-direction: row;
    
    &> span { // Label URL
        right: 33px;
        padding-right: 15px;
        text-align: right;
        font-size: 11px;
        line-height: 18px;
        letter-spacing: 0.69px;
        
        color: ${getProperty('searchUrlColor')};
    }
    
    ~[class*="ResetButton"] {
        margin-left: 15px;
    }
`;

export {
    LoaderWrapper,
    IconWrapper,
    SearchWrapper,
    InputWrapper
};
