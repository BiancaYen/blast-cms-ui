import styled from 'react-emotion';

// Utils
import getTheme from '../../utils/getTheme';

const getProperty = getTheme('searchInput');

const getPropertyDisabled = property => ({ disabled }) => getProperty(disabled ? `${property}Disabled` : property);

const SearchWrapper = styled.div`
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    width: 300px;
    height: 35px;
    margin-left: auto;
    overflow: hidden;
    background: ${getPropertyDisabled('background')};
    border-radius: 10px;
    transition: border .2s ease;
    border: 2px solid ${({ focus }) => (focus
        ? getProperty('borderFocused')
        : getPropertyDisabled('border')
    )};
`;

const SearchInput = styled.input`
    border: none;
    font-size: 12px;
    letter-spacing: 0.7px;
    outline: none;
    padding: 0 10px;
    flex-shrink: 1;
    flex-grow: 1;
    height: 100%;
    caret-color: ${getProperty('caretColor')};
    background-color: ${getPropertyDisabled('background')};
    color:${getPropertyDisabled('color')};
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
    width: 50px;
    height: 100%;
    svg {
      max-width: 18px;
      path {
        fill: ${getPropertyDisabled('icon')};
      }
    }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-grow: 1;
`;

export {
    Wrapper,
    IconWrapper,
    SearchWrapper,
    SearchInput
};
