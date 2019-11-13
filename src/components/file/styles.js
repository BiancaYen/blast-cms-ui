import styled from 'react-emotion';

// Utils
import getTheme from '../../utils/getTheme';

const getProperty = getTheme('file');

const FileWrapper = styled.div`
    cursor: pointer;
    border: 2px solid ${getProperty('borderColor')};
    &:hover {
        border: 2px solid ${getProperty('borderColorHover')};
        img {
            opacity: 0.5;
        }
    }
`;

const FileWrapperContent = styled.div`
    background: ${getProperty('background')};
    color: ${getProperty('color')};
    font-size: 12px;
    padding: 10px 0;
    text-align: center;
`;

export {
    FileWrapper,
    FileWrapperContent
};
