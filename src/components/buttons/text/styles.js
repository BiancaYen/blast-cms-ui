import styled, { css } from 'react-emotion';

// Utils
import getTheme from '../../../utils/getTheme';

const getProperty = getTheme('textButton');

const TextButtonWrapper = styled.span`
    font-size: 11px;
    font-weight: bold;
    letter-spacing: 0.7px;
    text-transform: uppercase;
    transition: color .2s ease;
    outline: none;
    
    margin: ${({ spacing }) => spacing || '0'};
    color: ${({ isDisabled }) => getProperty(isDisabled ? 'colorDisabled' : 'color')};
    cursor: ${({ isDisabled }) => (isDisabled ? 'initial' : 'pointer')};
    
    ${({ isDisabled, ...props }) => !isDisabled && css`
        &:hover {
            color: ${getProperty('colorHover')(props)};
        }
    `}
`;

export default TextButtonWrapper;
