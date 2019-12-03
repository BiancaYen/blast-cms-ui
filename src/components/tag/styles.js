import styled, { css } from 'react-emotion';

// Utils
import getTheme from '../../utils/getTheme';

const getProperty = getTheme('tag');

const TagWrapper = styled.div`
    width: max-content;
    height: 25px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 0 8px;
    margin-right: 10px;
    font-size: 10px;
    font-weight: 600;
    line-height: 1.9;
    letter-spacing: 0.95px;
    border-radius: 6px;
    box-shadow: 0 2px 4px 0 rgba(50, 50, 50, 0.1);
    
    color: ${getProperty('color')};
    border: solid 1px ${getProperty('border')};
    background-color: ${getProperty('background')};
    
    > button {
        cursor: pointer;
        padding: 0 0 0 5px;
        outline: none;

        svg {
            display: block;
            path {
                fill: ${getProperty('iconColor')};
            }
        }
    }

    &:last-of-typ {
        margin-right: 0;
    }
    
    ${({ isDisabled }) => isDisabled && css`
        color: ${getProperty('colorDisabled')};
    `}
`;

export default TagWrapper;
