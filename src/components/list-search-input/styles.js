import styled from 'react-emotion';

// Utils
import getTheme from '../../utils/getTheme';

const getProperty = getTheme('searchInput');

const getPropertyDisabled = property => ({ isDisabled }) => {
    return getProperty(isDisabled ? `${property}Disabled` : property);
};

const SearchWrapper = styled.div`
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    min-height: 35px;
    height: 35px;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
    padding: 0 20px;
    
    background-color: ${getProperty('background')};
    
    svg {
        max-width: 18px;
        
        path {
            fill: ${getPropertyDisabled('iconColor')};
        }
    }
`;

const Input = styled.input`
    border: none;
    font-size: 12px;
    letter-spacing: 0.7px;
    outline: none;
    padding-left: 20px;
    flex-shrink: 1;
    flex-grow: 1;
    
    caret-color: ${getProperty('caretColor')};
    background-color: ${getProperty('background')};
    color: ${getPropertyDisabled('color')};
    
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

export {
    Input,
    SearchWrapper
};
